import { Condition, ConditionParam } from "../model/Condition";

export class RuleUtil {

    public static getParamMap(params:ConditionParam[]|undefined):Map<String,String|undefined> {
        const map = new Map<String,String|undefined>();
        if( params ) {
            params.map((param)=>{
                map.set(param.key, param.value)
            })
        }
        return map;
    }
}