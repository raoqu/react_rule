import { Select } from 'antd';
import {FC} from 'react'
import { ConditionParam } from '../model/Condition'
const { Option } = Select;

interface MultiSelectProps {
    key:string;
    param:ConditionParam;
}

function makeMap(str:string, map: Map<string,string>): string[] {
    let arr: string[] = []
    const groups = str.split('|')
    groups.map((k) => {
        const item = k.split(',') || ['error', 'error']
        map.set(item[1], item[0])
        arr.push(item[1])
    })
    return arr
}

export const MultiSelect: FC<MultiSelectProps> = ({key, param}) => {
    const map = new Map<string,string>()
    const list = makeMap(param.valueLimit?.limit || '', map);
    
    const children: React.ReactNode[] = [];
    let index = 0;
    list.map((item) => {
        index = index + 1;
        children.push(<Option key={''+index}>{map.get(item)}</Option>);
    })
    
    return (
        <Select key={key} mode="multiple" style={{minWidth:'100px'}}>{children}</Select>
    )
}