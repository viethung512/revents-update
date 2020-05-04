import React, { Fragment } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { Form, Button, Divider, Typography } from 'antd';
import { FacebookFilled, GooglePlusCircleFilled } from '@ant-design/icons';
import { socialLogin } from '../auth.actions';

const { Text } = Typography;

function AuthBtnSubmit({ btnContent, loading, error }) {
  const dispatch = useDispatch();
  const hasError = error && Object.keys(error).length > 0;

  return (
    <Fragment>
      {hasError && (
        <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
          <Text type='danger'>{error.message}</Text>
        </Form.Item>
      )}
      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type='primary'
          htmlType='submit'
          className='auth-btn auth-btn--submit'
          loading={loading}
          // disabled={loading}
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
          onClick={() => dispatch(socialLogin('facebook'))}
        >
          Login with Facebook
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          className='auth-btn auth-btn--google'
          icon={<GooglePlusCircleFilled />}
          onClick={() => dispatch(socialLogin('google'))}
        >
          Login with Google
        </Button>
      </Form.Item>
    </Fragment>
  );
}

export default AuthBtnSubmit;
