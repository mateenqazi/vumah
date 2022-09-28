import React, { useState, useCallback } from 'react';
// material
import { Card, CardContent, Paper, Box, Typography, List, ListItem } from '@mui/material';
// utils
import { alpha, styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { fData } from '../../utils/formatNumber';
import { UploadIllustration } from '../../assets';
import { AnimatePresence, motion } from 'framer-motion';
import { isString } from 'lodash';
import { varFadeInRight } from '../../components/animate';
import { MIconButton } from '../../components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import CarouselVehicles from '../../components/VehicleCarousel/CarouselVehicles';
import { Add } from '@mui/icons-material';
import axios from 'axios';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const LargeImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  position: 'absolute'
});

const ThumbImgStyle = styled('img')(({ theme }) => ({
  opacity: 0.48,
  width: THUMB_SIZE,
  cursor: 'pointer',
  height: THUMB_SIZE,
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadiusSm,
  objectFit: 'cover',
  position: 'absolute',
  '&:hover': {
    opacity: 0.72,
    transition: theme.transitions.create('opacity')
  }
}));

// ----------------------------------------------------------------------

LargeItem.propTypes = {
  item: PropTypes.object
};

function LargeItem({ file }) {
  const { name, size, preview } = file;

  return (
    <Box
      sx={{
        position: 'relative',
        paddingTop: '300px'
      }}
    >
      <LargeImgStyle alt={name} src={preview} />
    </Box>
  );
}

ThumbnailItem.propTypes = {
  item: PropTypes.object
};

function ThumbnailItem({ file, onRemove }) {
  const { name, size, preview } = file;

  return (
    <Box
      component={motion.div}
      {...varFadeInRight}
      sx={{
        p: 0,
        m: 0.5,
        width: 80,
        height: 80,
        borderRadius: 1.5,
        overflow: 'hidden',
        position: 'relative',
        display: 'inline-flex'
      }}
    >
      <ThumbImgStyle alt={name} src={isString(file) ? file : preview} />
      <Box sx={{ top: 3, right: 12, position: 'absolute' }}>
        <MIconButton
          size="small"
          onClick={() => onRemove(file)}
          sx={{
            p: '1px',
            color: 'common.white',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.56),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.38)
            }
          }}
        >
          <Icon icon={closeFill} />
        </MIconButton>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));

// ----------------------------------------------------------------------

export default function UploadImages({ files, setFiles }) {
  const theme = useTheme();
  const [error, setErrors] = useState();

  const onDrop = useCallback(
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

  const onRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  const hasFile = files.length > 0;

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    onDrop
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
    <Card>
      <CardContent style={{ padding: 0 }}>
        <Box sx={{ width: '100%' }}>
          {fileRejections.length > 0 && <ShowRejectionItems />}

          {files.length > 0 ? (
            <>
              <List disablePadding sx={{ ...(hasFile && { mt: 2, mb: 0 }) }}>
                <AnimatePresence>
                  {files.map((file) => {
                    const { name, preview } = file;
                    const key = isString(file) ? file : name;

                    return (
                      <ListItem
                        key={key}
                        component={motion.div}
                        {...varFadeInRight}
                        sx={{
                          p: 0,
                          m: 0.5,
                          width: 80,
                          height: 80,
                          borderRadius: 1.5,
                          overflow: 'hidden',
                          position: 'relative',
                          display: 'inline-flex'
                        }}
                      >
                        <Paper
                          variant="outlined"
                          component="img"
                          src={isString(file) ? file : preview}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }}
                        />
                        <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
                          <MIconButton
                            size="small"
                            onClick={() => onRemove(file)}
                            sx={{
                              p: '2px',
                              color: 'common.white',
                              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                              '&:hover': {
                                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48)
                              }
                            }}
                          >
                            <Icon icon={closeFill} />
                          </MIconButton>
                        </Box>
                      </ListItem>
                    );
                  })}
                  <ListItem
                    component={motion.div}
                    {...varFadeInRight}
                    sx={{
                      p: 0,
                      m: 0.5,
                      width: 80,
                      height: 80,
                      borderRadius: 1.5,
                      overflow: 'hidden',
                      position: 'relative',
                      display: 'inline-flex',
                      justifyContent: 'center'
                    }}
                  >
                    <DropZoneStyle
                      {...getRootProps()}
                      sx={{
                        ...(isDragActive && { opacity: 0.72 }),
                        ...((isDragReject || error) && {
                          color: 'error.main',
                          borderColor: 'error.light',
                          bgcolor: 'error.lighter'
                        }),
                        width: '100%'
                      }}
                    >
                      <input {...getInputProps()} />
                      <Paper
                        variant="outlined"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          color: '#ffffff00',
                          position: 'absolute'
                        }}
                      >
                        <Add sx={{ width: 80, height: 80, color: 'text.secondary' }} />
                      </Paper>
                    </DropZoneStyle>
                  </ListItem>
                </AnimatePresence>
              </List>
            </>
          ) : (
            <>
              <DropZoneStyle
                {...getRootProps()}
                sx={{
                  ...(isDragActive && { opacity: 0.72 }),
                  ...((isDragReject || error) && {
                    color: 'error.main',
                    borderColor: 'error.light',
                    bgcolor: 'error.lighter'
                  })
                }}
              >
                <input {...getInputProps()} />

                <UploadIllustration sx={{ width: { xs: 100, md: 220 } }} />

                <Box sx={{ p: 3, ml: { md: 2 } }}>
                  <Typography component="snap" gutterBottom variant="h5" style={{ color: theme.palette.text.primary }}>
                    Drop or Select images
                  </Typography>

                  <Typography component="snap" variant="body2" sx={{ color: 'text.secondary' }}>
                    Drop images here or click&nbsp;
                    <Typography
                      variant="body2"
                      component="snap"
                      sx={{ color: 'primary.main', textDecoration: 'underline' }}
                    >
                      browse
                    </Typography>
                    &nbsp;thorough your machine
                  </Typography>
                </Box>
              </DropZoneStyle>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
