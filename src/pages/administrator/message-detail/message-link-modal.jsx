import { AdLinkInsertInput } from '@/components/administrator';
import { yup } from '@/libs';
import { Button, Modal, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useEffect } from 'react';

export const MessageLinkModal = ({ open, onClose, onConfirm }) => {
  const validationSchema = yup.object().shape({
    display: yup.string().trim().required('この項目を入力してください。'),
    url: yup
      .string()
      .trim()
      .matches(
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
        '正しくご入力ください。'
      )
      .required('この項目を入力してください。'),
  });
  const formik = useFormik({
    initialValues: {
      display: '',
      url: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      onConfirm(`[${values.display}](${values.url})`);
      formik.resetForm();
      onClose();
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      disableAutoFocus
    >
      <FormikProvider value={formik}>
        <Stack
          sx={{
            width: 495,
            // height: 420,
            p: 8,
            borderRadius: 2,
            backgroundColor: 'white',
            '&:focus': {
              outline: 'none',
            },
          }}
          spacing={6}
        >
          <Typography variant="delete_modal_title">リンクを挿入</Typography>
          <Stack spacing={2}>
            <Typography variant="modal_form_item" color="#333">
              表示するテキスト
            </Typography>
            <AdLinkInsertInput placeholder="入力してください" name="display" />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="modal_form_item" color="#333">
              リンク先に指定するURL
            </Typography>
            <AdLinkInsertInput placeholder="http://xxxxxx.co.jp/sample" type="url" name="url" />
          </Stack>

          <Stack alignItems={'center'} spacing={6}>
            <Button
              sx={{
                width: 148,
                height: 40,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { opacity: 0.8, bgcolor: 'primary.main' },
              }}
              onClick={formik.handleSubmit}
            >
              <Typography variant="message_delete_button">OK</Typography>
            </Button>

            <Button
              sx={{
                width: 148,
                height: 40,
                bgcolor: 'white',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                color: 'primary.main',
                '&:hover': { opacity: 0.8, bgcolor: 'white' },
              }}
              onClick={onClose}
            >
              <Typography variant="message_delete_button">キャンセル</Typography>
            </Button>
          </Stack>
        </Stack>
      </FormikProvider>
    </Modal>
  );
};
