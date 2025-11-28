import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tag } from 'lucide-react';

import classifyUtils from '@/utils/classifyUtils';
import ConversationAvatar from '../ConversationAvatar';
import ShortMessage from '../ShortMessage';

type Props = {
  conversation: any;
  onClick?: (id: string) => void;
};

export default function ConversationSingle({ conversation, onClick }: Props) {
  const {
    _id,
    name,
    avatar,
    numberUnread,
    lastMessage,
    totalMembers,
    avatarColor,
  } = conversation;

  const { createdAt } = lastMessage;
  const { classifies, conversations } = useSelector((state: any) => state.chat);

  const [classify, setClassify] = useState<any>(null);

  useEffect(() => {
    if (classifies) {
      const temp = classifyUtils.getClassifyOfObject(_id, classifies);
      if (temp) {
        setClassify(temp);
      }
    }
  }, [conversation, conversations, classifies]);

  const handleClick = () => {
    if (onClick) onClick(_id);
  };

  return (
    <div className="conversation-item_box" onClick={handleClick}>
      <div className="left-side-box">
        <div className="icon-users">
          <ConversationAvatar
            totalMembers={totalMembers}
            avatar={avatar}
            type={conversation.type}
            name={name}
            avatarColor={avatarColor}
          />
        </div>
      </div>

      {lastMessage ? (
        <>
          <div className="middle-side-box">
            <span className="name-box">{name}</span>

            <div className="lastest-message">
              {classify && (
                <span className="tag-classify">
                  <Tag
                    className="inline-block w-3 h-3"
                    style={{ color: classify.color?.code }}
                    fill={classify.color?.code}
                  />
                </span>
              )}

              <ShortMessage message={lastMessage} type={conversation.type} />
            </div>
          </div>

          <div className="right-side-box">
            <span className="lastest-time">{createdAt}</span>
            <span className="message-count">{numberUnread}</span>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
