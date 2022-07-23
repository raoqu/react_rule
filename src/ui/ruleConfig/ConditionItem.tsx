
import { CaretDownOutlined, CaretRightOutlined, FolderOpenOutlined, FolderOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import _ from 'lodash'
import { CSSProperties, FC, useEffect } from 'react'
import { useState } from 'react'
import { GlobalContext } from '../../util/GlobalContext'

import { Condition, ConditionParam } from './model/Condition'
import { renderReadonly, renderWidgets } from './RuleWidgetRender'

const {CheckableTag} = Tag;

type UpdateConditionFunction = (condition:Condition) => void;

function defaultUpdate(condition:Condition) { }

export interface ConditionItemProp {
  readonly?: boolean
  ruleId: string
  groupId: string
  conditionId: string
  conditionCount: number
  conditionUdpated?: UpdateConditionFunction
}

export const ConditionItem: FC<ConditionItemProp> = (
  { ruleId, groupId, conditionId, readonly = false, conditionCount, conditionUdpated = defaultUpdate }) => {

  const context = GlobalContext.get(ruleId)
  const condition = GlobalContext.getField(context, "condition_" + conditionId) as Condition
  const [isReadOnly, setReadOnly] = useState(readonly) // 只读模式 or 编辑模式
  const [params, setParams] = useState(condition.params) // 参数配置

  const switchMode = () => {
    setReadOnly(!isReadOnly);
  }

  const updateValue = (paramKey:string,value?:string) => {
    const param = condition.params && condition.params.find(param => (param.key == paramKey)) || undefined;
    if( param ) {
      param.value = value;
      setParams(params);
      
      console.log('param updated:' + conditionId + ' ' + paramKey + ' - ' + value)
    }
  }

  const views = isReadOnly ? renderReadonly(condition, switchMode) : renderWidgets(condition, switchMode, updateValue);
  const backgroundColor = isReadOnly ? 'rgba(240, 240, 240)' : 'rgba(240, 255, 255)';
  return (
      <div className='rule-condition-item' style={getStyle(backgroundColor)}>
        { isReadOnly ?  <CaretRightOutlined  onClick={ switchMode } /> : <CaretDownOutlined  onClick={ switchMode } />}
          &nbsp;{views}
      </div>
  )
}

function getStyle(backgroundColor: string): CSSProperties {
  return {
    backgroundColor
  }
}