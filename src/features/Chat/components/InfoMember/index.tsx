import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, Copy, Link, Lock, Unlock, Users } from 'lucide-react';
import { toast } from 'sonner';

import conversationApi from '@/api/conversationApi';
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
import { Button } from '@/components/ui/button';

interface InfoMemberProps {
  viewMemberClick?: (type: number) => void;
  quantity: number;
}

function InfoMember({ viewMemberClick, quantity }: InfoMemberProps) {
  const [isDrop, setIsDrop] = useState(true);
  const { currentConversation, conversations } = useSelector(
    (state: any) => state.chat,
  );
  const [status, setStatus] = useState(false);
  const { user } = useSelector((state: any) => state.global);
  const [checkLeader, setCheckLeader] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const convo = conversations.find((ele: any) => ele._id === currentConversation);
    if (convo) {
      setStatus(convo.isJoinFromLink);
      setCheckLeader(convo.leaderId === user._id);
    }
  }, [currentConversation, conversations, user._id]);

  const handleOnClick = () => {
    setIsDrop(!isDrop);
  };

  const handleViewAll = () => {
    viewMemberClick?.(1);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_API_URL}/jf-link/${currentConversation}`,
    );
    toast.info('Đã sao chép link');
  };

  const handleChangeStatus = async () => {
    try {
      await conversationApi.changeStatusForGroup(
        currentConversation,
        !status,
      );
      setStatus(!status);
      toast.success('Cập nhật thành công');
    } catch (error) {
      toast.error('Cập nhật thất bại');
    }
    setShowConfirm(false);
  };

  return (
    <div className="border-b py-3">
      <button
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-muted/50 transition-colors rounded-lg"
        onClick={handleOnClick}
      >
        <span className="font-medium text-sm">Thành viên nhóm</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${!isDrop ? '-rotate-90' : ''}`}
        />
      </button>

      <div className={`overflow-hidden transition-all ${isDrop ? 'max-h-96' : 'max-h-0'}`}>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
          onClick={handleViewAll}
        >
          <div className="p-2 rounded-lg bg-muted">
            <Users className="h-4 w-4" />
          </div>
          <span className="text-sm">{quantity} thành viên</span>
        </button>

        <div className="flex items-center gap-3 px-4 py-3">
          <div className="p-2 rounded-lg bg-muted shrink-0">
            <Link className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">Link tham gia nhóm</div>
            <div className="text-xs text-muted-foreground truncate">
              {`${import.meta.env.VITE_API_URL}/jf-link/${currentConversation}`}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4" />
            </Button>

            {checkLeader && (
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${status ? 'text-green-600' : 'text-destructive'}`}
                onClick={() => setShowConfirm(true)}
              >
                {status ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cảnh báo</AlertDialogTitle>
            <AlertDialogDescription>
              {status
                ? 'Người dùng có thể không tham gia bằng link được nữa'
                : 'Người dùng có thể tham gia bằng link'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleChangeStatus}>Đồng ý</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default InfoMember;
