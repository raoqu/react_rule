import { Select } from 'antd';
import {FC, useEffect, useState} from 'react'
import { ConditionParam } from '../model/Condition'
const { Option } = Select;

interface MultiSelectProps {
    uniqueId:string
    param:ConditionParam
    onChange: OnChangeFunction
}

type OnChangeFunction = (value:string) => void

const defaultOnChange = (value:string) => {}

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

export const SingleSelect: FC<MultiSelectProps> = ({uniqueId, param, onChange=defaultOnChange}) => {
    const map = new Map<string,string>()
    const list = makeMap(param.valueLimit?.limit || '', map);
    const val = param.value
    const [value, setValue] = useState(val)
    
    useEffect(()=>{
        setTimeout(()=> {setValue(val)}, 1)
    })
    
    const children: React.ReactNode[] = [];
    let index = 0;
    list.map((code) => {
        index = index + 1;
        children.push(<Option key={''+index} value={code}>{map.get(code)}</Option>);
    })

    const handleChange = (value:string) => {
        onChange(value)
    }
    
    return (
        <Select key={uniqueId} style={{minWidth:'150px'}} onChange={handleChange} value={value}>{children}</Select>
    )
}