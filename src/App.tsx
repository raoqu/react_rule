import { Button, Col, Layout, Row, Switch } from 'antd';
import RuleTree from './ui/ruleConfig/RuleTree'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css';
import { RuleContainer } from './ui/ruleConfig/RuleContainer';
import _ from 'lodash';
import { useState } from 'react';

function App() {

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Row>
          <Col span={6}>
            <RuleTree name="hahaha" />
          </Col>
          <Col span={18}>
            <RuleContainer ruleId={_.uniqueId()}/>
          </Col>
        </Row>
        {/* <div>
          <Button type="primary">Button</Button>
        </div> */}
        {/* <Example/> */}
      </DndProvider>
    </div>
  );
}

export default App;
