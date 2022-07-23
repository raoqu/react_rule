import { InputNumber, Select } from 'antd';
import {FC, useEffect, useState} from 'react'
import { ConditionParam } from '../model/Condition'
const { Option } = Select;

interface InputNumberProps {
    uniqueId:string
    param:ConditionParam
    onChange: OnChangeFunction
}

type OnChangeFunction = (value:string) => void

const defaultOnChange = (value:string) => {}

export const NumberInput: FC<InputNumberProps> = ({uniqueId, param, onChange=defaultOnChange}) => {
    const map = new Map<string,string>()
    const val = param.value
    const [value, setValue] = useState(val)
    
    useEffect(()=>{
        setTimeout(()=> {setValue(val)}, 1)
    })

    const handleChange = (value:string) => {
        console.log('select change ' + uniqueId + ' :' + value)
        onChange(value)
    }
    
    return (
        <InputNumber key={uniqueId} onChange={handleChange} min={"0"} value={value} />
    )
}