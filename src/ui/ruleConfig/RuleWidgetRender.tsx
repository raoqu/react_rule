import { Input, InputNumber, Tag } from "antd";
import { CSSProperties } from "react";
import { PatternTokenType, StringPattern } from "../../util/StringPattern";
import { Condition, ConditionParam, ConditionWidgetType } from "./model/Condition"
import { RuleUtil } from "./util/RuleUtil";
import { MultiSelect } from "./widget/MultiSelect";


type VoidFunction = () => void;
type UpdateParamFunction = (paramKey: string, value?: string) => void;

export function renderSingleWidget(param: ConditionParam, key: string, updateValue: UpdateParamFunction) {
    if (!param) {
        return (<Tag key={key} color="red-inverse">无效参数：{key}</Tag>)
    }

    if (param.widgetType == ConditionWidgetType.TEXT) {
        return (<Input key={key} />)
    }

    if (param.widgetType == ConditionWidgetType.NUMBER) {
        return (<InputNumber key={key} onChange={updateValue} />)
    }

    if( param.widgetType == ConditionWidgetType.MULTI_SELECT) {
        return (<MultiSelect key={key} param={param}/>)
    }

    return (
        <Tag key={key} color="orange-inverse">未实现的组件：{param.widgetType}</Tag>
    )
}

function renderTitleWidget(condition: Condition, switchMode: VoidFunction) {
    const backgroundColor = 'rgba(240, 255, 255)'
    return (
        <div className='rule-condition-item' style={getStyle(backgroundColor)} onDoubleClick={switchMode}>
            {condition.title}
        </div>
    )
}

// render widget view
export function renderWidgets(condition: Condition, switchMode: VoidFunction, updateValue: UpdateParamFunction) {
    const tokens = StringPattern.split(condition.pattern);
    let index = 0;
    let key = '';

    if( ! condition.pattern ) {
        return renderTitleWidget(condition, switchMode)
    }
    
    const views = tokens.map((token) => {
        index = index + 1;
        key = '' + index;
        if (token.type == PatternTokenType.STRING) {
            return (
                <span key={key}>{token.value}</span>
            )
        }
        else {
            // render single widget
            const param = condition.params && condition.params.find(param => (param.key == token.value)) || undefined;
            if (param) {
                return renderSingleWidget(param, key, updateValue)
            }
            else {
                return (<Tag key={key} color="red-inverse">{key}</Tag>)
            }
        }
    });

    const backgroundColor = 'rgba(240, 255, 255)'
    return (
        <div className='rule-condition-item' style={getStyle(backgroundColor)} onDoubleClick={switchMode}>
            {views}
        </div>
    )
}

// render readonly view
export function renderReadonly(condition: Condition, switchMode:VoidFunction) {
    const map = RuleUtil.getParamMap(condition.params);
    const str = StringPattern.format(condition.pattern, map)
  
    const backgroundColor = 'rgba(240, 240, 240)'
  
    return (
      <div className='rule-condition-item' style={getStyle(backgroundColor)} onDoubleClick={switchMode}>
        {condition && (condition.pattern && str) || condition.title}
      </div>
    )
  }

function getStyle(backgroundColor: string): CSSProperties {
    return {
      backgroundColor
    }
  }