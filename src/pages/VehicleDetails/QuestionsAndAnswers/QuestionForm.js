import { useTheme } from '@mui/material/styles';
import { Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';

export default function QuestionForm({
  buttonName,
  placeholder,
  sendQuestion,
  loading,
  parentID = null,
  onReply = () => {}
}) {
  const theme = useTheme();
  const [value, setValue] = useState('');

  return (
    <Stack spacing={1} sx={{ alignItems: 'flex-end' }}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label={placeholder}
        fullWidth
        multiline
        rows={3}
        sx={{ color: theme.palette.text.primary }}
      />
      <LoadingButton
        loading={loading}
        variant={'contained'}
        sx={{ maxWidth: 200, borderRadius: '100px' }}
        onClick={async () => {
          await sendQuestion(parentID, value);
          onReply();
          setValue('');
        }}
      >
        {buttonName}
      </LoadingButton>
    </Stack>
  );
}
