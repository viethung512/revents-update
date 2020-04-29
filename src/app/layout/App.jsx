import React, { Fragment } from 'react';
import './style.css';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';

// components
import NavBar from '../../features/nav/NavBar/NavBar';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import HomePage from '../../features/home/HomePage';
import DrawerManager from '../../features/drawer/DrawerManager';
import ModalManager from '../../features/modal/ModalManager';

const { Content } = Layout;

function App() {
  return (
    <Layout>
      <DrawerManager />
      <ModalManager />
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route
          render={() => (
            <Fragment>
              <NavBar />
              <Content className='content'>
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
