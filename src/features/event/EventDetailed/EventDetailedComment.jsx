import React, { useState } from 'react';
import { Comment, Avatar } from 'antd';
import CommentEditor from './CommentEditor';

function EventDetailedComment({
  event,
  chat: {
    displayName = '',
    photoURL = '/assets/user.png',
    text = 'test',
    parentId = '',
    id = '',
    children: child = [],
  },
  elmId,
}) {
  const [isShowCommentForm, setIsShowCommentForm] = useState(false);

  const handleShowCommentForm = () => setIsShowCommentForm(!isShowCommentForm);

  return (
    <Comment
      actions={[
        <span key='comment-nested-reply-to' onClick={handleShowCommentForm}>
          Reply to
        </span>,
      ]}
      author={<a href='/r'>{displayName}</a>}
      avatar={<Avatar src={photoURL} alt={displayName} />}
      content={<p>{text}</p>}
    >
      {isShowCommentForm && (
        <CommentEditor
          eventId={event.id}
          parentId={elmId}
          elmId={id}
          rows={2}
        />
      )}
      {child &&
        child.length > 0 &&
        child.map(chatChild => (
          <EventDetailedComment
            key={chatChild.id}
            event={event}
            chat={chatChild}
            elmId={chatChild.id}
          />
        ))}
    </Comment>
  );
}

export default EventDetailedComment;
