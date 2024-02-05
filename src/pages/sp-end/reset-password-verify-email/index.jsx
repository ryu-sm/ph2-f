import { useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Yup } from '@/libs';
import { REGEX } from '@/constants';
import { useSpContext } from '@/hooks';
import { SpGroup, SpLayout } from '@/layouts/sp-end';
import { SpEmailSendedIcon, SpRight } from '@/assets/svgs';
import { spResetPasswordVerifyEmail } from '@/api/user-api';
import { Box, Button, Center, Flex, Text, useTheme } from '@chakra-ui/react';
import { SpPageTitle, SpNotifyTitle, SpInputEmail } from '@/components/sp-end';

export default function SpResetPasswordVerifyEmail() {
  const theme = useTheme();
  const { setErrMsg } = useSpContext();
  const [sended, setSended] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(REGEX.email, '有効なメールアドレスを入力してください。')
        .required()
        .label('登録メールアドレス'),
    }),
    onSubmit: async (formData) => {
      try {
        await spResetPasswordVerifyEmail(formData);
        localStorage.removeItem('spLocalState');
        sessionStorage.removeItem('accessToken');
        setSended(true);
      } catch (error) {
        switch (error?.response?.status) {
          default:
            setErrMsg(`サーバー内部でエラーが発生しました。 再度お試し下さい。`);
        }
      }
    },
  });
  return (
    <SpLayout hasHeader={true} hasFooter={true}>
      <FormikProvider value={formik}>
        {!sended ? (
          <>
            <SpPageTitle>パスワード再設定</SpPageTitle>
            <Center px={'8px'} pb={'24px'}>
              <Text variant={'sp_14_170'}>
                {`ご登録のメールアドレスを入力してください。\nパスワード再設定用のメールをお送りします。`}
              </Text>
            </Center>
            <SpGroup title={'メールアドレス'}>
              <SpInputEmail name="email" placeholder={'例：sample@sample.co.jp'} />
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
                再設定メールを送信
              </Button>
            </Center>
          </>
        ) : (
          <>
            <SpNotifyTitle icon={<SpEmailSendedIcon />} title={`メールを送信しました`} />
            <Center>
              <Flex direction={'column'} p={'24px'} bg={'white'} borderRadius={'14px'}>
                <Text variant={'sp_14_170'} textAlign={'center'}>
                  {`メールに記載されている\nURLにアクセスし\nパスワード再設定を完了してください。`}
                </Text>
                <br />
                <Text variant={'sp_14_170'} textAlign={'center'}>
                  {`＊未登録の方には再設定用のメールは\n送信されません。`}
                </Text>
              </Flex>
            </Center>
          </>
        )}
      </FormikProvider>
    </SpLayout>
  );
}
