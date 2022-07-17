export enum ConditionWidgetType {
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    SELECT = 'ENUM',
    MULTI_ENUM = 'MULTI_SELECT',
    CUSTOMIZE = 'CUSTOMIZE'
}

export enum ParamValueLimitType {
    TEXT_LENGTH = 'TEXT_LENGTH',     // limit = '20'
    TEXT_PATTERN = 'TEXT_PATTERN',   // limit = '/^[^\s].*[^\s]$/g'
    NUMBER_RANGE = 'NUMBER_RANGE',   // limit = '0,99' 或 ',10', '2.5,' /** 小数位数取min或max中最多的一个 */
    SELECT = 'SELECT',               // limit = 'text,code|text,code|text,code'
}

export interface ParamValueLimit {
    type: ParamValueLimitType,
    limit?: string
}

export interface ConditionParam {
    key: string,
    value?: string,
    widgetType: string,
    valueLimit?: ParamValueLimit
}

export class Condition {
    public uniqId: string;
    public id: string;
    public title: string;
    public pattern: string;             // '券优惠折扣 #{operator} #{discount} 折'
    public params?: ConditionParam[];
}

export class ConditionGroup {
    public id: string;
    public conditions?: Condition[];
}