import { useState, useRef, useEffect } from 'react';
// material
import { Box } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
//
import MessageAvatar from '../chat/components/MessageAvatar';

// ----------------------------------------------------------------------

export default function ChatAccount() {
  const [show, setShow] = useState(false);

  useEffect(async () => {
    setShow(true);
  }, []);

  const { user } = useAuth();
  const anchorRef = useRef(null);

  return (
    <>
      {show && (
        <>
          <Box ref={anchorRef} sx={{ position: 'relative' }}>
            <MessageAvatar
              user={user}
              sx={{
                cursor: 'pointer',
                width: '70px',
                height: '70px',
                border: 'solid 4px black',
                borderColor: (theme) => theme.palette.primary.main
              }}
            />
          </Box>
        </>
      )}
    </>
  );
}
