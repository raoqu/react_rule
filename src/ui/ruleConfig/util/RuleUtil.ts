import _ from "lodash";
import { GlobalContext } from "../../../util/GlobalContext";
import { Condition, ConditionParam } from "../model/Condition";
import { GroupConfig } from "../model/RuleConfig";


export class RuleUtil {
    // add new condition group
    static addNewGroup = (ruleId: string) => {
        const context = GlobalContext.get(ruleId)
        const rule = GlobalContext.getField(context, "rule")

        const group = new GroupConfig()
        group.ruleId = ruleId;
        group.groupId = _.uniqueId();
        group.conditionIds = []

        rule.groupIds.push(group.groupId)

        context.set("group_" + group.groupId, group)
        return group;
    }

    // remove condition group
    static removeGroup = (ruleId:string, groupId:string) => {
        const context = GlobalContext.get(ruleId)
        const rule = GlobalContext.getField(context, "rule")
        const group = GlobalContext.getField(context, "group_" + groupId)

        // remove conditions bound
        group.conditionIds.map((cid:string) => {
            context.delete("condition_" + cid)
        })

        // remove from group list of rule
        _.remove(rule.groupIds, (gid) => {
            return gid === groupId
        })

        context.delete("group_" + groupId)
    }

    static getGroup = (ruleId:string, groupId:string) => {
        const context = GlobalContext.get(ruleId)
        return GlobalContext.getField(context, "group_" + groupId)
    }

    static getCondition = (ruleId:string, conditionId:string) => {
        const context = GlobalContext.get(ruleId)
        return GlobalContext.getField(context, "condition_" + conditionId)
    }

    static addNewCondition = (ruleId:string, groupId:string, conditionStub:Condition) => {
        const context = GlobalContext.get(ruleId)
        const group = GlobalContext.getField(context, "group_" + groupId)
        const condition = _.cloneDeep(conditionStub)
        condition.id = _.uniqueId()

        context.set("condition_" + condition.id, condition)

        // add to condition list
        group.conditionIds.push(condition.id)
        return condition
    }

    static removeCondition = (ruleId:string, groupId:string, conditionId:string) => {
        const context = GlobalContext.get(ruleId)
        const group = GlobalContext.getField(context, "group_" + groupId)

        // remove from condition list of group
        _.remove(group.conditionIds, (cid)=> { return cid === conditionId })

        context.delete("condition_" + conditionId)
    }

    static getParamMap(params:ConditionParam[]|undefined):Map<String,string|undefined> {
        const map = new Map<String,string|undefined>();
        if( params ) {
            params.map((param)=>{
                map.set(param.key, RuleUtil.readableParam(param))
            })
        }
        return map;
    }

    static readableParam( param:ConditionParam):string {
        let val = '?';
        if( param ) {
            return param.value || '?';
        }
        return val;
    }
}