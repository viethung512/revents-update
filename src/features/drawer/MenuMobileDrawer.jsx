import React from 'react';
import { useDispatch } from 'react-redux';
import { Drawer, Typography } from 'antd';
import { closeDrawer } from './drawer.actions';
import MenuMobile from '../nav/Menus/MenuMobile';

const title = <Typography level={3}>REVENTS</Typography>;

function MenuMobileDrawer(props) {
  const dispatch = useDispatch();

  return (
    <Drawer
      title={title}
      placement='right'
      closable={false}
      bodyStyle={{ paddingLeft: 0 }}
      visible={true}
      onClose={() => dispatch(closeDrawer())}
    >
      <MenuMobile />
    </Drawer>
  );
}

export default MenuMobileDrawer;
