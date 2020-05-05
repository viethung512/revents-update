import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addEventComment } from '../event.actions';

const { TextArea } = Input;

const CommentEditor = ({ eventId, parentId, elmId, rows }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const loading = useSelector(state =>
    state.async.elementName === elmId ? state.async.loading : null
  );

  const onSubmit = e => {
    e.preventDefault();
    dispatch(addEventComment(eventId, comment, parentId, elmId));
    setComment('');
  };

  const onChange = e => setComment(e.target.value);

  return (
    <div>
      <Form.Item>
        <TextArea
          rows={rows}
          onChange={onChange}
          value={comment}
          placeholder='What do you thing about this event?'
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          onClick={onSubmit}
          loading={loading}
        >
          Add Comment
        </Button>
      </Form.Item>
    </div>
  );
};

export default CommentEditor;
