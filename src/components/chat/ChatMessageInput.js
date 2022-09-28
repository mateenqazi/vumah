import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import micFill from '@iconify/icons-eva/mic-fill';
import roundSend from '@iconify/icons-ic/round-send';
import attach2Fill from '@iconify/icons-eva/attach-2-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Input, Divider, IconButton, InputAdornment, Stack } from '@mui/material';
//
import EmojiPicker from '../EmojiPicker';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../graphql/Queries';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2)
}));

// ----------------------------------------------------------------------

ChatMessageInput.propTypes = {
  disabled: PropTypes.bool,
  conversationId: PropTypes.string
};

export default function ChatMessageInput({ booking, disabled, conversationId, ...other }) {
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState({
    body: '',
    contentType: 'text',
    attachments: [],
    createdAt: new Date()
  });

  const [SendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    variables: { bookingID: conversationId, message: message }
  });

  const onSend = async () => {
    try {
      return await SendMessage();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeMessage = (event) => {
    setMessage({
      ...message,
      body: event.target.value
    });
  };

  const handleChangeEmoji = (v) => {
    setMessage({
      ...message,
      body: v
    });
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter' && !loading) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message.body) {
      return '';
    }
    onSend().then((r) => {
      return setMessage({
        body: '',
        contentType: 'text',
        attachments: [],
        createdAt: new Date()
      });
    });
  };

  return (
    <RootStyle {...other}>
      <Input
        disabled={disabled || booking.isCheckOutComplete === true || !booking.isAccepted || booking.isDeclined}
        fullWidth
        value={message.body}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        startAdornment={
          <InputAdornment position="start">
            <EmojiPicker value={message.body} setValue={handleChangeEmoji} />
          </InputAdornment>
        }
        sx={{ height: '100%' }}
      />

      <Divider orientation="vertical" flexItem />

      <LoadingButton
        loading={loading}
        color="primary"
        disabled={!message.body || disabled}
        onClick={handleSend}
        sx={{ borderRadius: '100px', minWidth: '40px', minHeight: '40px', mr: 3 }}
        style={{ color: !message.body || disabled ? '' : theme.palette.primary.main }}
      >
        {!loading && <Icon icon={roundSend} width={24} height={24} />}
      </LoadingButton>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </RootStyle>
  );
}
