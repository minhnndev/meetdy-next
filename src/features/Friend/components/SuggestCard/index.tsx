import PersonalIcon from '@/features/Chat/components/PersonalIcon';

function SuggestCard({ data, onClick }) {
  const handleOnClick = () => {
    if (onClick) {
      onClick(data);
    }
  };

  return (
    <div className="suggest_card" onClick={handleOnClick}>
      <div className="suggest_card-img">
        <PersonalIcon
          avatar={data.avatar}
          name={data.name}
          dimension={90}
          color={data.avatarColor}
        />
      </div>
      <div className="suggest_card-info">
        <strong className="suggest_card-info--name">{data.name}</strong>
        <span className="suggest_card-info--common">
          {`${data.numberCommonGroup} nhóm chung`}
        </span>
        <span className="suggest_card-info--common">
          {`${data.numberCommonFriend} bạn chung`}
        </span>
      </div>
    </div>
  );
}

export default SuggestCard;
