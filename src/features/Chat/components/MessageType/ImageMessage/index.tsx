import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import MESSAGE_STYLE from '@/constants/MessageStyle/messageStyle';
import OverlayImage from '@/components/OverlayImage';

function ImageMessage({
  content = '',
  children,
  dateAt = null,
  isSeen = false,
}) {
  return (
    <>
      <div className="messsage-image-wrapper">
        <div className="message-image--main">
          <Image
            src={content}
            style={MESSAGE_STYLE.imageStyle}
            preview={{ mask: <OverlayImage /> }}
          />
        </div>

        {children}
      </div>

      <div className="time-and-last_view">
        <div className="time-send">
          <span>
            {`0${dateAt.getHours()}`.slice(-2)}:
            {`0${dateAt.getMinutes()}`.slice(-2)}
          </span>
        </div>

        {isSeen && <div className="is-seen-message">Đã xem</div>}
      </div>
    </>
  );
}

export default ImageMessage;
