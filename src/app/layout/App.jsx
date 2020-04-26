import React from 'react';
import { Layout } from 'antd';

// components
import NavBar from '../../features/nav/NavBar/NavBar';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';

function App() {
  return (
    <Layout>
      <NavBar />
      <EventDashboard />
    </Layout>
  );
}

export default App;
