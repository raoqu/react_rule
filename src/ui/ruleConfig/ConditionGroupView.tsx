import { Button, Col, Row } from 'antd'
import _ from 'lodash'
import type { CSSProperties, FC, ReactNode } from 'react'
import { useState } from 'react'
import { useDrop } from 'react-dnd'

import { ItemTypes } from '../ItemTypes'
import { ConditionItem } from './ConditionItem'
import { Condition, ConditionGroup } from './model/Condition'

type RemoveGroupFunction = (id: string) => void;

interface ConditionGroupProps {
  groupId: string,
  conditions?: Condition[],
  removeGroup: RemoveGroupFunction
}

function getStyle(backgroundColor: string): CSSProperties {
  return {
    backgroundColor
  }
}

export const ConditionGroupView: FC<ConditionGroupProps> = ({ groupId, conditions = [], removeGroup }) => {
  const [rules, setRules] = useState([])
  const [hasDropped, setHasDropped] = useState(false)
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)
  const [lastRuleName, setLastRuleName] = useState('')
  const [items, setItems] = useState(conditions);

  const addCondition = (condition: Condition) => {
    items.push(condition);
    setItems(items)
  }

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.RULE_CONDITION,
      drop(_item: Condition, monitor) {
        const didDrop = monitor.didDrop()
        if (didDrop) {
          return
        }
        setHasDropped(true)
        setHasDroppedOnChild(didDrop)
        setLastRuleName(_item.title)
        if( _item && _item.title) {
          addCondition(_item);
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

  const backgroundColor = (isOverCurrent || (isOver)) ? 'rgba(255, 255, 230)' : 'rgba(230, 230, 230)';

  // condition item list
  const itemViews = items?.map((item) => {
    const unique = _.uniqueId();
    return (
      <ConditionItem key={unique} condition={item} />
    )
  })


  return (
    <div ref={drop} className='rule-condition-group' style={getStyle(backgroundColor)}>
      <Row>
        <Col flex="20px"></Col>
        <Col flex="auto">
          {/* {groupId}
          {hasDropped && <span>{lastRuleName}</span>} */}
          <div>
            {itemViews}
          </div>
        </Col>
        <Col flex="20px">
          <Button onClick={removeCurrentGroup}>删除</Button>
        </Col>
      </Row>
    </div>
  )
}
