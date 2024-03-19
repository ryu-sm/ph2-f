import { AdTextInput } from '@/components/admin/text-input';
import { yup } from '@/libs';
import { useTheme } from '@emotion/react';
import { Button, Modal, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
export const MessageLinkModal = ({ open, onClose, setMessageValue }) => {
  const theme = useTheme();
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
  });

  const handleInsertLink = () => {
    setMessageValue((prev) => {
      return `${prev}[${formik.values.display}](${formik.values.url})`;
    });
    formik.resetForm();
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiBackdrop-root': {
          backgroundColor: alpha(theme.palette.primary[60], 0.7),
        },
      }}
    >
      <FormikProvider value={formik}>
        <Stack
          sx={{
            width: 495,
            height: 420,
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
            <AdTextInput placeholder="入力してください" name="display" />
          </Stack>
          <Stack spacing={2}>
            <Typography variant="modal_form_item" color="#333">
              リンク先に指定するURL
            </Typography>
            <AdTextInput placeholder="http://xxxxxx.co.jp/sample" type="url" name="url" />
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
              onClick={handleInsertLink}
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

MessageLinkModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setMessageValue: PropTypes.func,
};
