import { convertUTC } from '@/utils';
import { Button, Stack, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { NotePopover } from './note-popover';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsManager } from '@/hooks/use-is-manager';
import { useBoolean } from '@/hooks';
import { DeleteModal } from './delete-modal';
export const DocItem = ({ doc }) => {
  const pathname = useLocation().pathname;
  const isManager = useIsManager(pathname);

  const { value: openModal, onTrue: handleOpenModal, onFalse: handleCloseModal } = useBoolean(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const renderList = [
    {
      name: 'id',
      textStyle: {
        width: '100px',
        textAlign: 'center',
        fontFamily: 'Barlow',
        fontWeight: '400',
        fontSize: '14px',
      },
    },
    {
      name: 'file_name',
      textStyle: {
        width: '350px',
        textAlign: 'left',
        fontFamily: 'Hiragino Sans',
        fontWeight: '300',
        fontSize: '12px',
      },
    },
    {
      name: 'created_at',
      textStyle: {
        width: '120px',
        textAlign: 'center',
        fontFamily: 'Barlow',
        fontWeight: '400',
        fontSize: '14px',
      },
    },
    ...(isManager
      ? [
          {
            name: 'company_name',
            textStyle: {
              width: '220px',
              textAlign: 'left',
              fontFamily: 'Hiragino Sans',
              fontWeight: '300',
              fontSize: '12px',
            },
          },
          {
            name: 'name_kanji',
            textStyle: {
              width: '140px',
              textAlign: 'left',
              fontFamily: 'Hiragino Sans',
              fontWeight: '300',
              fontSize: '12px',
            },
          },
        ]
      : []),
    {
      name: 'size',
      textStyle: {
        width: '100px',
        textAlign: 'center',
        fontFamily: 'Hiragino Sans',
        fontWeight: '300',
        fontSize: '12px',
      },
    },
    {
      name: 'note',
      textStyle: {
        width: '200px',
        textAlign: 'left',
        fontFamily: 'Hiragino Sans',
        fontWeight: '300',
        fontSize: '12px',
      },
    },
  ];

  const renderItem = (item) => {
    if (item.name === 'note') {
      return (
        <>
          <Stack
            sx={{
              width: item.textStyle.width,
              borderRight: (theme) => `1px solid ${theme.palette.gray[60]}`,
            }}
          >
            <Stack
              sx={{
                width: '80%',
                borderBottom: (theme) => `1px solid ${theme.palette.gray[100]}`,
                marginLeft: 3,
              }}
              onClick={handleOpenPopover}
            >
              <TextField
                variant="standard"
                value={doc['note'] || ''}
                placeholder="備考を入力して下さい"
                sx={{
                  width: item.textStyle.width,
                  py: 1,
                  '& .MuiInput-underline:after': {
                    borderBottom: 'none',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottom: 'none',
                  },
                  '.MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottom: 'none',
                  },
                  '& .MuiInputBase-input': {
                    fontSize: '13px',
                    fontFamily: 'Noto Sans JP',
                    fontWeight: 400,
                    lineHeight: '19px',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#c4c4c4',
                    opacity: 1,
                    fontSize: '12px',
                  },
                }}
              />
            </Stack>
          </Stack>
          <NotePopover
            open={open}
            onClose={handleClosePopover}
            anchorEl={anchorEl}
            value={doc['note']}
            id={doc['id']}
          />
        </>
      );
    }
    return (
      <Typography
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          color: 'gray.100',
          lineHeight: 1.8,
          px: '10px',
          ...item.textStyle,
          borderRight: (theme) => `1px solid ${theme.palette.gray[60]}`,
        }}
      >
        {item.name === 'file_name'
          ? doc['file_name'].join(', ')
          : item.name === 'created_at'
          ? convertUTC(doc['created_at'])
          : doc[item.name]}
      </Typography>
    );
  };

  return (
    <>
      <Stack direction={'row'} alignItems={'center'} borderBottom={'1px solid'} borderColor={'gray.60'}>
        {renderList.map((item) => (
          <Stack key={item.name} justifyContent={'center'} py={5}>
            {renderItem(item)}
          </Stack>
        ))}
        <Stack direction={'row'} alignItems={'center'} spacing={4} ml={4} width={isManager ? '420px' : '550px'}>
          <Button
            sx={{
              width: '125px',
              height: '30px',
              mr: 1,
              bgcolor: 'white',
              border: (theme) => `1px solid ${theme.palette.gray[100]}`,
              color: 'gray.100',
              borderRadius: '2px',
              '&:hover': {
                bgcolor: 'white',
                opacity: 0.9,
              },
            }}
          >
            <Typography variant="doc_download_button">詳細</Typography>
          </Button>
          <Button
            sx={{
              width: '125px',
              height: '30px',
              bgcolor: 'white',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: 'primary.main',
              borderRadius: '2px',
              '&:hover': {
                bgcolor: 'white',
                opacity: 0.9,
              },
            }}
          >
            <Typography variant="doc_download_button">ダウンロード</Typography>
          </Button>
          {!isManager && (
            <Button
              sx={{
                width: '125px',
                height: '30px',
                mr: 1,
                bgcolor: 'secondary.80',
                borderRadius: '2px',
                '&:hover': {
                  bgcolor: 'secondary.80',
                  opacity: 0.9,
                },
              }}
              onClick={handleOpenModal}
            >
              <Typography variant="doc_download_button">削除</Typography>
            </Button>
          )}
        </Stack>
      </Stack>
      <DeleteModal open={openModal} onClose={handleCloseModal} file={doc} />
    </>
  );
};

DocItem.propTypes = {
  doc: PropTypes.object,
};
