import PersonalIcon from '@/features/Chat/components/PersonalIcon';
import { Button } from '@/components/ui/button';

interface FriendCardProps {
  isMyRequest?: boolean;
  data: any;
  onAccept?: (data: any) => void;
  onDeny?: (data: any) => void;
  onCancel?: (data: any) => void;
}

function FriendCard({ isMyRequest = false, data, onAccept, onDeny, onCancel }: FriendCardProps) {
  const handleRemoveMyRequest = () => {
    onCancel?.(data);
  };

  const handleDeniedRequest = () => {
    onDeny?.(data);
  };

  const handleAcceptFriend = () => {
    onAccept?.(data);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-xl border hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4">
        <PersonalIcon
          avatar={data.avatar}
          dimension={56}
          name={data.name}
          color={data.avatarColor}
        />
        <div className="font-medium">{data.name}</div>
      </div>

      <div className="flex items-center gap-2">
        {isMyRequest ? (
          <Button variant="destructive" size="sm" onClick={handleRemoveMyRequest}>
            Hủy yêu cầu
          </Button>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={handleDeniedRequest}>
              Bỏ qua
            </Button>
            <Button size="sm" onClick={handleAcceptFriend}>
              Đồng ý
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default FriendCard;
