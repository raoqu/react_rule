import { Condition } from "./Condition";

export interface RuleValue {
  title?: string,
  id?: string,
  condition?: Condition
}

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
            title: '券类型',
            id: 'folder1-1',
            condition: {
              title: '券类型',
              id: 'voucherType'
            }
          },
          {
            title: '优惠折扣',
            id: 'folder1-2',
            condition: {
              title: '优惠折扣',
              id: 'voucherDiscount'
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