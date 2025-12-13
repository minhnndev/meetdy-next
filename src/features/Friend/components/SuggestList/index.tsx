import { useState } from 'react';
import SuggestCard from '../SuggestCard';
import UserCard from '@/components/UserCard';

interface SuggestListProps {
  data?: Array<any>;
}

export default function SuggestList({ data = [] }: SuggestListProps) {
  const [isUserCardVisible, setIsUserCardVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>({});

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
    setIsUserCardVisible(true);
  };

  const handleCloseUserCard = () => {
    setIsUserCardVisible(false);
  };

  const filteredData = data.filter((u) => u.status === 'NOT_FRIEND');

  return (
    <div id="suggest_list">
      <UserCard
        user={selectedUser}
        isVisible={isUserCardVisible}
        onCancel={handleCloseUserCard}
      />

      <div
        className="
        grid gap-4
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
      >
        {filteredData.map((item, index) => (
          <SuggestCard
            key={item.id || index}
            data={item}
            onClick={handleSelectUser}
          />
        ))}
      </div>
    </div>
  );
}
