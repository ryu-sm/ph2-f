// import { convertUTC } from '@/utils';
import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { NotePopover } from './note-popover';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsManager } from '@/hooks/use-is-manager';
import { useBoolean } from '@/hooks';
import { widthConfig } from './widthConfig';
import { downloadImageZipAsync } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { adDeleteArchiveFile, adGetArchiveFile } from '@/services';
import { DeleteModal } from './delete-modal';
import { routeNames } from '@/router/settings';
export const ListItem = ({ doc, refecth }) => {
  const navigate = useNavigate();
  const isManager = useIsManager();

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
        width: widthConfig[1],
        textAlign: 'center',
        fontFamily: 'Barlow',
        fontWeight: '400',
        fontSize: '14px',
      },
    },
    {
      name: 'file_names',
      textStyle: {
        width: widthConfig[2],
        textAlign: 'left',
        fontFamily: 'Hiragino Sans',
        fontWeight: '300',
        fontSize: '12px',
      },
    },
    {
      name: 'created_at',
      textStyle: {
        width: widthConfig[3],
        textAlign: 'center',
        fontFamily: 'Barlow',
        fontWeight: '400',
        fontSize: '14px',
      },
    },
    ...(isManager
      ? [
          {
            name: 'org_name',
            textStyle: {
              width: widthConfig[4],
              textAlign: 'left',
              fontFamily: 'Hiragino Sans',
              fontWeight: '300',
              fontSize: '12px',
            },
          },
          {
            name: 's_sales_person_name',
            textStyle: {
              width: widthConfig[5],
              textAlign: 'left',
              fontFamily: 'Hiragino Sans',
              fontWeight: '300',
              fontSize: '12px',
            },
          },
        ]
      : []),
    {
      name: 'files_num',
      textStyle: {
        width: widthConfig[6],
        textAlign: 'center',
        fontFamily: 'Hiragino Sans',
        fontWeight: '300',
        fontSize: '12px',
      },
    },
    {
      name: 'note',
      textStyle: {
        width: widthConfig[7],
        textAlign: 'left',
        fontFamily: 'Hiragino Sans',
        fontWeight: '300',
        fontSize: '12px',
      },
    },
  ];

  const handleDownload = async (id) => {
    try {
      const res = await adGetArchiveFile(id);
      await downloadImageZipAsync(res.data, id);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adDeleteArchiveFile(id);
      toast.success('ファイルを削除しました。');
      await refecth();
      handleCloseModal();
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const renderItem = (item) => {
    if (item.name === 'note') {
      return (
        <>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            sx={{
              px: '10px',
              width: item.textStyle.width,
              minWidth: item.textStyle.width,
              borderRight: (theme) => `1px solid ${theme.palette.gray[60]}`,
            }}
          >
            <Stack
              sx={{
                width: '80%',
                borderBottom: (theme) => `1px solid ${theme.palette.gray[100]}`,
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
            refecth={refecth}
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
          minWidth: item.textStyle.width,
          borderRight: (theme) => `1px solid ${theme.palette.gray[60]}`,
        }}
      >
        {item.name === 'file_names' ? doc['file_names'].map((item) => item['name']).join(', ') : doc[item.name]}
      </Typography>
    );
  };

  return (
    <Stack
      bgcolor={'white'}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      borderBottom={'1px solid'}
      borderColor={'gray.60'}
      px={'10px'}
      flexGrow={1}
    >
      {renderList.map((item) => (
        <Stack key={item.name} justifyContent={'flex-start'} py={5}>
          {renderItem(item)}
        </Stack>
      ))}
      <Stack direction={'row'} alignItems={'center'} spacing={4} px={2} bgcolor={'white'} width={1}>
        <Button
          sx={{
            width: '125px',
            height: '30px',
            bgcolor: 'white',
            border: (theme) => `1px solid ${theme.palette.gray[100]}`,
            color: 'gray.100',
            borderRadius: '2px',
            '&:hover': {
              bgcolor: 'white',
              opacity: 0.9,
            },
          }}
          onClick={() =>
            navigate(
              isManager
                ? `${routeNames.adManagerDocumentsDetailPage.path}?id=${doc?.id}`
                : `${routeNames.adSalesPersonDocumentsDetailPage.path}?id=${doc?.id}`
            )
          }
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
          onClick={async () => await handleDownload(doc?.id)}
        >
          <Typography variant="doc_download_button">ダウンロード</Typography>
        </Button>
        {!isManager && (
          <Button
            sx={{
              width: '125px',
              height: '30px',
              // mr: 1,
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
      <DeleteModal
        open={openModal}
        onClose={handleCloseModal}
        onDelete={async () => await handleDelete(doc?.id)}
        file_name={doc['file_names'].map((item) => item['name']).join(', ')}
      />
    </Stack>
  );
};
