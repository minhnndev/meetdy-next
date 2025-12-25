import { useEffect, useRef, useState } from 'react';
import { Pencil } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import ConversationAvatar from '../ConversationAvatar';
import UploadAvatar from '@/components/UploadAvatar';
import conversationApi from '@/api/conversationApi';
import { updateNameOfConver } from '@/features/Chat/slice/chatSlice';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  conversation?: {
    _id?: string;
    name?: string;
    avatar?: string | File;
    type?: string;
    totalMembers?: number;
    avatarColor?: string;
  };
};

export default function InfoNameAndThumbnail({ conversation = {} }: Props) {
  const dispatch = useDispatch();
  const { currentConversation } = useSelector((state: any) => state.chat);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState<string>('');
  const refInitValue = useRef<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isClear, setIsClear] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (conversation?.type) {
      setValue(conversation?.name ?? '');
      refInitValue.current = conversation?.name ?? '';
    } else {
      setValue(conversation?.name ?? '');
      refInitValue.current = conversation?.name ?? '';
    }

    if (isModalVisible) {
      setIsClear(false);
    }
    setFile(null);
  }, [conversation, isModalVisible]);

  const handleOnClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFile(null);
    setIsClear(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleGetfile = (f: File | null) => {
    setFile(f);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      if (refInitValue.current !== value && value.trim().length > 0) {
        await conversationApi.changeNameConversation(currentConversation, value);
        dispatch(
          updateNameOfConver({
            conversationId: currentConversation,
            conversationName: value,
          }),
        );
      }

      if (file) {
        const frmData = new FormData();
        frmData.append('file', file);
        await conversationApi.changeAvatarGroup(currentConversation, frmData);
      }

      toast.success('Cập nhật thông tin thành công');
    } catch (error) {
      toast.error('Đã có lỗi xảy ra');
    } finally {
      setConfirmLoading(false);
      setIsModalVisible(false);
    }
  };

  const isButtonDisabled =
    (refInitValue?.current === value && !file) || value.trim().length === 0;

  return (
    <div className="flex flex-col items-center py-6 px-4">
      <Dialog open={isModalVisible} onOpenChange={(open) => !open && handleCancel()}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Cập nhật cuộc trò chuyện</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <UploadAvatar
              avatar={
                typeof conversation?.avatar === 'string' ? conversation?.avatar : ''
              }
              getFile={handleGetfile}
              isClear={isClear}
            />
            <Input
              placeholder="Nhập tên mới"
              onChange={handleInputChange}
              value={value}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Hủy
            </Button>
            <Button onClick={handleOk} disabled={isButtonDisabled || confirmLoading}>
              {confirmLoading ? 'Đang cập nhật...' : 'Thay đổi'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mb-3">
        <ConversationAvatar
          isGroupCard={true}
          totalMembers={conversation?.totalMembers}
          type={conversation?.type}
          avatar={conversation?.avatar}
          name={conversation?.name}
          avatarColor={conversation?.avatarColor}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold text-lg">{conversation?.name}</span>
        {conversation?.type && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleOnClick}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
