import React from 'react';
import './style.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Loading({ loading, children, delay, color = '#fff' }) {
  return (
    <Spin
      indicator={antIcon}
      spinning={loading}
      delay={delay}
      tip='Loading...'
      style={{ color: color }}
    >
      {children}
    </Spin>
  );
}

export default Loading;
