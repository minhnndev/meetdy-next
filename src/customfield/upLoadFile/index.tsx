import { Upload } from 'antd';
import messageApi from '@/api/messageApi';
import ACCEPT_FILE from '@/constants/acceptFile';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const UploadFile = ({ typeOfFile = 'file', children }) => {
  const { currentConversation, currentChannel } = useSelector(
    (state: any) => state.chat,
  );

  const handleCustomRequest = async ({ file }) => {
    const formData = new FormData();
    let typeFile;

    if (typeOfFile === 'media') {
      typeFile = file.type.startsWith('image') ? 'IMAGE' : 'VIDEO';
    } else {
      typeFile = 'FILE';
    }
    formData.append('file', file);

    const attachInfo = {
      type: typeFile,
      conversationId: currentConversation,
    };

    if (currentChannel) {
      attachInfo.channelId = currentChannel;
    }

    try {
      await messageApi.sendFileThroughMessage(
        formData,
        attachInfo,
        (percentCompleted) => {
          console.log('value', percentCompleted);
        },
      );
      toast.success(`Đã tải lên ${file.name}`);
    } catch (e) {
      toast.error(`Tải lên ${file.name} thất bại.`);
    }
  };

  return (
    <Upload
      accept={
        typeOfFile === 'media' ? ACCEPT_FILE.IMAGE_VIDEO : ACCEPT_FILE.FILE
      }
      multiple={true}
      customRequest={handleCustomRequest}
      showUploadList={false}
      progress={{ strokeWidth: 2, showInfo: false }}
    >
      {children}
    </Upload>
  );
};

export default UploadFile;
