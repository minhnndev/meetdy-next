import { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import friendApi from '@/api/friendApi';
import userApi from '@/api/userApi';
import { fetchFriends } from '../../friendSlice';

import UserCard from '@/components/UserCard';
import FriendItem from '../FriendItem';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ListFriendProps {
  data: any[];
}

function ListFriend({ data }: ListFriendProps) {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [userIsFind, setUserIsFind] = useState<any>({});
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);

  const handleOnClickMenu = async (key: string, id: string) => {
    if (key === '2') {
      const tempUser = data.find((ele) => ele._id === id);
      setDeleteConfirm(tempUser);
    } else {
      setIsVisible(true);
      const tempUser = data.find((ele) => ele._id === id);
      const realUser = await userApi.getUser(tempUser.username);
      setUserIsFind(realUser);
    }
  };

  const handleCancelModalUserCard = () => {
    setIsVisible(false);
  };

  const handleDeleteFriend = async () => {
    if (!deleteConfirm) return;
    try {
      await friendApi.deleteFriend(deleteConfirm._id);
      dispatch(fetchFriends() as any);
      toast.success('Xóa thành công');
    } catch (error) {
      toast.error('Xóa thất bại');
    }
    setDeleteConfirm(null);
  };

  return (
    <>
      <Scrollbars
        autoHide={true}
        autoHideTimeout={1000}
        autoHideDuration={200}
        style={{ height: '500px', width: '100%' }}
      >
        {data.length > 0 &&
          data.map((e, index) => (
            <FriendItem key={index} data={e} onClickMenu={handleOnClickMenu} />
          ))}
      </Scrollbars>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có thực sự muốn xóa <strong>{deleteConfirm?.name}</strong> khỏi danh sách bạn bè?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFriend}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ListFriend;
