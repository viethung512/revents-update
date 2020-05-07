import React from 'react';
import { Link } from './common/CustomRouter';
import { Result, Button } from 'antd';

function NotFound({ title }) {
  return (
    <Result
      status='404'
      title='404'
      subTitle={title}
      extra={
        <Link to='/events'>
          <Button
            style={{
              backgroundColor: '#2185d0',
              color: '#fff',
              borderRadius: 5,
            }}
          >
            Return to events page
          </Button>
        </Link>
      }
    />
  );
}

export default NotFound;
