import { FC, useCallback, useState } from 'react'
import _ from 'lodash'

import { ConditionGroupView } from './ConditionGroupView'
import { Button } from 'antd'
import './RuleView.css';
import { GlobalContext } from '../../util/GlobalContext'
import { RuleConfig } from './model/RuleConfig'
import { RuleUtil } from './util/RuleUtil'

interface RuleProps {
  ruleId: string
}

function initRule(ruleId: string) {
  const rule = new RuleConfig()
  rule.ruleId = ruleId
  rule.groupIds = []
  return rule
}

export const RuleContainer: FC<RuleProps> = ({ ruleId }) => {
  const context = GlobalContext.getOrInit(ruleId)
  const rule = GlobalContext.getField(context, "rule", (k) => { return initRule(ruleId)}) as RuleConfig
  const [groupCount, setGroupCount] = useState(rule.groupIds.length)

  const removeGroup = useCallback((groupId: string) => {
    RuleUtil.removeGroup(ruleId, groupId)
    setGroupCount(rule.groupIds.length)
  },
    [rule.groupIds]
  );

  // action - add condition group
  const addGroup = () => {
    RuleUtil.addNewGroup(ruleId)
    setGroupCount(rule.groupIds.length);
  }

  // model -> views
  const groupViews = rule.groupIds.map((groupId: string) => {
    const group = RuleUtil.getGroup(ruleId, groupId)
    return (
      <ConditionGroupView key={groupId}
        ruleId={ruleId} groupId={groupId} groupCount={groupCount}
        removeGroup={removeGroup} />
    )
  })

  return (
    <div key={ruleId} className='rule-container'>
      {groupViews}
      <div className='rule-container-add-group'>
        <Button type="primary" className='add-group' onClick={addGroup}>添加新的条件组</Button>
      </div>
    </div>
  )
}
