import { Select } from 'antd';
import _ from 'lodash';
import {FC, useEffect, useState} from 'react'
import { ConditionParam } from '../model/Condition'
const { Option } = Select;

type OnChangeFunction = (value:string[]) => void

interface MultiSelectProps {
    uniqueId:string
    param:ConditionParam
    onChange:OnChangeFunction
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

const defaultOnChange = (value:string[]) => {}

export const MultiSelect: FC<MultiSelectProps> = ({uniqueId, param, onChange=defaultOnChange}) => {
    const map = new Map<string,string>()
    const list = makeMap(param.valueLimit?.limit || '', map);
    let valueArray:string[] = []
    const [value, setValue] = useState(valueArray)
    
    useEffect(()=>{
        valueArray = param.value ? _.split(param.value, ',') : []
        setTimeout(()=> {setValue(valueArray)}, 1)
    })
    
    const children: React.ReactNode[] = [];
    let index = 0
    list.map((item) => {
        index = index + 1;
        children.push(<Option key={''+index} value={item}>{map.get(item)}</Option>);
    })

    const handleChange = (value:string[]) => {
        onChange(value)
    }

    return (
        <Select key={uniqueId} mode="multiple" style={{minWidth:'150px'}}  onChange={onChange} value={value}>{children}</Select>
    )
}