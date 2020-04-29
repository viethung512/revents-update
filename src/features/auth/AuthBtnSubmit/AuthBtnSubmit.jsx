import React, { Fragment } from 'react';
import './style.css';
import { Form, Button, Divider } from 'antd';
import { FacebookFilled, GooglePlusCircleFilled } from '@ant-design/icons';

function AuthBtnSubmit({ btnContent }) {
  return (
    <Fragment>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type='primary'
          htmlType='submit'
          className='auth-btn auth-btn--submit'
        >
          {btnContent}
        </Button>
      </Form.Item>
      <Divider plain='true' style={{ margin: '6px 0' }}>
        Or
      </Divider>

      <Form.Item style={{ marginBottom: 12 }}>
        <Button
          type='primary'
          className='auth-btn auth-btn--facebook'
          icon={<FacebookFilled />}
        >
          Login with Facebook
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          className='auth-btn auth-btn--google'
          icon={<GooglePlusCircleFilled />}
        >
          Login with Google
        </Button>
      </Form.Item>
    </Fragment>
  );
}

export default AuthBtnSubmit;
