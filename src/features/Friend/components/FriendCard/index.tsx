import { Button } from 'antd';
import PersonalIcon from '@/features/Chat/components/PersonalIcon';

function FriendCard({ isMyRequest, data, onAccept, onDeny, onCancel }) {
  const handleRemoveMyRequest = () => {
    if (onCancel) {
      onCancel(data);
    }
  };

  const handleDeniedRequest = () => {
    if (onDeny) {
      onDeny(data);
    }
  };

  const handleAcceptFriend = () => {
    if (onAccept) {
      onAccept(data);
    }
  };

  return (
    <div className="friend-card">
      <div className="friend-card_info-user">
        <div className="friend-card_avatar">
          <PersonalIcon
            avatar={data.avatar}
            dimension={72}
            name={data.name}
            color={data.avatarColor}
          />
        </div>
        <div className="friend-card_name">
          {data.name}

          {/* btn-responsive */}
          <div className="friend-card_interact-mobile">
            {isMyRequest ? (
              <div className="friend-card_button friend-card_cancel-request">
                <Button type="danger" onClick={handleRemoveMyRequest}>
                  Hủy yêu cầu
                </Button>
              </div>
            ) : (
              <>
                <div className="friend-card_button friend-card_button--deny">
                  <Button type="default" onClick={handleDeniedRequest}>
                    Bỏ qua
                  </Button>
                </div>

                <div className="friend-card_button friend-card_button--accept">
                  <Button type="primary" onClick={handleAcceptFriend}>
                    Đồng ý
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="friend-card_interact">
        {isMyRequest ? (
          <div className="friend-card_button friend-card_button--accept">
            <Button type="danger" onClick={handleRemoveMyRequest}>
              Hủy yêu cầu
            </Button>
          </div>
        ) : (
          <>
            <div className="friend-card_button friend-card_button--deny">
              <Button type="default" onClick={handleDeniedRequest}>
                Bỏ qua
              </Button>
            </div>

            <div className="friend-card_button friend-card_button--accept">
              <Button type="primary" onClick={handleAcceptFriend}>
                Đồng ý
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FriendCard;
