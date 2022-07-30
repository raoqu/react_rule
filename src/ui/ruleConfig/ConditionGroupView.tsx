import { DeleteOutlined, FolderOpenOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import _ from 'lodash'
import type { CSSProperties, FC, ReactNode } from 'react'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { GlobalContext } from '../../util/GlobalContext'

import { ItemTypes } from '../ItemTypes'
import { ConditionItem } from './ConditionItem'
import { Condition } from './model/Condition'
import { RuleUtil } from './util/RuleUtil'

type RemoveGroupFunction = (id: string) => void;

interface ConditionGroupProps {
  ruleId: string
  groupId: string
  groupCount: number
  enableRemove?: boolean
  removeGroup: RemoveGroupFunction
  designMode: boolean
}

function getStyle(backgroundColor: string): CSSProperties {
  return {
    backgroundColor
  }
}

export const ConditionGroupView: FC<ConditionGroupProps> = (
  { ruleId, groupId, groupCount,enableRemove = true, designMode = true,removeGroup }) => {

  const context = GlobalContext.get(ruleId)
  const group = GlobalContext.getField(context, "group_" + groupId)
  const [conditionCount, setConditionCount] = useState(group.conditionIds.length)

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.RULE_CONDITION,
      drop(_item: Condition, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) {
          return
        }
        // add new condition
        if (_item && _item.title) {
          RuleUtil.addNewCondition(ruleId, groupId, _item)
          setConditionCount(group.conditionIds.length)
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    })
  )

  const removeCurrentGroup = () => {
    removeGroup(groupId);
  }

  const backgroundColor = (isOverCurrent || (isOver)) ? 'rgba(250, 250, 250)' : 'rgba(240, 240, 240)';

  // condition item list
  const itemViews = group.conditionIds.map((conditionId: string) => {
    return (
      <ConditionItem key={conditionId}
        ruleId={ruleId} groupId={groupId} conditionId={conditionId} conditionCount={conditionCount} readonly={!designMode}/>
    )
  })

  return (
    <div ref={drop} className='rule-condition-group' style={getStyle(backgroundColor)}>
      <Row>
        <Col flex="20px"></Col>
        <Col flex="auto">
          <div>
            {itemViews}
          </div>
        </Col>
        { enableRemove &&
          <Col flex="12px">
            <Button onClick={removeCurrentGroup}><DeleteOutlined /></Button>
          </Col>}
      </Row>
    </div>
  )
}
