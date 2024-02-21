import { ApWarningMainIcon } from '@/assets/icons';
import { ApArrowLeftIcon } from '@/assets/icons/ap-arrow-left';
import { ApImageDeleteIcon } from '@/assets/icons/ap-image-delete';
import { useBoolean } from '@/hooks';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ApLighterButton, ApPrimaryButton, ApSecondaryButton } from '../button';
import { ApModalWrapper } from '../modal-wrapper';
export const ImageDeleteModal = ({ open, onClose, clickedImage, setConfirmRemove }) => {
  const { value: isConfirmOpen, onTrue: setConfirmOpen, onFalse: setConfirmClose } = useBoolean(false);

  const handleConfirmRemove = () => {
    setConfirmClose();
    setConfirmRemove(true);
    onClose();
  };
  return (
    <>
      <ApModalWrapper open={open} styles={{ backgroundColor: 'transparent' }}>
        <Box p={'10px 16px'} bg={'white'} width={'100%'}>
          <Box component={'img'} src={clickedImage?.src} m={'0 auto'} sx={{ width: '100%', objectFit: 'contain' }} />
        </Box>
        <ApSecondaryButton startIcon={<ApArrowLeftIcon />} height={'40px'} onClick={onClose}>
          もどる
        </ApSecondaryButton>
        <ApLighterButton height={'40px'} onClick={setConfirmOpen}>
          <ApImageDeleteIcon />
          <Typography variant="radio_checkbox_button" ml={2}>
            この画像を削除する
          </Typography>
        </ApLighterButton>
      </ApModalWrapper>

      {isConfirmOpen && (
        <ApModalWrapper
          open={isConfirmOpen}
          zIndex={99}
          icon={<ApWarningMainIcon sx={{ width: 40, height: 40 }} />}
          label={`この画像を\n本当に削除しますか？`}
        >
          <ApPrimaryButton height={40} onClick={handleConfirmRemove}>
            削除する
          </ApPrimaryButton>
          <ApSecondaryButton height={40} onClick={setConfirmClose}>
            キャンセル
          </ApSecondaryButton>
        </ApModalWrapper>
      )}
    </>
  );
};

ImageDeleteModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  clickedImage: PropTypes.object,
  setConfirmRemove: PropTypes.func,
};
