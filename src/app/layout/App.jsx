import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';

// components
import NavBar from '../../features/nav/NavBar/NavBar';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <NavBar />
      <Content style={{ padding: '0 50px' }}>
        <Route path='/event' component={EventDashboard} />
      </Content>
    </Layout>
  );
}

export default App;
