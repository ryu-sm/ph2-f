import { API_500_ERROR } from '@/constant';
import { adUpdateArchiveFileNote } from '@/services';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Popover, Stack, TextareaAutosize, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const NotePopover = ({ open, onClose, anchorEl, value, id, refecth }) => {
  const [noteValue, setNoteValue] = useState(value);
  const handleBlur = async () => {
    if (noteValue === value || (noteValue === '' && value === '')) return onClose();
    try {
      await adUpdateArchiveFileNote(id, { note: noteValue });
      await refecth();
    } catch (error) {
      console.log(error);
      // toast.error(API_500_ERROR);
    }
    onClose();
  };
  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        marginTop: '33px',
        '.MuiPopover-paper': {
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'gray.70',
        },
      }}
    >
      <Stack width={'522px'} height={'172px'} paddingX={'10px'}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} height={'40px'}>
          <Typography variant="doc_download_note_title">備考</Typography>
          <CloseIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
        </Stack>

        <TextareaAutosize
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          minRows={6}
          maxRows={6}
          sx={{
            fontFamily: 'Hiragino Sans',
            fontSize: 12,
            fontWeight: '300',
            color: 'gray.100',
            '::-webkit-input-placeholder': {
              color: '#C4C4C4',
            },
            '&:focus-visible': {
              outline: '#3a87d3 auto 1px',
            },
          }}
        />
      </Stack>
    </Popover>
  );
};
