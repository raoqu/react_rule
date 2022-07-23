import _ from "lodash"
import { GlobalContext } from "../../../util/GlobalContext"
import { Condition, ConditionParam } from "./Condition"

export class RuleConfig {
    ruleId: string
    groupIds: string[]
}

export class GroupConfig {
    ruleId: string
    groupId: string
    conditionIds: string[]
}

export class ParamConfig {
    key: string
    value?: string
}

export class ConditionConfig {
    groupId: string
    conditionId: string
    conditionDefinition: Condition
    parmas?: ParamConfig[]
}