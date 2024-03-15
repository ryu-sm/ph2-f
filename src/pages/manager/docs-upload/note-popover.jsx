import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Popover, Stack, TextareaAutosize, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const NotePopover = ({ open, onClose, anchorEl, value, id }) => {
  const [noteValue, setNoteValue] = useState(value);
  const handleBlur = () => {
    /**
     * TODO 调用 archive_files/{id} 更新 {note: noteValue}
            调用 archive_files get 刷新列表
     */
    onClose();
  };
  return (
    <Popover
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        marginTop: '33px',
        left: -252,
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

        <CustomTextareaAutosize
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{
            border: 'none',
            overflow: 'hidden',
            resize: 'none',
            width: '100%',
            height: '65%',
            padding: 4,
            fontFamily: 'Hiragino Sans',
            fontSize: 12,
            fontWeight: '300',
            color: '#333333',
          }}
        />
      </Stack>
    </Popover>
  );
};
const CustomTextareaAutosize = styled((props) => <TextareaAutosize {...props} />)({
  '::-webkit-input-placeholder': {
    color: '#C4C4C4',
  },
  '&:focus-visible': {
    outline: '#3a87d3 auto 1px',
  },
});

NotePopover.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  anchorEl: PropTypes.instanceOf(Element),
  value: PropTypes.string,
  setValue: PropTypes.func,
  id: PropTypes.string,
};
