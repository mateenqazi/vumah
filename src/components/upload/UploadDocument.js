import { isString } from 'lodash';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
// material
import { alpha, styled } from '@mui/material/styles';
import { Paper, Box, Typography, Stack } from '@mui/material';
// utils
import { fData } from '../../utils/formatNumber';
//
import { UploadIllustration } from '../../assets';
import { useTheme } from '@mui/material/styles';
import React, { useCallback } from 'react';
import Label from '../Label';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));

// ----------------------------------------------------------------------

UploadDocument.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sx: PropTypes.object
};

export default function UploadDocument({ error, file, setFile, sx, ...other }) {
  const theme = useTheme();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    onDrop: onDrop,
    ...other
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography component="snap" variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...(file && { padding: '12% 0' })
        }}
      >
        <input {...getInputProps()} />

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography component="snap" gutterBottom variant="h5" style={{ color: theme.palette.text.primary }}>
            Drop or Select file
          </Typography>

          <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
            Drop files here or click&nbsp;
            <Typography component="snap" variant="body2" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
              browse
            </Typography>
            &nbsp;thorough your device
          </Typography>
        </Box>

        {file && (
          <>
            {file?.type === 'image/png' || file?.type === 'image/jpg' || file?.type === 'image/jpeg' ? (
              <Box
                component="img"
                alt="file preview"
                src={isString(file) ? file : file.preview}
                sx={{
                  top: 8,
                  borderRadius: 1,
                  objectFit: 'cover',
                  position: 'absolute',
                  width: 'calc(100% - 16px)',
                  height: 'calc(100% - 16px)'
                }}
              />
            ) : (
              <Box
                sx={{
                  top: 8,
                  borderRadius: 1,
                  objectFit: 'cover',
                  position: 'absolute',
                  width: 'calc(100% - 16px)',
                  height: 'calc(100% - 16px)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: (theme) => theme.palette.background.paper
                }}
              >
                {file?.status === 'FAILED' ? (
                  <Stack direction="row" spacing={1}>
                    <Typography variant="body1" sx={{ alignText: 'center', color: 'text.disabled' }}>
                      Document status:
                    </Typography>
                    <Label color="error">{file?.status}</Label>
                  </Stack>
                ) : (
                  <Typography variant="body1" sx={{ alignText: 'center', color: 'text.disabled' }}>
                    File Ready for upload
                  </Typography>
                )}
              </Box>
            )}
          </>
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
