import React from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'antd';
import { updateProfile } from '../user.actions';
import SettingNav from './SettingNav';
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import PhotosPage from './PhotosPage';
import { updatePassword } from '../../auth/auth.actions';

function SettingDashboard(props) {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.firebase);

  const handleUpdateProfile = values => {
    for (let key in values) {
      if (!values[key]) {
        delete values[key];
      }

      if (key === 'dateOfBirth' && values['dateOfBirth']) {
        values['dateOfBirth'] = values['dateOfBirth'].unix();
      }
    }

    dispatch(updateProfile(values));
  };

  const handleUpdatePassword = credential => {
    dispatch(updatePassword(credential));
  };

  return (
    <div className='setting-dashboard'>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={20} xl={20}>
          <Switch>
            <Route
              path='/settings/basic'
              component={() => (
                <BasicPage
                  profile={profile}
                  updateProfile={handleUpdateProfile}
                />
              )}
              exact
            />
            <Route
              path='/settings/about'
              component={() => (
                <AboutPage
                  profile={profile}
                  updateProfile={handleUpdateProfile}
                />
              )}
              exact
            />
            <Route
              path='/settings/account'
              component={() => (
                <AccountPage updatePassword={handleUpdatePassword} />
              )}
              exact
            />
            <Route path='/settings/photos' component={PhotosPage} exact />
            <Route component={() => <Redirect to='/settings/basic' />} exact />
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
