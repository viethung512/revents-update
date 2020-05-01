import React from 'react';
import './style.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'antd';
import SettingNav from './SettingNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import PhotosPage from './PhotosPage';

function SettingDashboard(props) {
  return (
    <div className='setting-dashboard'>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={20} xl={20}>
          <Switch>
            <Route path='/settings/basic' component={BasicPage} />
            <Route path='/settings/about' component={AboutPage} />
            <Route path='/settings/account' component={AccountPage} />
            <Route path='/settings/photos' component={PhotosPage} />
            <Route component={() => <Redirect to='/settings/basic' />} />
          </Switch>
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          <SettingNav className='setting-dashboard__nav' />
        </Col>
      </Row>
    </div>
  );
}

export default SettingDashboard;
