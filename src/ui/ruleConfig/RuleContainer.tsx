import { FC, useCallback, useEffect, useState } from 'react'
import _ from 'lodash'

import { ConditionGroupView } from './ConditionGroupView'
import { Condition, ConditionGroup } from './model/Condition'
import { Rule } from './model/Rule'
import { Button } from 'antd'
import './RuleView.css';
import { GroupSizeContext } from 'antd/lib/button/button-group'
import { setgroups } from 'process'

interface RuleProps {
  id: string,
  groups?: ConditionGroup[]
}

function initGroups() {
  const groups = [];
  const defaultGroup = new ConditionGroup();
  defaultGroup.id = _.uniqueId();
  defaultGroup.conditions = [];
  groups.push(defaultGroup);
  return groups;
}


export const RuleContainer: FC<RuleProps> = ({ id, groups = initGroups() }) => {

  const [_groups, setGroups] = useState(groups)

  const removeGroup = useCallback((groupId: string) => {
    setGroups(_.remove(_groups, function (g) { 
      return g.id != groupId 
    }))
  },
    [_groups]
  );

  // action - add condition group
  const addGroup = () => {
    setGroups(_groups.concat(initGroups()))
  }

  // model -> views
  const groupViews = _groups?.map((group) => (
    <ConditionGroupView key={group.id}
      groupId={group.id} conditions={group.conditions}
      removeGroup={removeGroup} />
  ))

  return (
    <div key={id} className='rule-container'>
      {groupViews}
      <div className='rule-container-add-group'>
        <Button type="primary" className='add-group' onClick={addGroup}>添加新的条件组</Button>
      </div>
    </div>
  )
}
