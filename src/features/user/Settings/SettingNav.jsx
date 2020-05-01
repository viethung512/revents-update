import React from 'react';
import { NavLink } from '../../../app/layout/common/CustomRouter';
import { Card, Typography, Menu } from 'antd';
import { UserOutlined, SettingFilled } from '@ant-design/icons';

const { Text } = Typography;

const profileMenu = [
  { key: 'basic', label: 'Basics', path: '/settings/basic' },
  { key: 'about', label: 'About Me', path: '/settings/about' },
  { key: 'photos', label: 'My Photos', path: '/settings/photos' },
];

const accountMenu = [
  { key: 'account', label: 'My Account', path: '/settings/account' },
];

function SettingNav({ className }) {
  return (
    <div className={className}>
      <Card
        className='card'
        title={
          <Text className='setting-dashboard__nav-item-title'>
            <UserOutlined />
            Profile
          </Text>
        }
        headStyle={{
          background: '#545454 linear-gradient(transparent,rgba(0,0,0,.05))',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Menu theme='light' defaultSelectedKeys='basic' id='settings-nav'>
          {profileMenu.map(item => (
            <Menu.Item
              key={item.key}
              className='setting-dashboard__nav-item-menu-item'
            >
              <NavLink to={item.path} style={{ color: 'rgba(0, 0, 0, 0.95)' }}>
                {item.label}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Card>

      <Card
        className='card'
        title={
          <Text className='setting-dashboard__nav-item-title'>
            <SettingFilled />
            Account
          </Text>
        }
        headStyle={{
          background: '#545454 linear-gradient(transparent,rgba(0,0,0,.05))',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Menu theme='light' defaultSelectedKeys='basic' id='settings-nav'>
          {accountMenu.map(item => (
            <Menu.Item
              key={item.key}
              className='setting-dashboard__nav-item-menu-item'
            >
              <NavLink to={item.path} style={{ color: 'rgba(0, 0, 0, 0.95)' }}>
                {item.label}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Card>
      {/* <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
      >
        <SubMenu
          key='sub1'
          title={
            <span>
              <MailOutlined />
              <span>Navigation One</span>
            </span>
          }
          className='card'
          style={{ backgroundColor: '#515151' }}
        >
          <Menu.Item key='1' className='setting-dashboard__nav-item-menu-item'>
            Option 1
          </Menu.Item>
          <Menu.Item key='2' className='setting-dashboard__nav-item-menu-item'>
            Option 2
          </Menu.Item>
          <Menu.Item key='3' className='setting-dashboard__nav-item-menu-item'>
            Option 3
          </Menu.Item>
          <Menu.Item key='4' className='setting-dashboard__nav-item-menu-item'>
            Option 4
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key='sub4'
          title={
            <span>
              <SettingOutlined />
              <span>Navigation Three</span>
            </span>
          }
          className='card'
          style={{ backgroundColor: '#515151' }}
        >
          <Menu.Item key='9' className='setting-dashboard__nav-item-menu-item'>
            Option 9
          </Menu.Item>
          <Menu.Item key='10' className='setting-dashboard__nav-item-menu-item'>
            Option 10
          </Menu.Item>
          <Menu.Item key='11' className='setting-dashboard__nav-item-menu-item'>
            Option 11
          </Menu.Item>
          <Menu.Item key='12' className='setting-dashboard__nav-item-menu-item'>
            Option 12
          </Menu.Item>
        </SubMenu>
      </Menu> */}
    </div>
  );
}

export default SettingNav;
