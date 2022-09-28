import { Button } from '@mui/material';
import React from 'react';
import { EditTextarea } from 'react-edit-text';
import { Card } from 'react-bootstrap';
import { useTheme } from '@mui/material/styles';

function CommentBox({ buttonName = 'Post Question', placeholder = 'Enter your Question Here...' }) {
  const theme = useTheme();

  return (
    <form>
      <Card style={{ marginTop: '10px', marginBottom: '10px', borderRadius: '10px' }}>
        <EditTextarea
          style={{
            width: '100%',
            padding: '5px',
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default,
            borderRadius: '10px'
          }}
          placeholder={placeholder}
        />
      </Card>
      <Button
        style={{
          marginLeft: '85%',
          padding: '5px',
          background: '#f67810',
          color: '#ffffff',
          marginTop: '2px',
          borderRadius: '20px',
          marginBottom: '15px'
        }}
      >
        {buttonName}
      </Button>
    </form>
  );
}

export default CommentBox;
