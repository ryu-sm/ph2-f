import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Icons } from '@/assets';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { AdPrimaryButton } from '@/components/administrator/button';
export const UpdateModal = ({ value, activeValue, open, onClose, ...props }) => {
  const { handleChangePreExaminationStatus } = usePreliminaryContext();
  const [errors, setErrors] = useState(null);
  const title = useMemo(() => {
    if (value === 3 && activeValue === 3) return `承認を解除しますか。\n行った変更が保存されなくなります。`;
    if (value === 0)
      return `本申し込みのステータスを「書類確認」に更新しますが、よろしいでしょうか。\n行った変更が保存されなくなります。`;
    if (value === 1)
      return `本申し込みのステータスは「書類確認」を「書類不備対応中」に更新しますが、よろしいでしょうか。\n行った変更が保存されなくなります。`;
    if (value === 2)
      return `本申し込みのステータスは「書類不備対応中」を「内容確認」に更新しますが、よろしいでしょうか。\n行った変更が保存されなくなります。`;
    if (value === 3)
      return `本申し込みのステータスは「内容確認」を「承認」に更新しますが、よろしいでしょうか。\n行った変更が保存されなくなります。`;
    if (value === 4)
      return `本申し込みのステータスは「承認」を「銀行へデータ連携」に更新しますが、よろしいでしょうか。\n行った変更が保存されなくなります。`;
  }, [value, activeValue]);

  const handleConfirm = async () => {
    const res = await handleChangePreExaminationStatus(value === 3 && activeValue === 3 ? value - 1 : value);
    if (res.status === 400) {
      setErrors(res.data);
      return;
    }
    onClose();
  };

  return errors ? (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      disableAutoFocus
    >
      <Stack
        sx={{
          width: 430,
          bgcolor: 'white',
          minWidth: 'auto',
          maxHeight: '45vh',
          borderRadius: 1,
          p: 3,
          overflow: 'auto',
        }}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ p: 3 }}>
          <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={onClose} />
        </Stack>
        <Stack direction={'row'} justifyContent={'center'} spacing={1} pb={2}>
          <Stack sx={{ pt: '6px' }}>
            <Icons.AdCircleNotice sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={onClose} />
          </Stack>
          <Stack>
            <Typography variant="dailog_content" color={'secondary.main'} lineHeight={'29px'} textAlign={'start'}>
              エラーが発生しました。
            </Typography>
            <Typography variant="dailog_content" color={'secondary.main'} lineHeight={'29px'} textAlign={'start'}>
              以下の項目をご確認ください。
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{ py: 3, px: 3 }} overflow={'auto'}>
          {Object.keys(errors).map((key) => (
            <Stack key={key}>
              <Stack>
                <Typography variant="dailog_content" color={'secondary.main'} lineHeight={'29px'} textAlign={'start'}>
                  {key}
                </Typography>
              </Stack>
              <Stack>
                {errors[key].map((sub) => (
                  <Stack sx={{ pl: 4 }}>
                    <Typography
                      variant="dailog_content"
                      color={'secondary.main'}
                      lineHeight={'29px'}
                      textAlign={'start'}
                    >
                      {sub}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ p: 3, pb: 6, pt: 3 }}>
          <AdPrimaryButton height={38} width={270} onClick={onClose}>
            閉じる
          </AdPrimaryButton>
        </Stack>
      </Stack>
    </Modal>
  ) : (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      disableAutoFocus
    >
      <Stack
        sx={{
          width: 430,
          bgcolor: 'white',
          minWidth: 'auto',
          maxHeight: '75vh',
          borderRadius: 1,
          p: 3,
        }}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ p: 3 }}>
          <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={onClose} />
        </Stack>
        <Stack sx={{ py: 3 }}>
          <Typography variant="dailog_content">{title}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ p: 3, pb: 6 }} spacing={3}>
          <AdPrimaryButton height={38} width={100} onClick={handleConfirm}>
            OK
          </AdPrimaryButton>
          <AdPrimaryButton height={38} width={100} onClick={onClose}>
            キャンセル
          </AdPrimaryButton>
        </Stack>
      </Stack>
    </Modal>
  );
};
