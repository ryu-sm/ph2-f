import { Box, Button, Grid, Modal, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Icons } from '@/assets';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { AdPrimaryButton } from '@/components/administrator/button';
import { useBoolean } from '@/hooks';
import { ComModalWapper } from '../../com-modal-wapper';
import Draggable from 'react-draggable';
export const UpdateModal = ({ value, activeValue, open, onClose, ...props }) => {
  const { handleChangePreExaminationStatus } = usePreliminaryContext();
  const [errors, setErrors] = useState(null);
  const [sbiErrors, setSbiErrors] = useState(null);

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
    const res = await handleChangePreExaminationStatus(value === 3 && activeValue === 3 ? value - 1 : value, onClose);

    if (res.status === 400) {
      setErrors(res.data);
      return;
    }
    if (res.status === 403) {
      setSbiErrors(res.data?.erorrs);
      return;
    }
    if (res.status === 406) {
      setSbiErrors(res.data?.erorrs);
      return;
    }

    onClose();
  };

  const handleErrorClose = () => {
    setErrors(null);
    setSbiErrors(null);
    onClose();
  };

  if (errors) {
    return (
      <Box sx={{ position: 'fixed', top: '50px', left: '50px', width: '300px' }}>
        <Draggable>
          <Stack
            sx={{
              cursor: 'move',
              bgcolor: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
            }}
          >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} sx={{ p: 3, height: 30 }}>
              {onClose && <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={onClose} />}
            </Stack>
            <Stack sx={{ px: 8 }}>
              {
                <Box>
                  <Draggable>
                    <Stack direction={'row'} justifyContent={'center'} spacing={1} pb={2}>
                      <Stack sx={{ pt: '6px' }}>
                        <Icons.AdCircleNotice sx={{ width: 13, height: 12, cursor: 'pointer' }} />
                      </Stack>
                      <Stack>
                        <Typography
                          variant="dailog_content"
                          color={'secondary.main'}
                          lineHeight={'29px'}
                          textAlign={'start'}
                        >
                          エラーが発生しました。
                        </Typography>
                        <Typography
                          variant="dailog_content"
                          color={'secondary.main'}
                          lineHeight={'29px'}
                          textAlign={'start'}
                        >
                          以下の項目をご確認ください。
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack sx={{ py: 3, px: 3, maxHeight: '45dvh' }} overflow={'auto'}>
                      {Object.keys(errors).map((key) => (
                        <Stack key={key}>
                          <Stack>
                            <Typography
                              variant="dailog_content"
                              color={'secondary.main'}
                              lineHeight={'29px'}
                              textAlign={'start'}
                            >
                              {key}:
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
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      sx={{ p: 3, pb: 3, pt: 6 }}
                    >
                      <AdPrimaryButton
                        height={38}
                        width={270}
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(errors, null, 2));
                        }}
                      >
                        エラー内容をコピーする
                      </AdPrimaryButton>
                    </Stack>
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      sx={{ p: 3, pb: 6, pt: 3 }}
                    >
                      <AdPrimaryButton height={38} width={270} onClick={handleErrorClose}>
                        閉じる
                      </AdPrimaryButton>
                    </Stack>
                  </Draggable>
                </Box>
              }
            </Stack>
          </Stack>
        </Draggable>
      </Box>
    );
  } else if (sbiErrors) {
    return (
      <ComModalWapper open={open} onClose={handleErrorClose}>
        <Stack direction={'row'} justifyContent={'center'} spacing={1} pb={1}>
          <Stack sx={{ pt: '6px' }}>
            <Icons.AdCircleNotice sx={{ width: 13, height: 12, cursor: 'pointer' }} />
          </Stack>
          <Stack>
            <Typography variant="dailog_content" color={'secondary.main'} lineHeight={'29px'} textAlign={'start'}>
              エラーが発生しました。
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{ py: 3, px: 3 }} overflow={'auto'}>
          <Typography variant="dailog_content" color={'secondary.main'} lineHeight={'29px'} textAlign={'start'}>
            {JSON.stringify(sbiErrors, null, 2)}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ p: 3, pb: 3, pt: 6 }}>
          <AdPrimaryButton
            height={38}
            width={270}
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(sbiErrors, null, 2));
            }}
          >
            エラー内容をコピーする
          </AdPrimaryButton>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ p: 3, pb: 6, pt: 3 }}>
          <AdPrimaryButton height={38} width={270} onClick={handleErrorClose}>
            閉じる
          </AdPrimaryButton>
        </Stack>
      </ComModalWapper>
    );
  } else {
    return (
      <ComModalWapper open={open} onClose={onClose}>
        <Stack sx={{ py: 3 }}>
          <Typography variant="dailog_warring">{title}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ p: 3, pb: 6 }} spacing={3}>
          <AdPrimaryButton height={38} width={100} onClick={handleConfirm}>
            OK
          </AdPrimaryButton>
          <AdPrimaryButton height={38} width={100} onClick={onClose}>
            キャンセル
          </AdPrimaryButton>
        </Stack>
      </ComModalWapper>
    );
  }
};
