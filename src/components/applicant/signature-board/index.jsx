import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import { ApLighterButton, ApPrimaryButton, ApSecondaryButton } from '../button';
import { useField } from 'formik';
import { Icons } from '@/assets';
import { useBoolean } from '@/hooks';
import { YUP_MESSAGES } from '@/constant';

export const ApSignatureBoard = ({ showError, onChange, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setTouched } = helpers;
  const sigCanvas = useRef(null);
  const isEmpty = useBoolean(true);

  const handleReset = useCallback(async () => {
    sigCanvas.current.clear();
    await setTouched(false);
    isEmpty.onTrue();
  }, []);

  const handleSave = useCallback(async () => {
    await setValue([
      {
        src: sigCanvas.current.toDataURL('image/png'),
        name: crypto.randomUUID(),
      },
    ]);
    await setTouched(true);
    sigCanvas.current?.clear();
    isEmpty.onFalse();
  });

  return (
    <Stack name={field.name} sx={{ width: 1 }}>
      {showError && (
        <Typography variant="note" sx={{ fontWeight: 500, color: (theme) => theme.palette.secondary.main }}>
          ※{YUP_MESSAGES.REQUIRED}
        </Typography>
      )}
      {meta.value?.length > 0 ? (
        <Stack spacing={6} alignItems={'center'} justifyContent={'center'} sx={{ p: 4 }}>
          {meta.value.map((file) => (
            <Box key={file.name} component={'img'} src={file.src} sx={{ width: 1, maxHeight: 280 }} />
          ))}
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={async () => {
              await setValue([]);
              isEmpty.onTrue();
            }}
          >
            <Stack spacing={'6px'} direction={'row'} alignItems={'center'}>
              <Icons.ApEditorIcon />
              <Typography variant="radio_checkbox_button">サインを修正する</Typography>
            </Stack>
          </ApLighterButton>
        </Stack>
      ) : (
        <Stack>
          <Stack
            sx={{
              p: 4,
              width: 1,
              height: 280,
              border: (theme) =>
                showError ? `1px solid ${theme.palette.secondary.main}` : `1px solid ${theme.palette.primary[20]}`,
              boxShadow: '0px 4px 6px 0px rgba(44, 54, 156, 0.10) inset',
            }}
          >
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                style: { width: '100%', height: '100%' },
              }}
              onEnd={() => {
                onChange && onChange();
                isEmpty.onFalse();
              }}
            />
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ width: 1, py: 6 }}>
            <ApSecondaryButton height={40} width={160} onClick={handleReset} disabled={isEmpty.value}>
              リセット
            </ApSecondaryButton>
            <ApPrimaryButton height={40} width={160} onClick={handleSave} disabled={isEmpty.value}>
              確認・保存
            </ApPrimaryButton>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
