import { useCallback } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { applicationAtom } from '@/store';
import { Icons } from '@/assets';
import { apSaveDraft } from '@/services';
import { useBoolean } from '@/hooks';
import { ApModalWrapper } from '../modal-wrapper';
import { ApLighterButton } from './lighter-button';

export const ApSaveDraftButton = ({ pageInfo }) => {
  const application = useRecoilValue(applicationAtom);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const modal = useBoolean();
  const handleSave = useCallback(async () => {
    try {
      setApplicationInfo((pre) => {
        return {
          ...pre,
          ...pageInfo,
        };
      });
      await apSaveDraft({ ...application, ...pageInfo });

      modal.onTrue();
    } catch (error) {
      console.error(error);
    }
  }, [application, pageInfo]);

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Button
        sx={{
          width: 78,
          height: 63,
          px: 2,
          py: 4,
          borderRadius: '20px 0 0 0',
          borderTop: '6px solid #FEFEFE',
          borderLeft: '6px solid #FEFEFE',
          background: 'linear-gradient(180deg, #F27C9B 0%, #E54E75 100%)',
          flexDirection: 'column',
        }}
        onClick={handleSave}
      >
        <Icons.ApSaveIcon />
        <Typography color="white" variant="radio_checkbox_button">
          保存
        </Typography>
      </Button>
      <ApModalWrapper open={modal.value} icon={<Icons.ApSaveMainIcon />} label={`ここまでの情報を\n保存しました！`}>
        <ApLighterButton
          width={160}
          height={40}
          endIcon={<Icons.ApForwardRightMainIcon />}
          onClick={() => modal.onFalse()}
        >
          とじる
        </ApLighterButton>
      </ApModalWrapper>
    </Stack>
  );
};
