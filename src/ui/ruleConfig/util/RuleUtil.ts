import { Condition, ConditionParam } from "../model/Condition";

export class RuleUtil {

    public static getParamMap(params:ConditionParam[]|undefined):Map<String,string|undefined> {
        const map = new Map<String,string|undefined>();
        if( params ) {
            params.map((param)=>{
                map.set(param.key, RuleUtil.readableParam(param))
            })
        }
        return map;
    }

    public static readableParam( param:ConditionParam):string {
        let val = '?';
        if( param ) {
            return param.value || '?';
        }
        return val;
    }
}