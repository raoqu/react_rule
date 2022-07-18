// 条件参数前端组件类型
export enum ConditionWidgetType {
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    SELECT = 'SELECT',
    MULTI_SELECT = 'MULTI_SELECT',
    CUSTOMIZE = 'CUSTOMIZE'
}

// 条件参数校验类型
export enum ParamValueLimitType {
    TEXT_LENGTH = 'TEXT_LENGTH',     // limit = '20'
    TEXT_PATTERN = 'TEXT_PATTERN',   // limit = '/^[^\s].*[^\s]$/g'
    NUMBER_RANGE = 'NUMBER_RANGE',   // limit = '0,99' 或 ',10', '2.5,' /** 小数位数取min或max中最多的一个 */
    SELECT = 'SELECT',               // limit = 'text,code|text,code|text,code'
}

// 条件参数校验信息
export interface ParamValueLimit {
    type: ParamValueLimitType,
    limit?: string
}

// 条件参数
export interface ConditionParam {
    key: string,
    value?: string,                 // 目标配置值，'?' 表示待实例化
    widgetType: string,
    valueLimit?: ParamValueLimit
    extInfo?: Map<String,any>
}

// 条件配置
export class Condition {
    public uniqId: string;
    public id: string;
    public title: string;
    public pattern: string;             // '券优惠折扣 #{operator} #{discount} 折'
    public params?: ConditionParam[];
}

// 条件组
export class ConditionGroup {
    public id: string;
    public conditions?: Condition[];
}