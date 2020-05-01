import React from 'react';
import { Link } from '../../../app/layout/common/CustomRouter';
import { Card, Typography, Comment, Avatar } from 'antd';

const { Title } = Typography;

const ExampleComment = ({ children }) => (
  <Comment
    actions={[<span key='comment-nested-reply-to'>Reply to</span>]}
    author={<Link to='/profile/:authorId'>Han Solo</Link>}
    avatar={
      <Avatar
        src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        alt='Han Solo'
      />
    }
    content={
      <p>
        We supply a series of design principles, practical patterns and high
        quality design resources (Sketch and Axure).
      </p>
    }
  >
    {children}
  </Comment>
);

function EventDetailedChat({ className }) {
  return (
    <Card
      className={className}
      headStyle={{ backgroundColor: '#00b5ad', textAlign: 'center' }}
      title={
        <Title level={4} className='event-detailed__chat-title'>
          Chat about this event
        </Title>
      }
    >
      <ExampleComment>
        <ExampleComment>
          <ExampleComment />
          <ExampleComment />
        </ExampleComment>
      </ExampleComment>
    </Card>
  );
}

export default EventDetailedChat;
