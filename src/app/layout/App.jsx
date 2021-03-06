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
import EventDetailed from '../../features/event/EventDetailed/EventDetailed';
import NotFound from './NotFound';
import SettingDashboard from '../../features/user/Settings/SettingDashboard';
import UserDetailed from '../../features/user/UserDetailed/UserDetailed';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import EventActivity from '../../features/event/EventActivity/EventActivity';

import { UserIsAuthenticated } from '../../features/auth/authWrapper';

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
                <Switch>
                  <Route path='/events' component={EventDashboard} exact />
                  <Route path='/events/:id' component={EventDetailed} />
                  <Route
                    path='/profile/:id'
                    component={UserIsAuthenticated(UserDetailed)}
                  />
                  <Route path='/settings' component={SettingDashboard} />
                  <Route
                    path='/people'
                    component={UserIsAuthenticated(PeopleDashboard)}
                  />
                  <Route
                    path='/activity'
                    component={UserIsAuthenticated(EventActivity)}
                  />
                  <Route
                    component={() => (
                      <NotFound
                        title={`Oops - we've looked everywhere but couldn't find this.`}
                      />
                    )}
                  />
                </Switch>
              </Content>
            </Fragment>
          )}
        />
      </Switch>
    </Layout>
  );
}

export default App;
