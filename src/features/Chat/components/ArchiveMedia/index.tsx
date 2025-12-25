import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ImageItem from '../ImageItem';
import ModalVideoCustom from '@/components/ModalVideoCustom';
import ThumbnailCustom from '@/components/ThumbnailCustom';

interface ArchiveMediaProps {
  viewMediaClick?: (type: number, subtype: number) => void;
  name?: string;
  items?: any[];
}

function ArchiveMedia({ viewMediaClick, name = '', items = [] }: ArchiveMediaProps) {
  const [isDrop, setIsDrop] = useState(true);
  const [visible, setVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  const handleOnClick = () => {
    setIsDrop(!isDrop);
  };

  const handleViewAllOnClick = () => {
    if (viewMediaClick) {
      if (name === 'Ảnh') {
        viewMediaClick(2, 1);
      } else if (name === 'Video') {
        viewMediaClick(2, 2);
      }
    }
  };

  const handleVisibleModal = (url: string) => {
    setVisible(true);
    setCurrentVideo(url);
  };

  const handleOnClose = () => {
    setVisible(false);
    setCurrentVideo('');
  };

  return (
    <div className="border-b py-3">
      <button
        className="w-full flex items-center justify-between px-4 py-2 hover:bg-muted/50 transition-colors rounded-lg"
        onClick={handleOnClick}
      >
        <span className="font-medium text-sm">{name}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${!isDrop ? '-rotate-90' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all ${isDrop ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="grid grid-cols-4 gap-2 px-4 py-2">
          {name === 'Video' ? (
            <>
              {items.map((ele, index) => (
                <ThumbnailCustom
                  key={index}
                  url={ele.content}
                  onVisibleVideoModal={handleVisibleModal}
                />
              ))}
            </>
          ) : (
            <>
              {items.map((itemEle, index) => (
                <ImageItem
                  key={index}
                  width={80}
                  height={80}
                  url={itemEle.content}
                  type={name === 'Video' ? name.toLowerCase() : 'image'}
                  onVisibleVideoModal={handleVisibleModal}
                />
              ))}
            </>
          )}
        </div>

        <div className="px-4">
          <button
            onClick={handleViewAllOnClick}
            className="text-sm text-primary hover:underline"
          >
            Xem Tất cả
          </button>
        </div>
      </div>

      <ModalVideoCustom
        isVisible={visible}
        url={currentVideo}
        onClose={handleOnClose}
      />
    </div>
  );
}

export default ArchiveMedia;
