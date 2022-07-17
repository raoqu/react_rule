import { Condition, ConditionParam, ConditionWidgetType, ParamValueLimitType } from "./Condition";

export interface RuleValue {
  title?: string,
  id?: string,
  condition?: Condition
}

const VoucherTypeParams: ConditionParam[] = [
  {
    key: 'targetType',
    value: undefined,
    widgetType: ConditionWidgetType.MULTI_SELECT,
    valueLimit: {
      type: ParamValueLimitType.SELECT,
      limit: '券类型1,VOUCHER_TYPE_1|券类型2,VOUCHER_TYPE_2|券类型3,VOUCHER_TYPE_3'
    }
  }
]

const VoucherDiscountParams: ConditionParam[] = [
  {
    key: 'compareType',
    value: undefined,
    widgetType: ConditionWidgetType.SELECT,
  },
  {
    key: 'discount',
    value: undefined,
    widgetType: ConditionWidgetType.NUMBER,
  }
]

export const RULE_DATA = [
  {
    title: '收藏中心',
    id: 'all',
    children: [
      {
        title: '券规则',
        id: 'folder1',
        type: 'node',
        children: [
          {
            title: '优惠券类型',
            id: 'folder1-1',
            condition: {
              title: '券类型',
              id: 'voucherType',
              pattern: '优惠券类型 属于 #{targetType} ',
              params: VoucherTypeParams
            }
          },
          {
            title: '优惠折扣',
            id: 'folder1-2',
            condition: {
              title: '优惠折扣',
              id: 'voucherDiscount',
              pattern: '优惠折扣力度 #{compareType} #{discount} 折 ',
              params: VoucherDiscountParams
            }
          },
          {
            title: '优惠范围',
            id: 'folder1-3',
            condition: {
              title: '优惠范围',
              id: 'useScene'
            }
          }
        ],
      },
      {
        title: '参数值校验',
        id: 'folder2',
        children: [
          {
            title: '文本类型',
            id: 'folder2-1',
            children: [
              {
                title: '是否包含空格',
                id: 'folder2-1-1'
              },
              {
                title: '文本长度',
                id: 'folder2-1-2'
              },
              {
                title: '正则匹配',
                id: 'folder2-1-3'
              }
            ]
          },
          {
            title: '数值类型',
            id: 'folder2-2',
            children: [
              {
                title: '数值范围',
                id: 'folder2-2-1'
              }
            ]
          }
        ],
      },
    ],
  },
];