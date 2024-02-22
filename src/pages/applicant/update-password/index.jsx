import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { ApItemGroup, ApModalWrapper, ApPageTitle, ApPrimaryButton, ApPwdInputField } from '@/components';
import { ApLayout } from '@/containers';
import { validationSchema } from './validatior';
import { Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';
import { routeNames } from '@/router/settings';
import { useBoolean } from '@/hooks';
import { apUpdatePassword } from '@/services';

export const ApUpdatePasswordPage = () => {
  const navigate = useNavigate();

  const modal = useBoolean(false);
  const [warningText, setWarningText] = useState('');
  const formik = useFormik({
    initialValues: {
      password: '',
      new_password: '',
      new_password_confirm: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await apUpdatePassword({ password: values.password, new_password: values.new_password });
        modal.onTrue();
      } catch (error) {
        switch (error?.status) {
          case 412:
            setWarningText('現在のパスワードが正しくありません。再度ご確認ください。');
            break;
          default:
            setWarningText('サーバーとの通信に失敗しました。再度お試しください。');
        }
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <ApLayout hasFooter hasMenu>
        <ApPageTitle error={warningText}>{`パスワード変更`}</ApPageTitle>
        <ApItemGroup label={'現在のパスワード'}>
          <ApPwdInputField name={'password'} onFocus={() => setWarningText('')} />
        </ApItemGroup>
        <ApItemGroup label={'新しいパスワード'}>
          <ApPwdInputField name={'new_password'} onFocus={() => setWarningText('')} showPwdPower />
        </ApItemGroup>
        <ApItemGroup label={'新しいパスワード（確認用）'}>
          <ApPwdInputField name={'new_password_confirm'} onFocus={() => setWarningText('')} />
        </ApItemGroup>
        <Stack spacing={6} alignItems={'center'}>
          <ApPrimaryButton
            endIcon={<Icons.ApForwardRightWhiteIcon />}
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
          >
            変更する
          </ApPrimaryButton>
          <Stack
            spacing={2}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(routeNames.apAccountInformationPage.path)}
          >
            <Icons.ApForwardLeftRadioOutlineIcon />
            <Typography variant="radio_checkbox_button" sx={{ color: (theme) => theme.palette.primary.main }}>
              キャンセル
            </Typography>
          </Stack>
        </Stack>
        <ApModalWrapper open={modal.value} icon={<Icons.ApSmileIcon />} label={`パスワード変更完了`}>
          <Typography variant="modal_label">{`パスワードの変更が完了しました。\n引き続きご利用ください。`}</Typography>
          <ApPrimaryButton
            endIcon={<Icons.ApForwardRightWhiteIcon />}
            width={260}
            height={40}
            onClick={() => navigate(routeNames.apTopPage.path)}
          >
            TOPへ
          </ApPrimaryButton>
        </ApModalWrapper>
      </ApLayout>
    </FormikProvider>
  );
};
