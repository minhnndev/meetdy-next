import { useState } from 'react';

import userApi from '@/api/userApi';
import PersonalIcon from '@/features/Chat/components/PersonalIcon';
import UserCard from '@/components/UserCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ContactItemProps {
  data: any;
}

function ContactItem({ data }: ContactItemProps) {
  const [userIsFind, setUserIsFind] = useState<any>({});
  const [visibleUserCard, setVisibleUserCard] = useState(false);

  const handleViewDetail = async () => {
    const user = await userApi.getUser(data.username);
    setUserIsFind(user);
    setVisibleUserCard(true);
  };

  const handleCancelModalUserCard = () => {
    setVisibleUserCard(false);
  };

  const getStatusBadge = () => {
    if (data.status === 'NOT_FRIEND') {
      return <Badge variant="destructive">Chưa kết bạn</Badge>;
    } else if (data.status === 'YOU_FOLLOW') {
      return <Badge variant="secondary">Đã gửi lời mời kết bạn</Badge>;
    }
    return <Badge variant="default">Bạn bè</Badge>;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-xl border hover:shadow-sm transition-shadow">
      <button
        onClick={handleViewDetail}
        className="flex items-center gap-4 text-left"
      >
        <PersonalIcon avatar={data.avatar} dimension={56} name={data.name} />
        <div>
          <div className="font-medium">{data.name}</div>
          <div className="mt-1">{getStatusBadge()}</div>
        </div>
      </button>

      <Button variant="outline" size="sm" onClick={handleViewDetail}>
        Xem chi tiết
      </Button>

      <UserCard
        user={userIsFind}
        isVisible={visibleUserCard}
        onCancel={handleCancelModalUserCard}
      />
    </div>
  );
}

export default ContactItem;
