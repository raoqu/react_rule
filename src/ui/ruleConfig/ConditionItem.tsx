
import type { CSSProperties, FC, ReactNode } from 'react'
import { useState } from 'react'

import { Condition, ConditionParam, ConditionWidgetType, ParamValueLimitType } from './model/Condition'
import { renderReadonly, renderWidgets } from './RuleWidgetRender'

function getStyle(backgroundColor: string): CSSProperties {
  return {
    backgroundColor
  }
}

export interface ConditionItemProp {
  readonly?: boolean
  condition: Condition
}

type VoidFunction = () => void;
type UpdateParamFunction = (paramKey:string, value?:string) => void;

function getParam(params:ConditionParam[], key:string): ConditionParam|undefined {
  return params.find(param => (param.key == key)) || undefined;
}

export const ConditionItem: FC<ConditionItemProp> = (
  { readonly = false, condition }) => {
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
    }
  }

  if (isReadOnly) {
    return renderReadonly(condition, switchMode);
  }
  else {
    return renderWidgets(condition, switchMode, updateValue);
  }
}