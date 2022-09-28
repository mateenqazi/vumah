import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import roundSend from '@iconify/icons-ic/round-send';
// material
import { styled, useTheme } from '@mui/material/styles';
import { Input, Divider, IconButton, InputAdornment, Stack } from '@mui/material';
//
import EmojiPicker from '../EmojiPicker';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE_CONTACT } from '../../graphql/Queries';
import { useParams } from 'react-router-dom';
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
  onSend: PropTypes.func
};

export default function ChatMessageInput({ disabled, ...other }) {
  const theme = useTheme();

  const { contactKey, conversationKey } = useParams();
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState({
    body: '',
    contentType: 'text',
    attachments: [],
    createdAt: new Date()
  });

  const [SendMessage, { loading }] = useMutation(SEND_MESSAGE_CONTACT);

  const onSend = async () => {
    try {
      return await SendMessage({ variables: { contactID: contactKey, vehicleID: conversationKey, message: message } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAttach = () => {
    fileInputRef.current.click();
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
    onSend().then(() => {
      return setMessage({
        body: '',
        contentType: 'text',
        attachments: [],
        createdAt: new Date()
      });
    });
  };

  console.log(loading);

  return (
    <RootStyle {...other}>
      <Input
        disabled={disabled}
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
