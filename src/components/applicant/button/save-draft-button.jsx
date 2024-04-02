import { useCallback } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { agentSendedSelector, localApplication } from '@/store';
import { Icons } from '@/assets';
import { apSaveDraft } from '@/services';
import { useBoolean, useIsSalesPerson } from '@/hooks';
import { ApModalWrapper } from '../modal-wrapper';
import { ApLighterButton } from './lighter-button';

export const ApSaveDraftButton = ({ pageInfo }) => {
  const isSalesPerson = useIsSalesPerson();
  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const agentSended = useRecoilValue(agentSendedSelector);
  const modal = useBoolean();
  const handleSave = useCallback(async () => {
    try {
      setLocalApplicationInfo((pre) => {
        return {
          ...pre,
          p_application_headers: {
            ...pre.p_application_headers,
            ...pageInfo?.p_application_headers,
          },
          p_borrowing_details__1: {
            ...pre.p_borrowing_details__1,
            ...pageInfo?.p_borrowing_details__1,
          },
          p_borrowing_details__2: {
            ...pre.p_borrowing_details__2,
            ...pageInfo?.p_borrowing_details__2,
          },
          p_application_banks: pageInfo?.p_application_banks ? pageInfo?.p_application_banks : pre.p_application_banks,
          p_applicant_persons__0: {
            ...pre.p_applicant_persons__0,
            ...pageInfo?.p_applicant_persons__0,
          },
          p_applicant_persons__1: {
            ...pre.p_applicant_persons__1,
            ...pageInfo?.p_applicant_persons__1,
          },
          p_join_guarantors: pageInfo?.p_join_guarantors ? pageInfo?.p_join_guarantors : pre.p_join_guarantors,
          p_residents: pageInfo?.p_residents ? pageInfo?.p_residents : pre.p_residents,
          p_borrowings: pageInfo?.p_borrowings ? pageInfo?.p_borrowings : pre.p_borrowings,
        };
      });
      await apSaveDraft({
        ...localApplicationInfo,

        p_application_headers: {
          ...localApplicationInfo.p_application_headers,
          ...pageInfo?.p_application_headers,
        },
        p_borrowing_details__1: {
          ...localApplicationInfo.p_borrowing_details__1,
          ...pageInfo?.p_borrowing_details__1,
        },
        p_borrowing_details__2: {
          ...localApplicationInfo.p_borrowing_details__2,
          ...pageInfo?.p_borrowing_details__2,
        },
        p_application_banks: pageInfo?.p_application_banks
          ? pageInfo?.p_application_banks
          : localApplicationInfo.p_application_banks,
        p_applicant_persons__0: {
          ...localApplicationInfo.p_applicant_persons__0,
          ...pageInfo?.p_applicant_persons__0,
        },
        p_applicant_persons__1: {
          ...localApplicationInfo.p_applicant_persons__1,
          ...pageInfo?.p_applicant_persons__1,
        },
        p_join_guarantors: pageInfo?.p_join_guarantors
          ? pageInfo?.p_join_guarantors
          : localApplicationInfo.p_join_guarantors,
        p_residents: pageInfo?.p_residents ? pageInfo?.p_residents : localApplicationInfo.p_residents,
        p_borrowings: pageInfo?.p_borrowings ? pageInfo?.p_borrowings : localApplicationInfo.p_borrowings,
      });

      modal.onTrue();
    } catch (error) {
      console.error(error);
    }
  }, [localApplicationInfo, pageInfo]);

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      sx={{
        position: 'sticky',
        height: 63,
        bottom: 0,
        zIndex: 1,
      }}
    >
      {!agentSended && !isSalesPerson && (
        <>
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
        </>
      )}
    </Stack>
  );
};
