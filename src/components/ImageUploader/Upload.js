import { useState, useCallback } from 'react';
// material
import {
  Card,
  Stack,
  Container,
  CardHeader,
  CardContent,
} from '@mui/material';
// utils
import { UploadMultiFile } from '../upload';

// ----------------------------------------------------------------------

export default function Upload() {
  const [files, setFiles] = useState([]);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFiles]
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  return (
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Card>
            <CardHeader title="Upload Multi File" />
            <CardContent>
              <UploadMultiFile
                showPreview={true}
                files={files}
                onDrop={handleDropMultiFile}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            </CardContent>
          </Card>
        </Stack>
      </Container>
  );
}
