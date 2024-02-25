import { Icons } from '@/assets';
import { ApModalWrapper } from '../modal-wrapper';
import { Stack, Typography } from '@mui/material';
import { ApPrimaryButton } from '../button';

export const ApUpdateApply = ({ isOpen, onClose, ...props }) => {
  return (
    <ApModalWrapper open={isOpen} icon={<Icons.ApSmileIcon />} label={`申込内容修正完了`}>
      <Stack spacing={4} alignItems={'center'}>
        <Typography>申し込みの内容を修正しました。</Typography>
        <ApPrimaryButton width={240} height={40} onClick={() => onClose()}>
          閉じる
        </ApPrimaryButton>
      </Stack>
    </ApModalWrapper>
  );
};
