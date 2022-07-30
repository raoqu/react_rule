import { FC, useCallback, useState } from 'react'
import _ from 'lodash'

import { ConditionGroupView } from './ConditionGroupView'
import { Button, Switch } from 'antd'
import './RuleView.css';
import { GlobalContext } from '../../util/GlobalContext'
import { RuleConfig } from './model/RuleConfig'
import { RuleUtil } from './util/RuleUtil'

interface RuleProps {
  ruleId: string
}

function initRule(ruleId: string) {
  const context = GlobalContext.getOrInit(ruleId)
  const rule = new RuleConfig()
  rule.ruleId = ruleId
  rule.groupIds = []
  context.set("rule", rule)

  RuleUtil.addNewGroup(ruleId)
  return rule
}

export const RuleContainer: FC<RuleProps> = ({ ruleId }) => {
  const context = GlobalContext.getOrInit(ruleId)
  const rule = GlobalContext.getField(context, "rule", (k) => { return initRule(ruleId) }) as RuleConfig
  const [groupCount, setGroupCount] = useState(rule.groupIds.length)
  const [designMode, setDesignMode] = useState(true)

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
        ruleId={ruleId} groupId={groupId} groupCount={groupCount} enableRemove={rule.groupIds.length > 1}
        designMode={designMode} removeGroup={removeGroup} />
    )
  })
  
  const handleSwitchDesignMode = (checked: boolean) => {
    setDesignMode(checked)
  }

  return (
    <div key={ruleId} className='rule-container'>
      <div style={{margin:'3px'}}>
        <Switch defaultChecked onChange={handleSwitchDesignMode} /> 设计模式
      </div>
      {groupViews}
      <div className='rule-container-add-group'>
        <Button type="primary" className='add-group' onClick={addGroup}>添加新的条件组</Button>
      </div>
    </div>
  )
}
