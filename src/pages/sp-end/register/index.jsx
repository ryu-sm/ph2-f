import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { Yup } from '@/libs';
import { REGEX } from '@/constants';
import { checkTokenExp } from '@/utils';
import { userPaths } from '@/routers/users/paths';
import { SpGroup, SpLayout } from '@/layouts/sp-end';
import { useSpContext, useSearchParams } from '@/hooks';
import { SpEmailSendedIcon, SpRight, SpSmileIcon } from '@/assets/svgs';
import { SpPageTitle, SpInputPwd, SpNotifyTitle, SpModalWrapper } from '@/components/sp-end';
import { Box, Button, Center, Stack, Text, useDisclosure, useTheme } from '@chakra-ui/react';

export default function SpRegister() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { register, setErrMsg } = useSpContext();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [validToken, setValidToken] = useState(true);
  const modal = useDisclosure();
  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirm: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required()
        .min(8)
        .max(20, 'パスワードは20桁以内で設定ください。')
        .matches(
          REGEX.password,
          'パスワードは大文字、小文字、数字をそれぞれ1つ以上使用し、半角8文字以上で設定してください。'
        )
        .label('パスワード'),
      password_confirm: Yup.string()
        .when('password', (password, field) =>
          password
            ? field.required().oneOf([Yup.ref('password')], 'パスワードとパスワード確認用が一致していません')
            : field
        )
        .label('パスワード（確認用）'),
    }),
    onSubmit: async (formData) => {
      try {
        await register({ ...formData, token: token });
        modal.onOpen();
      } catch (error) {
        switch (error?.response?.status) {
          case 401:
            setValidToken(false);
          default:
            setErrMsg(`サーバー内部でエラーが発生しました。 再度お試し下さい。`);
        }
      }
    },
  });

  useEffect(() => {
    if (!token) {
      navigate(userPaths.registerVerifyEmail);
    }
    if (!!token && !checkTokenExp(token)) {
      setValidToken(false);
    }
  }, [validToken]);
  return (
    <SpLayout hasHeader={true} hasFooter={true}>
      <FormikProvider value={formik}>
        {validToken ? (
          <>
            <SpPageTitle>パスワード登録</SpPageTitle>
            <SpGroup title={'パスワード'}>
              <SpInputPwd name="password" showPwdPower={true} />
            </SpGroup>
            <SpGroup title={'パスワード（確認用）'}>
              <SpInputPwd name="password_confirm" />
            </SpGroup>
            <Center px={'24px'}>
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
                登録する
              </Button>
            </Center>
            <SpModalWrapper isOpen={modal.isOpen}>
              <SpNotifyTitle icon={<SpSmileIcon />} title={`新規登録完了`} variant="sp_20_130_bold" />
              <Center>
                <Text variant={'sp_16_170'} textAlign={'center'}>
                  {`新規登録が完了しました。\n早速サービスをご利用ください。`}
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
                  onClick={() => navigate(userPaths.spStep0)}
                >
                  次へ
                </Button>
              </Center>
            </SpModalWrapper>
          </>
        ) : (
          <>
            <SpNotifyTitle icon={<SpEmailSendedIcon />} title={`メールの有効期限が\n切れています`} />
            <Stack alignItems={'center'}>
              <Box w={'286px'} h={'216px'} p={'24px'} bg={'white'}>
                <Text variant={'sp_14_170'} textAlign={'center'}>
                  {`メール受信後、一定時間内での\n操作が確認できなかったため\n新規登録が完了しておりません。`}
                </Text>
                <br />
                <Text variant={'sp_14_170'} textAlign={'center'}>
                  {`恐れ入りますが、\n再度、新規登録の手続きを\nお願いいたします。`}
                </Text>
              </Box>
            </Stack>
            <Box px={'24px'} pt={'24px'}>
              <Button
                variant={'sp_solid'}
                size={'lg'}
                rightIcon={
                  <Box pos={'absolute'} right={'22px'} bottom={'19px'} w={'16px'} h={'16px'}>
                    <SpRight color={theme.colors.white} />
                  </Box>
                }
                onClick={() => navigate(userPaths.registerVerifyEmail)}
              >
                新規登録はこちら
              </Button>
            </Box>
          </>
        )}
      </FormikProvider>
    </SpLayout>
  );
}
