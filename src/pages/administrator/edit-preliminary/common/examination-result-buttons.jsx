import { Icons } from '@/assets';
import { useIsManager } from '@/hooks';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { editMainTabStatusAtom } from '@/store';
import { Button, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

export const ExaminationResultButtons = () => {
  const {
    managerRole,
    preliminaryInfo: { p_result },
    preliminarySnap: { p_application_headers },
    handleChangeProvisionalResult,
    handleChangeApproverConfirmation,
    handleChangePreExaminationStatus,
  } = usePreliminaryContext();

  const isManager = useIsManager();
  const mainTabStatus = useRecoilValue(editMainTabStatusAtom);

  const provisionalResultItems = useMemo(() => {
    const basic = [
      {
        label: '承認',
        value: '0',
        status: 'disabled',
        onClick: async () => await handleChangeProvisionalResult(p_result?.s_bank_id, 0),
      },
      {
        label: '条件付承認',
        value: '1',
        status: 'disabled',
        onClick: async () => await handleChangeProvisionalResult(p_result?.s_bank_id, 1),
      },
      {
        label: '否決',
        value: '2',
        status: 'disabled',
        onClick: async () => await handleChangeProvisionalResult(p_result?.s_bank_id, 2),
      },
    ];
    return basic.map((item) => {
      if (
        p_result.pre_examination_status === '4' &&
        !p_result.provisional_result &&
        p_application_headers?.R?.length > 0
      ) {
        return { ...item, status: 'clickable' };
      }
      if (p_result.provisional_result === item.value) {
        return { ...item, status: 'actived' };
      }
      return item;
    });
  }, [p_result, p_application_headers]);

  const preExaminationStatusItems = useMemo(() => {
    const basic = [
      {
        label: '承認者確認',
        value: '1',
        status: 'disabled',
        onClick: async () => {
          await handleChangeApproverConfirmation(1);
        },
      },
      {
        label: '提携会社へ公開',
        value: '5',
        status: 'disabled',
        onClick: async () => {
          await handleChangePreExaminationStatus(5);
        },
      },
      {
        label: '申込人へ公開',
        value: '6',
        status: 'disabled',
        onClick: async () => {
          await handleChangePreExaminationStatus(6);
        },
      },
    ];

    return basic.map((item) => {
      // if (managerRole === 1) {
      //   return item;
      // }
      if (item.value === '1' && !!p_result.provisional_result && p_result.approver_confirmation !== '1') {
        return { ...item, status: 'clickable' };
      }
      if (item.value === '1' && p_result.approver_confirmation === '1') {
        return { ...item, status: 'actived' };
      }
      if (item.value === '5' && p_result.approver_confirmation === '1' && p_result.pre_examination_status === '4') {
        return { ...item, status: 'clickable' };
      }
      if (item.value === '5' && (p_result.pre_examination_status === '5' || p_result.pre_examination_status === '6')) {
        return { ...item, status: 'actived' };
      }
      if (item.value === '6' && p_result.pre_examination_status === '5') {
        return { ...item, status: 'clickable' };
      }
      if (item.value === '6' && p_result.pre_examination_status === '6') {
        return { ...item, status: 'actived' };
      }
      return item;
    });
  }, [p_result]);

  console.log(preExaminationStatusItems);

  const preExaminationStatusSalesPersonItems = useMemo(() => {
    const basic = [
      {
        label: '申込人へ公開前',
        value: '5',
        status: 'disabled',
      },
      {
        label: '申込人へ公開',
        value: '6',
        status: 'disabled',
      },
    ];

    return basic.map((item) => {
      if (item.value === '5' && (p_result.pre_examination_status === '5' || p_result.pre_examination_status === '6')) {
        return { ...item, status: 'actived' };
      }
      if (item.value === '6' && p_result.pre_examination_status === '6') {
        return { ...item, status: 'actived' };
      }
      return item;
    });
  }, [p_result]);

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={isManager ? 'space-between' : 'end'} sx={{ pt: 5 }}>
      {isManager && (
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant="setting_popover" fontWeight={500} color={'gray.100'}>
            銀行仮審査結果
          </Typography>

          {provisionalResultItems.map((item, index) => (
            <Stack direction="row" alignItems="center" key={index}>
              <Button
                disabled={item.status !== 'clickable'}
                onClick={item.onClick}
                sx={{
                  ml: 5,
                  bgcolor:
                    item.status === 'actived' ? 'secondary.main' : item.status === 'clickable' ? 'white' : 'gray.80',
                  px: 14,
                  py: '9px',
                  boxShadow: 'none',
                  border: (theme) =>
                    item.status !== 'clickable' ? 'none' : `1px solid ${theme?.palette?.secondary?.main}`,
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'secondary.main',
                    color: 'white',
                    '& .MuiTypography-root': {
                      color: 'white',
                    },
                  },
                  '&:disabled': {
                    color: 'white',
                    border: 'none',
                    bgcolor:
                      item.status === 'actived' ? 'secondary.main' : item.status === 'clickable' ? 'white' : 'gray.80',
                  },
                }}
              >
                <Typography
                  variant="pdf_title"
                  sx={{ color: item.status !== 'clickable' ? 'white' : 'secondary.main' }}
                >
                  {item.label}
                </Typography>
              </Button>
            </Stack>
          ))}
        </Stack>
      )}

      {isManager && (
        <Stack direction={'row'} alignItems={'center'}>
          {preExaminationStatusItems.map((item, index) => (
            <Stack direction="row" alignItems="center" key={index}>
              <Button
                disabled={managerRole === 1 || item.status !== 'clickable' || mainTabStatus === 3}
                onClick={item.onClick}
                sx={{
                  bgcolor:
                    item.status === 'actived' ? 'secondary.main' : item.status === 'clickable' ? 'white' : 'gray.80',
                  px: 14,
                  py: '9px',
                  boxShadow: 'none',
                  border: (theme) =>
                    item.status !== 'clickable' ? 'none' : `1px solid ${theme?.palette?.secondary?.main}`,
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'secondary.main',
                    color: 'white',
                    '& .MuiTypography-root': {
                      color: 'white',
                    },
                  },
                  '&:disabled': {
                    color: 'white',
                    border: (theme) =>
                      managerRole === 1 || mainTabStatus === 3
                        ? item.status !== 'clickable'
                          ? 'none'
                          : `1px solid ${theme?.palette?.secondary?.main}`
                        : 'none',
                    bgcolor:
                      item.status === 'actived' ? 'secondary.main' : item.status === 'clickable' ? 'white' : 'gray.80',
                  },
                }}
              >
                <Typography
                  variant="pdf_title"
                  sx={{ color: item.status !== 'clickable' ? 'white' : 'secondary.main' }}
                >
                  {item.label}
                </Typography>
              </Button>
              {index !== preExaminationStatusItems.length - 1 && <Icons.AdProgressArrowRight />}
            </Stack>
          ))}
        </Stack>
      )}
      {!isManager && (
        <Stack direction={'row'} alignItems={'center'}>
          {preExaminationStatusSalesPersonItems.map((item, index) => (
            <Stack direction="row" alignItems="center" key={index}>
              <Button
                disabled={true}
                sx={{
                  bgcolor: item.status === 'actived' ? 'secondary.main' : 'gray.80',
                  px: 14,
                  py: '9px',
                  boxShadow: 'none',
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'secondary.main',
                    color: 'white',
                    '& .MuiTypography-root': {
                      color: 'white',
                    },
                  },
                  '&:disabled': {
                    color: 'white',
                    border: 'none',
                    bgcolor: item.status === 'actived' ? 'secondary.main' : 'gray.80',
                  },
                }}
              >
                <Typography variant="pdf_title" sx={{ color: 'white' }}>
                  {item.label}
                </Typography>
              </Button>
              {index !== preExaminationStatusSalesPersonItems.length - 1 && <Icons.AdProgressArrowRight />}
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
};
