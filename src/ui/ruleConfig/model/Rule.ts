import { isClassDeclaration } from "typescript";
import { ConditionGroup } from "./Condition";

export class Rule {
    id: string;
    groups?: ConditionGroup[];
}