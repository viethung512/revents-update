import React, { Fragment } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

// components
import NavBar from '../../features/nav/NavBar/NavBar';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import AddEventMobile from './AddEventMobile';
import HomePage from '../../features/home/HomePage';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route
          render={() => (
            <Fragment>
              <NavBar />
              <Content style={{ padding: '0 50px' }}>
                <AddEventMobile />
                <Route path='/event' component={EventDashboard} exact />
              </Content>
            </Fragment>
          )}
        />
      </Switch>
    </Layout>
  );
}

export default App;
