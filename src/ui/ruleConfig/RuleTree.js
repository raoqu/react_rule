import React from 'react'
import { Tree } from 'antd'
import { RuleTreeItem } from './RuleTreeItem'
import { RULE_DATA } from './model/RuleData'
import './RuleView.css'

export default class RuleTree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedKey: 'folder2',
      treeContent: RULE_DATA,
    }
  }
  getTreeNode = (treeContent) => {
    if (!treeContent || treeContent.length === 0) {
      return null
    }
    const treeNode = treeContent.map((value) => {
      if (value.id === 'all') {
        return (
          <Tree.TreeNode title={<RuleTreeItem title={value.title}  id={value.id} condition={value.condition}/>} key={value.id}>
            {this.getTreeNode(value.children)}
          </Tree.TreeNode>)
      }
      {/* title={<RuleItem value={value}/>} */ }

      return (
        <Tree.TreeNode
          title={<RuleTreeItem title={value.title} id={value.id} condition={value.condition}/>}
          key={value.id}
        >
          {this.getTreeNode(value.children)}
        </Tree.TreeNode>
      )
    })
    return (
      treeNode
    )
  }
  render() {
    const { treeContent } = this.state
    const treeNodes = this.getTreeNode(treeContent)
    return (<div className='rule-tree'>
      <Tree key="123" defaultExpandedKeys={['all', 'folder1']}>
        {treeNodes}
      </Tree>
    </div>
    )
  }
}