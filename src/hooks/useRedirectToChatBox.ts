import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCurrentConversation } from '@/features/Chat/slice/chatSlice';

const useRedirectToChatBox = (chatId) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  navigate('/chat');
  dispatch(setCurrentConversation(chatId));
};

export default useRedirectToChatBox;
