import { Card, CardHeader, CardMedia, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
export const ImgPreview = ({ open, file, handleMouseOn, handleMouseLeave }) => {
  const isPdf = useMemo(() => {
    return file?.name?.split('.')[1] === 'pdf';
  }, [file]);

  return (
    <>
      {open && !isPdf && (
        <Card
          onMouseOver={() => {
            handleMouseOn(true);
          }}
          onMouseLeave={handleMouseLeave}
          sx={{
            zIndex: 9999,
            position: 'absolute',
            transform: 'translate(-50%, -50%) ',
            left: '50% !important',
            top: '50% !important',
            maxWidth: 700,
            backgroundColor: 'white',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)',
            borderRadius: '2px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardHeader
            title={file.name}
            titleTypographyProps={{
              variant: 'title_card_preview',
            }}
            subheader={<Divider />}
            sx={{
              width: '100%',
              '&.MuiCardHeader-root': {
                p: 0,
                pt: '14px',
                textAlign: 'center',
              },
              '& .MuiCardHeader-title': {
                pb: '14px',
              },
            }}
          />
          <CardMedia
            component="img"
            sx={{
              objectFit: 'contain',
              bgcolor: 'main_white',
              borderRadius: 5,
              m: 'auto',
              p: 2,
              height: 325,
              width: 512,
            }}
            image={file.src}
          />
        </Card>
      )}
    </>
  );
};
ImgPreview.propTypes = {
  open: PropTypes.bool,
  file: PropTypes.object,
  handleMouseOn: PropTypes.func,
  handleMouseLeave: PropTypes.func,
};
