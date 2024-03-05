import { Icons } from '@/assets';
import { Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';

export const AdFilterModal = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      s_bank_id: '',
      name_kanji: '',
      created_at: '',
      desired_borrowing_date: '',
      desired_loan_amount: '',
      sales_area_id: '',
      sales_exhibition_hall_id: '',
      s_sales_person_id: '',
    },
  });
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      disableAutoFocus
    >
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          height: '85dvh',
          width: 485,
          maxHeight: '85dvh',
        }}
      >
        <Stack
          direction="row"
          sx={{
            height: 54,
            borderBottom: (theme) => `1px solid ${theme?.palette?.line}`,
          }}
        >
          <Stack
            flex={1}
            sx={{
              justifyContent: 'center',
              pl: 3,
              color: 'clear_button_blue',
            }}
          >
            <Typography
              // onClick={handleClear}
              variant="login_footer"
              fontSize={12}
              sx={{ color: 'primary.main', cursor: 'pointer' }}
            >
              すべてクリア
            </Typography>
          </Stack>
          <Stack flex={2} justifyContent="center">
            <Typography variant="main_page_title" fontSize={16} sx={{ alignSelf: 'center', color: 'gray.100' }}>
              {1 ? '仮審査中の案件の絞り込み' : '過去の案件の絞り込み'}
            </Typography>
          </Stack>
          <Stack flex={1} justifyContent="center">
            <Stack
              sx={{
                position: 'absolute',
                right: 10,
              }}
            >
              <IconButton sx={{ p: 0 }}>
                <Icons.AdCloseIcon sx={{ width: 13, height: 12, cursor: 'pointer' }} />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>

        <Stack alignItems={'center'} sx={{ py: 6 }}>
          <Button
            sx={{
              bgcolor: 'white',
              boxShadow: 'none',
              width: '200px',
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
            // onClick={formik.handleSubmit}
          >
            <Typography variant="login_button" color="primary.main">
              検索
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
