import { useState } from 'react';
import { Button, Tag } from 'antd';

import userApi from '@/api/userApi';
import PersonalIcon from '@/features/Chat/components/PersonalIcon';
import UserCard from '@/components/UserCard';

function ContactItem({ data }) {
  const [userIsFind, setUserIsFind] = useState({});
  const [visibleUserCard, setVisibleUserCard] = useState(false);

  const handleViewDetail = async () => {
    const user = await userApi.getUser(data.username);
    console.log(user);
    setUserIsFind(user);
    setVisibleUserCard(true);
  };

  const handleCancelModalUserCard = () => {
    setVisibleUserCard(false);
  };

  return (
    <div className="contact-card">
      <div className="contact-card_info-user" onClick={handleViewDetail}>
        <div className="contact-card_avatar">
          <PersonalIcon avatar={data.avatar} dimension={72} name={data.name} />
        </div>
        <div className="contact-card_info">
          <div className="contact-card_name">{data.name}</div>

          <div className="contact-card_status">
            {data.status === 'NOT_FRIEND' ? (
              <Tag color="#f50">Chưa kết bạn</Tag>
            ) : data.status === 'YOU_FOLLOW' ? (
              <Tag color="#2db7f5">Đã gửi lời mời kết bạn</Tag>
            ) : (
              <Tag color="#87d068">Bạn bè</Tag>
            )}
          </div>
        </div>
      </div>

      <div className="contact-card_interact">
        <div className="contact-card_button contact-card_button--detail">
          <Button type="default" shape="round" onClick={handleViewDetail}>
            Xem chi tiết
          </Button>
        </div>
      </div>

      <UserCard
        user={userIsFind}
        isVisible={visibleUserCard}
        onCancel={handleCancelModalUserCard}
        // onAddFriend={handleOnAddFriend}
      />
    </div>
  );
}

export default ContactItem;
