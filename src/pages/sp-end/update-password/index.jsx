import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { Yup } from '@/libs';
import { REGEX } from '@/constants';
import { useSpContext } from '@/hooks';
import { spUpdatePassword } from '@/api/user-api';
import { userPaths } from '@/routers/users/paths';
import { SpGroup, SpLayout } from '@/layouts/sp-end';
import { SpLeftRadioIcon, SpRight, SpSmileIcon } from '@/assets/svgs';
import { Box, Button, Center, Text, useDisclosure, useTheme } from '@chakra-ui/react';
import { SpInputPwd, SpModalWrapper, SpNotifyTitle, SpPageTitle } from '@/components/sp-end';

export default function SpUpdatePassword() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { setErrMsg } = useSpContext();
  const modal = useDisclosure();
  const formik = useFormik({
    initialValues: {
      password: '',
      new_password: '',
      new_password_confirm: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required()
        .min(8)
        .max(20, 'パスワードは20桁以内で設定ください。')
        .matches(REGEX.password, 'パスワードは大文字、小文字、数字をそれぞれ1つ以上で設定してください。')
        .label('現在のパスワード'),
      new_password: Yup.string()
        .required()
        .min(8, '8文字以上のパスワードを入力してください。')
        .max(20, 'パスワードは20桁以内で設定ください。')
        .matches(REGEX.password, 'パスワードは大文字、小文字、数字をそれぞれ1つ以上で設定してください。')
        .label('新しいパスワード'),
      new_password_confirm: Yup.string()
        .when('new_password', (new_password, field) =>
          new_password
            ? field
                .required()
                .oneOf([Yup.ref('new_password')], '新しいパスワードと新しいパスワード（確認用）が一致していません')
            : field
        )
        .label('新しいパスワード（確認用）'),
    }),
    onSubmit: async (formData) => {
      try {
        await spUpdatePassword(formData);
        modal.onOpen();
      } catch (error) {
        switch (error?.response?.status) {
          case 412:
            setErrMsg(`現在のパスワードが正しくありません。再度ご確認ください。`);
            break;
          default:
            setErrMsg(`サーバー内部でエラーが発生しました。 再度お試し下さい。`);
        }
      }
    },
  });
  return (
    <SpLayout hasHeader={true} hasHeaderMenu={true} hasFooter={true}>
      <FormikProvider value={formik}>
        <SpPageTitle>パスワード変更</SpPageTitle>
        <SpGroup title={'現在のパスワード'}>
          <SpInputPwd name="password" />
        </SpGroup>
        <SpGroup title={'新しいパスワード'}>
          <SpInputPwd name="new_password" showPwdPower={true} />
        </SpGroup>
        <SpGroup title={'新しいパスワード（確認用）'}>
          <SpInputPwd name="new_password_confirm" />
        </SpGroup>
        <Center px={'24px'} pb={'24px'}>
          <Button
            variant={'sp_solid'}
            size={'lg'}
            rightIcon={
              <Box pos={'absolute'} right={'22px'} bottom={'19px'} w={'16px'} h={'16px'}>
                <SpRight color={theme.colors.white} />
              </Box>
            }
            isDisabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            onClick={() => formik.handleSubmit()}
          >
            確認メールを送信する
          </Button>
        </Center>
        <Center>
          <Text
            variant={'sp_16_100_link'}
            display={'flex'}
            alignItems={'center'}
            onClick={() => navigate(userPaths.account)}
          >
            <SpLeftRadioIcon /> キャンセル
          </Text>
        </Center>
        <SpModalWrapper isOpen={modal.isOpen}>
          <SpNotifyTitle icon={<SpSmileIcon />} title={`パスワード変更完了`} variant="sp_20_130_bold" />
          <Center>
            <Text variant={'sp_16_170'} textAlign={'center'}>
              {`パスワードの変更が完了しました。\n引き続きご利用ください。`}
            </Text>
          </Center>
          <Center pt={'24px'} px={'10px'}>
            <Button
              variant={'sp_solid'}
              size={'md'}
              rightIcon={
                <Box pos={'absolute'} right={'22px'} bottom={'12px'} w={'6px'} h={'16px'}>
                  <SpRight color={theme.colors.white} />
                </Box>
              }
              onClick={() => navigate(userPaths.top)}
            >
              TOPへ
            </Button>
          </Center>
        </SpModalWrapper>
      </FormikProvider>
    </SpLayout>
  );
}
