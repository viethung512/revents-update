import React from 'react';
import { Card, Typography, Comment, Avatar } from 'antd';
import CommentEditor from './CommentEditor';
import EventDetailedComment from './EventDetailedComment';
import { createDataTree } from '../../../app/util/helper';

const { Title } = Typography;

function EventDetailedChat({
  className,
  eventChat,
  profile: { displayName, avatarUrl },
  event,
}) {
  eventChat = createDataTree(eventChat);

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
      <Comment
        avatar={
          <Avatar
            src={avatarUrl}
            alt={displayName}
            shape='circle'
            size='default'
          />
        }
        content={
          event.id && (
            <CommentEditor
              eventId={event.id}
              parentId={0}
              elmId='root-comment'
              rows={4}
            />
          )
        }
      >
        {eventChat &&
          eventChat.length > 0 &&
          eventChat.map(chat => {
            return (
              <EventDetailedComment
                key={chat.id}
                chat={chat}
                event={event}
                elmId={chat.id}
              />
            );
          })}
      </Comment>
    </Card>
  );
}

export default EventDetailedChat;
