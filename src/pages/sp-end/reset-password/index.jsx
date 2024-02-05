import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { Yup } from '@/libs';
import { REGEX } from '@/constants';
import { checkTokenExp } from '@/utils';
import { spResetPassword } from '@/api/user-api';
import { userPaths } from '@/routers/users/paths';
import { SpGroup, SpLayout } from '@/layouts/sp-end';
import { useSearchParams, useSpContext } from '@/hooks';
import { SpEmailSendedIcon, SpRight, SpSmileIcon } from '@/assets/svgs';
import { Box, Button, Center, Flex, Text, useDisclosure, useTheme } from '@chakra-ui/react';
import { SpPageTitle, SpInputPwd, SpNotifyTitle, SpModalWrapper } from '@/components/sp-end';

export default function SpResetPassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setErrMsg } = useSpContext();
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
        .label('新しいパスワード'),
      password_confirm: Yup.string()
        .when('password', (password, field) =>
          password
            ? field.required().oneOf([Yup.ref('password')], 'パスワードとパスワード確認用が一致していません')
            : field
        )
        .label('新しいパスワード（確認用）'),
    }),
    onSubmit: async (formData) => {
      try {
        await spResetPassword({ ...formData, token: token });
        modal.onOpen();
      } catch (error) {
        switch (error?.response?.status) {
          default:
            setErrMsg(`サーバー内部でエラーが発生しました。 再度お試し下さい。`);
        }
      }
    },
  });

  useEffect(() => {
    if (!token) {
      navigate(userPaths.resetPasswordVerifyEmail);
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
            <SpPageTitle>パスワード再設定</SpPageTitle>
            <SpGroup title={'新しいパスワード'}>
              <SpInputPwd name="password" showPwdPower={true} />
            </SpGroup>
            <SpGroup title={'新しいパスワード（確認用）'}>
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
                変更する
              </Button>
            </Center>
            <SpModalWrapper isOpen={modal.isOpen}>
              <SpNotifyTitle icon={<SpSmileIcon />} title={`パスワード再設定完了`} variant="sp_20_130_bold" />
              <Center>
                <Text variant={'sp_16_170'} textAlign={'center'}>
                  {`パスワード再設定が完了しました。\n引き続きご利用ください。`}
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
                  onClick={() => navigate(userPaths.login)}
                >
                  ログイン
                </Button>
              </Center>
            </SpModalWrapper>
          </>
        ) : (
          <>
            <SpNotifyTitle icon={<SpEmailSendedIcon />} title={`メールの有効期限が\n切れています`} />
            <Center>
              <Flex direction={'column'} p={'24px'} bg={'white'} borderRadius={'14px'}>
                <Text variant={'sp_14_170'} textAlign={'center'}>
                  {`メール受信後、一定時間内での\n操作が確認できなかったため\nパスワードの再設定に失敗しました。`}
                </Text>
                <br />
                <Text variant={'sp_14_170'} textAlign={'center'}>
                  {`恐れ入りますが、\n再度パスワード再設定の手続きを\nお願いいたします。`}
                </Text>
              </Flex>
            </Center>
            <Center px={'24px'} pt={'24px'}>
              <Button
                variant={'sp_solid'}
                size={'lg'}
                rightIcon={
                  <Box pos={'absolute'} right={'22px'} bottom={'19px'} w={'16px'} h={'16px'}>
                    <SpRight color={theme.colors.white} />
                  </Box>
                }
                onClick={() => navigate(userPaths.resetPasswordVerifyEmail)}
              >
                パスワードの再設定はこちら
              </Button>
            </Center>
          </>
        )}
      </FormikProvider>
    </SpLayout>
  );
}
