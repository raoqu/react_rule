import { FolderOpenOutlined } from "@ant-design/icons";
import { Button, Input, Tag } from "antd";
import { valueType } from "antd/lib/statistic/utils";
import _ from "lodash";
import { ChangeEvent, CSSProperties } from "react";
import { PatternTokenType, StringPattern } from "../../util/StringPattern";
import { Condition, ConditionParam, ConditionWidgetType } from "./model/Condition"
import { RuleUtil } from "./util/RuleUtil";
import { MultiSelect } from "./widget/MultiSelect";
import { NumberInput } from "./widget/NumberInput";
import { SingleSelect } from "./widget/SingleSelect";


type VoidFunction = () => void;
type UpdateParamFunction = (paramKey: string, value?: string) => void;

export function renderSingleWidget(param: ConditionParam, key: string, updateValue: UpdateParamFunction) {
    
    if (!param) {
        return (<Tag key={key} color="red-inverse">无效参数：{key}</Tag>)
    }

    // TEXT
    if (param.widgetType === ConditionWidgetType.TEXT) {
        const onChange = (e:ChangeEvent<HTMLInputElement>) => { updateValue(param.key, e.target.value) }
        return (<Input key={key} defaultValue={param.value || ''} onChange={onChange}/>)
    }

    // NUMBER
    if (param.widgetType === ConditionWidgetType.NUMBER) {
        const onChange = (val:valueType) => { updateValue(param.key, val ? val.toString() : '?') }
        return (<NumberInput key={key} uniqueId={key} param={param} onChange={onChange} />)
    }

    // MULTI_SELECT
    if( param.widgetType === ConditionWidgetType.MULTI_SELECT) {
        const onChange = (value:string[]) => { updateValue(param.key, _.join(value, ','))}
        return (<MultiSelect key={key} uniqueId={key} param={param} onChange={onChange}/>)
    }

    // SELECT
    if( param.widgetType === ConditionWidgetType.SELECT) {
        const onChange = (value:string) => { updateValue(param.key, value)}
        return (<SingleSelect key={key} uniqueId={key} param={param} onChange={onChange}/>)
    }

    return (
        <Tag key={key} color="orange-inverse">未实现的组件：{param.widgetType}</Tag>
    )
}

// render widget view
export function renderWidgets(condition: Condition, switchMode: VoidFunction, updateValue: UpdateParamFunction) {
    const tokens = StringPattern.split(condition.pattern);
    let index = 0;
    let key = '';

    if( ! condition.pattern ) {
        return (<span>{condition.title}</span>)
    }
    
    const views = tokens.map((token) => {
        index = index + 1;
        key = condition.uniqueId + '_' + index;
        if (token.type === PatternTokenType.STRING) {
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

    return views;
}

// render readonly view
export function renderReadonly(condition: Condition, switchMode:VoidFunction) {
    const map = RuleUtil.getParamMap(condition.params);
    const str = StringPattern.format(condition.pattern, map)
  
    const backgroundColor = 'rgba(240, 240, 240)'
  
    return (
        <span>{condition && (condition.pattern && str) || condition.title}</span>
    )
  }