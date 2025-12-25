import { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';
import mediaApi from '@/api/mediaApi';
import ContentTabPaneFile from '../ContentTabPaneFile';
import ContentTabPaneMedia from '../ContentTabPaneMedia';
import InfoTitle from '../InfoTitle';
import TabPaneMedia from '../TabPaneMedia';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InfoMediaSearchProps {
  onBack?: (value?: any) => void;
  tabpane: number;
}

function InfoMediaSearch({ onBack, tabpane }: InfoMediaSearchProps) {
  const [activeKey, setActiveKey] = useState(tabpane.toString());
  const { memberInConversation, currentConversation } = useSelector(
    (state: any) => state.chat,
  );
  const [medias, setMedias] = useState<any[]>([]);

  const getTypeWithTabpane = (value: number) => {
    if (value === 1) return 'IMAGE';
    if (value === 2) return 'VIDEO';
    if (value === 3) return 'FILE';
    return 'IMAGE';
  };

  const [query, setQuery] = useState<any>({
    conversationId: currentConversation,
    type: getTypeWithTabpane(tabpane),
  });

  const handleOnBack = (value?: any) => {
    onBack?.(value);
  };

  const handleChangeTab = (key: string) => {
    setQuery({ ...query, type: getType(key), senderId: '' });
    setActiveKey(key);
  };

  const handleQueryChange = async (queryResult: any) => {
    setQuery({ ...query, ...queryResult });
  };

  const getType = (key: string) => {
    if (key === '2') return 'VIDEO';
    if (key === '3') return 'FILE';
    return 'IMAGE';
  };

  useEffect(() => {
    const fetchMedia = async () => {
      const mediasResult = await mediaApi.fetchAllMedia(
        query.conversationId,
        query.type,
        query.senderId,
        query.startTime,
        query.endTime,
      );
      setMedias(mediasResult);
    };
    fetchMedia();
  }, [query]);

  return (
    <div className="flex flex-col h-full">
      <div className="border-b">
        <InfoTitle
          isBack={true}
          text="Kho lưu trữ"
          onBack={handleOnBack}
          isSelected={true}
        />
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs value={activeKey} onValueChange={handleChangeTab} className="h-full flex flex-col">
          <TabsList className="w-full grid grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="1">Ảnh</TabsTrigger>
            <TabsTrigger value="2">Video</TabsTrigger>
            <TabsTrigger value="3">File</TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="flex-1 overflow-hidden">
            <TabPaneMedia
              members={memberInConversation}
              onQueryChange={handleQueryChange}
            />
          </TabsContent>
          <TabsContent value="2" className="flex-1 overflow-hidden">
            <TabPaneMedia
              members={memberInConversation}
              onQueryChange={handleQueryChange}
            />
          </TabsContent>
          <TabsContent value="3" className="flex-1 overflow-hidden">
            <TabPaneMedia
              members={memberInConversation}
              onQueryChange={handleQueryChange}
            />
          </TabsContent>
        </Tabs>

        <Scrollbars
          autoHide={true}
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{ width: '100%', height: '60%' }}
        >
          {activeKey === '1' && (
            <ContentTabPaneMedia items={medias} type="image" />
          )}
          {activeKey === '2' && (
            <ContentTabPaneMedia items={medias} type="video" />
          )}
          {activeKey === '3' && <ContentTabPaneFile items={medias} />}
        </Scrollbars>
      </div>
    </div>
  );
}

export default InfoMediaSearch;
