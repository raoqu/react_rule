import type { CSSProperties, FC, ReactNode } from 'react'
import { useState } from 'react'
import { StringPattern } from '../../util/StringPattern'

import { ItemTypes } from '../ItemTypes'
import { Condition, ConditionParam } from './model/Condition'
import { RuleUtil } from './util/RuleUtil'

function getStyle(backgroundColor: string): CSSProperties {
  return {
    backgroundColor
  }
}

export interface ConditionItemProp {
  readonly?: boolean
  condition: Condition
}

function renderReadonly(condition:Condition) {
  const map = RuleUtil.getParamMap(condition.params);
  const str = StringPattern.format(condition.pattern, map)
  const backgroundColor = 'rgba(240, 240, 240)'

  return (
    <div className='rule-condition-item' style={getStyle(backgroundColor)}>
      {condition.title}
      {/* {condition && StringPattern.format(condition.pattern, map)} */}
    </div>
  )
}

function renderWidgets(condition:Condition) {

  return (
    <div>
    </div>
  )
}

export const ConditionItem: FC<ConditionItemProp> = (
  { readonly = true, condition }) => 
{
  const [isReadOnly, setReadOnly] = useState(readonly) // 只读模式 or 编辑模式
  const [params, setParams] = useState(condition.params) // 参数配置

  if( readonly ) {
    return renderReadonly(condition);
  }
  else {
    return renderWidgets(condition);
  }
}
