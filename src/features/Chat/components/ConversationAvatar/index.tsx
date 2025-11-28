import { User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type ConversationAvatarProps = {
  avatar: any;
  demension?: number;
  isGroupCard?: boolean;
  totalMembers: number;
  type?: string;
  name?: string;
  isActived?: boolean;
  sizeAvatar?: number;
  frameSize?: number;
  avatarColor?: string;
};

export default function ConversationAvatar({
  avatar,
  demension = 28,
  isActived = false,
  totalMembers,
  name,
  sizeAvatar = 48,
  frameSize = 48,
  avatarColor = '',
}: ConversationAvatarProps) {
  return (
    <div className="avatar_conversation">
      <div className="relative inline-block">
        {isActived && (
          <span className="absolute right-0 top-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
        <Avatar
          className={`w-[${sizeAvatar}px] h-[${sizeAvatar}px]`}
          style={{ backgroundColor: avatarColor }}
        >
          <AvatarImage src={avatar} />
          <AvatarFallback>
            <UserIcon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
