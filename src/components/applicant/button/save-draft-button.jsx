import { useCallback } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { agentSendedSelector, applicationAtom } from '@/store';
import { Icons } from '@/assets';
import { apSaveDraft } from '@/services';
import { useBoolean } from '@/hooks';
import { ApModalWrapper } from '../modal-wrapper';
import { ApLighterButton } from './lighter-button';

export const ApSaveDraftButton = ({ pageInfo }) => {
  const application = useRecoilValue(applicationAtom);
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);
  const modal = useBoolean();
  const handleSave = useCallback(async () => {
    try {
      setApplicationInfo((pre) => {
        return {
          ...pre,
          p_uploaded_files: {
            ...pre.p_uploaded_files,
            ...pageInfo?.p_uploaded_files,
          },
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
        ...application,
        p_uploaded_files: {
          ...application.p_uploaded_files,
          ...pageInfo?.p_uploaded_files,
        },
        p_application_headers: {
          ...application.p_application_headers,
          ...pageInfo?.p_application_headers,
        },
        p_borrowing_details__1: {
          ...application.p_borrowing_details__1,
          ...pageInfo?.p_borrowing_details__1,
        },
        p_borrowing_details__2: {
          ...application.p_borrowing_details__2,
          ...pageInfo?.p_borrowing_details__2,
        },
        p_application_banks: pageInfo?.p_application_banks
          ? pageInfo?.p_application_banks
          : application.p_application_banks,
        p_applicant_persons__0: {
          ...application.p_applicant_persons__0,
          ...pageInfo?.p_applicant_persons__0,
        },
        p_applicant_persons__1: {
          ...application.p_applicant_persons__1,
          ...pageInfo?.p_applicant_persons__1,
        },
        p_join_guarantors: pageInfo?.p_join_guarantors ? pageInfo?.p_join_guarantors : application.p_join_guarantors,
        p_residents: pageInfo?.p_residents ? pageInfo?.p_residents : application.p_residents,
        p_borrowings: pageInfo?.p_borrowings ? pageInfo?.p_borrowings : application.p_borrowings,
      });

      modal.onTrue();
    } catch (error) {
      console.error(error);
    }
  }, [application, pageInfo]);

  return (
    <>
      {!agentSended && (
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
      )}
    </>
  );
};
