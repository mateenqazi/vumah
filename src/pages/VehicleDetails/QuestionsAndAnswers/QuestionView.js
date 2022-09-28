import { useTheme } from '@mui/material/styles';
import { Button, ClickAwayListener, Stack, Typography } from '@mui/material';
import { MAvatar } from '../../../components/@material-extend';
import React, { useState } from 'react';
import QuestionForm from './QuestionForm';
import useDroidDialog from '../../../hooks/useDroidDialog';
import ReportForm from './ReportForm';
import avatar from '../../../assets/User-avatar.svg';
import moment from 'moment';
import { LoadingButton } from '@mui/lab';

export default function QuestionView({ host, commentData, sendQuestion, parentID, loading }) {
  const { onOpen } = useDroidDialog();
  const [isReply, setIsReply] = useState(false);

  return (
    <Stack spacing={1}>
      <Stack spacing={1} direction={'row'} alignItems="center">
        <MAvatar
          src={commentData?.sender?.avatarUrl || 'https://vumah-store.s3.us-east-2.amazonaws.com/8840868.jpg'}
          alt={commentData?.sender?.firstName}
          sx={{
            width: '36px',
            height: '36px'
          }}
        />
        <Stack spacing={1}>
          <Typography component="snap" variant="body2" sx={{ pt: 2 }}>
            {commentData?.sender?.firstName} {commentData?.sender?.lastName}
          </Typography>
          <Typography component="snap" variant="caption" sx={{ color: (theme) => theme.palette.text.disabled }}>
            {moment(commentData?.date).format('DD MMM yyyy hh:mm a')}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        component="snap"
        variant="caption"
        style={{ marginLeft: 12 }}
        sx={{ color: (theme) => theme.palette.text.disable }}
      >
        {commentData?.comment}
      </Typography>
      {!parentID && (
        <>
          <Stack spacing={1} direction={'row'}>
            <LoadingButton
              loading={loading}
              variant="text"
              size="small"
              sx={{ color: (theme) => theme.palette.text.disabled }}
              onClick={() => {
                setIsReply(!isReply);
              }}
            >
              Reply
            </LoadingButton>
            <Button
              variant="text"
              size="small"
              sx={{ color: (theme) => theme.palette.text.disabled }}
              onClick={() => {
                onOpen(
                  '',
                  <>
                    <ReportForm host={host} />
                  </>
                );
              }}
            >
              Report
            </Button>
          </Stack>
          {isReply && (
            <ClickAwayListener onClickAway={() => setIsReply(false)}>
              <QuestionForm
                buttonName="Reply"
                placeholder="Reply"
                sendQuestion={sendQuestion}
                parentID={commentData?.id}
                onReply={() => setIsReply(!isReply)}
              />
            </ClickAwayListener>
          )}
        </>
      )}
    </Stack>
  );
}
