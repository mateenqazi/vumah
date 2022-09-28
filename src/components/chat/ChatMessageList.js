import PropTypes from 'prop-types';
import { findIndex } from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
//
import Scrollbar from '../Scrollbar';
import LightboxModal from '../LightboxModal';
import ChatMessageItem from './ChatMessageItem';
import useAuth from '../../hooks/useAuth';
import ReviewForm from './components/ReviewForm';

ChatMessageList.propTypes = {
  booking: PropTypes.object.isRequired
};

export default function ChatMessageList({ booking, messages, onAccept, onAcceptLoading, earning }) {
  const scrollRef = useRef();
  const { user } = useAuth();
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, []);

  const images = messages.filter((messages) => messages.contentType === 'image').map((messages) => messages.body);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(images, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, height: 1 }}>
        {messages.map((message) => (
          <ChatMessageItem
            earning={earning}
            key={message.id}
            message={message}
            booking={booking}
            onOpenLightbox={handleOpenLightbox}
            onAcceptLoading={onAcceptLoading}
            onAccept={onAccept}
            isAccepted
          />
        ))}

        {booking.isCheckOutComplete === true && <ReviewForm booking={booking} user={user} />}
      </Scrollbar>

      <LightboxModal
        images={images}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </>
  );
}
