import React, { CSSProperties } from 'react'
import { Card, Tree } from 'antd'
import { FolderOpenOutlined } from '@ant-design/icons'
import { DragSourceMonitor, useDrag } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'
import { RuleValue } from './model/RuleData'


export const RuleTreeItem: React.FC<RuleValue> = ({title, id, condition}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.RULE_CONDITION,
      item: condition,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      })
    })
  )
  
  return (
    <div ref={drag} style={{float:'left', opacity: isDragging ? 0.5 : 1}}>
      <div><FolderOpenOutlined style={{ marginRight: '5px' }} />{title}</div>
    </div>
  )
}