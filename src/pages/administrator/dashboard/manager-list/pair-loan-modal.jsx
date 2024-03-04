import { Icons } from '@/assets';
import { adGetPairLoanOptions, adSetPairLoan, adUnPairLoan } from '@/services';
import { preliminarieListAtom, showProgressAtom, tabStatusAtom } from '@/store';
import { Box, Button, Divider, MenuItem, Modal, Select, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const SetPairLoanModal = ({ isOpen, onClose, id, pair_loan_id, apply_no, isPairLoan }) => {
  const tabStatus = useRecoilValue(tabStatusAtom);
  const setShowProgress = useSetRecoilState(showProgressAtom);
  const setPreliminariesData = useSetRecoilState(preliminarieListAtom);
  const [pairLoanOptions, setPairLoanOptions] = useState([{ value: pair_loan_id, label: apply_no }]);
  const queryPairLoanOptions = useCallback(async () => {
    try {
      const res = await adGetPairLoanOptions(id);
      setPairLoanOptions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [isPairLoan, id]);

  useEffect(() => {
    if (!isPairLoan) {
      queryPairLoanOptions();
    }
  }, [isPairLoan]);

  const queryPreliminaries = async () => {
    try {
      setShowProgress(true);
      const res = await adManagerPreliminaries(tabStatus);
      setPreliminariesData(res.data);
      setShowProgress(false);
    } catch (error) {
      setShowProgress(false);
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: id,
      pair_loan_id: pair_loan_id,
    },
    onSubmit: async (values) => {
      try {
        if (isPairLoan) {
          await adUnPairLoan(values);
          toast.success('ペアローンの紐付きを解除しました。');
          await queryPreliminaries();
          onClose();
        } else {
          await adSetPairLoan(values);
          toast.success('ペアローンの紐付きをしました。');
          await queryPreliminaries();
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const renderIconComponent = useCallback(
    () => (
      <Icons.AdArrowDown
        sx={{
          width: 16,
          height: 16,
          position: 'absolute',
          right: 12,
          top: 'calc(50% - 8px)',
          pointerEvents: 'none',
        }}
      />
    ),
    []
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      disableAutoFocus
    >
      <Stack
        sx={{
          width: 485,
          bgcolor: 'white',
          minWidth: 'auto',
          maxHeight: '75vh',
          borderRadius: 2,
        }}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ px: 3 }}>
          <Box width={13} />
          <Stack sx={{ width: '100%', py: 3 }}>
            <Typography variant="main_page_title" color="gray.100" sx={{ textAlign: 'center' }}>
              {isPairLoan ? 'ペアローン解除' : 'ペアローン紐付'}
            </Typography>
          </Stack>
          <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} onClick={onClose} />
        </Stack>
        <Divider />
        <Stack spacing={10} sx={{ pt: 10, pb: 8 }}>
          <Stack justifyContent={'center'} alignItems={'center'} direction={'row'} spacing={10}>
            <Typography>紐付受付番号</Typography>
            <Select
              IconComponent={renderIconComponent}
              value={formik.values?.pair_loan_id}
              onChange={(e) => formik.setFieldValue('pair_loan_id', e.target.value)}
              sx={{
                height: 30,
                minWidth: 190,
                bgcolor: 'unset',
                textAlign: 'left',
                minHeight: 36,
                marginLeft: 0,
                '& .MuiTypography-placeHolder_style': {
                  color: 'black',
                  fontSize: 16,
                },
                '&&&.Mui-success fieldset': {
                  borderWidth: '2px solid',
                  borderRight: 'none',
                  borderLeft: 'none',
                  borderTop: 'none',
                  borderColor: 'gray.100',
                  borderRadius: 0,
                },
                '&&&& fieldset': {
                  borderWidth: 1,
                  borderRight: 'none',
                  borderLeft: 'none',
                  borderTop: 'none',
                  borderColor: 'gray.100',
                  borderRadius: 0,
                },
                '&&&&& .MuiTypography-input_style': {
                  fontSize: '15px',
                  lineHeight: '15px',
                  fontWeight: '300',
                },
              }}
            >
              {pairLoanOptions.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  <Typography variant="input_style" color="normal">
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Stack alignItems={'center'}>
            <Button
              disabled={!isPairLoan && !formik.values.pair_loan_id}
              sx={{
                bgcolor: 'white',
                boxShadow: 'none',
                width: '270px',
                height: '36px',
                marginBottom: 5,
                borderRadius: '2px',
                minHeight: '36px',
                border: '1px solid',
                borderColor: (theme) => theme.palette.primary.main,
                '&:hover': {
                  bgcolor: 'white',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.primary.main,
                  opacity: 0.8,
                },
              }}
              onClick={formik.handleSubmit}
            >
              <Typography variant="login_button" color="primary.main">
                {isPairLoan ? 'ペアローン解除' : 'ペアローン紐付'}
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};
