import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import friendApi from '@/api/friendApi';
import { fetchListFriends } from '@/features/Chat/slice/chatSlice';
import {
  fetchFriends,
  fetchListRequestFriend,
  setAmountNotify,
} from '@/features/Friend/friendSlice';

import FriendCard from '../FriendCard';

function ListRequestFriend({ data = [] }) {
  const dispatch = useDispatch<any>();

  const { amountNotify } = useSelector((state: any) => state.friend);

  const handleRequestDeny = async (value) => {
    await friendApi.deleteRequestFriend(value._id);

    dispatch(setAmountNotify(amountNotify - 1));
    dispatch(fetchListRequestFriend());
  };

  const handleOnAccept = async (value) => {
    await friendApi.acceptRequestFriend(value._id);
    dispatch(fetchListRequestFriend() as any);
    dispatch(fetchFriends({ name: '' } as any) as any);
    dispatch(fetchListFriends({ name: '' } as any) as any);
    dispatch(setAmountNotify(amountNotify - 1));

    toast.success('Thêm bạn thành công');
  };

  return (
    <div>
      {data &&
        data.length > 0 &&
        data.map((ele) => (
          <FriendCard
            key={ele._id ?? ele.id}
            data={ele}
            isMyRequest={false}
            onDeny={handleRequestDeny}
            onAccept={handleOnAccept}
          />
        ))}
    </div>
  );
}

export default ListRequestFriend;
