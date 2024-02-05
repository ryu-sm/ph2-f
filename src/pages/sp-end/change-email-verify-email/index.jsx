import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { Box, Button, Center, Flex, Text, useTheme } from '@chakra-ui/react';
import { Yup } from '@/libs';
import { REGEX } from '@/constants';
import { useSpContext } from '@/hooks';
import { userPaths } from '@/routers/users/paths';
import { SpGroup, SpLayout } from '@/layouts/sp-end';
import { spChangeEmailVerifyEmail } from '@/api/user-api';
import { SpEmailSendedIcon, SpLeftRadioIcon, SpRight } from '@/assets/svgs';
import { SpInputEmail, SpNotifyTitle, SpPageTitle } from '@/components/sp-end';

export default function SpChangeEmailVerifyEmail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, setErrMsg } = useSpContext();
  const [sended, setSended] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      new_email: '',
      new_email_confirm: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(128)
        .matches(REGEX.email, '有効なメールアドレスを入力してください。')
        .required()
        .label('登録メールアドレス'),
      new_email: Yup.string()
        .max(128)
        .matches(REGEX.email, '有効なメールアドレスを入力してください。')
        .required()
        .when('email', (email, field) =>
          email ? field.notOneOf([Yup.ref('email')], 'メールアドレスと新しいメールアドレスが一致しています。') : field
        )
        .label('登録メールアドレス'),
      new_email_confirm: Yup.string()
        .when('new_email', (new_email, field) =>
          new_email
            ? field
                .required()
                .oneOf([Yup.ref('new_email')], '新しいメールアドレスと新しいメールアドレス（確認用）が一致していません')
            : field
        )
        .label('登録メールアドレス'),
    }),
    onSubmit: async (formData) => {
      try {
        await spChangeEmailVerifyEmail(formData);
        setSended(true);
      } catch (error) {
        switch (error?.response?.status) {
          case 400:
            setErrMsg(`新しいメールアドレスは既に存在しています`);
            break;
          default:
            setErrMsg(`サーバー内部でエラーが発生しました。 再度お試し下さい。`);
        }
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue('email', user?.email);
  }, [user?.email]);
  return (
    <SpLayout hasHeader={true} hasHeaderMenu={true} hasFooter={true}>
      <FormikProvider value={formik}>
        {!sended ? (
          <>
            <SpPageTitle>メールアドレス変更</SpPageTitle>
            <SpGroup title={'現在のメールアドレス'}>
              <Box p={'16px'} bgColor={'sp.gray.100'} borderRadius={'4px'}>
                <Text variant={'sp_16_100'}>{user?.email}</Text>
              </Box>
            </SpGroup>
            <SpGroup title={'新しいメールアドレス'}>
              <SpInputEmail name="new_email" placeholder={'例：sample@sample.co.jp'} />
            </SpGroup>
            <SpGroup title={'新しいメールアドレス（確認用）'}>
              <SpInputEmail name="new_email_confirm" placeholder={'例：sample@sample.co.jp'} />
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
          </>
        ) : (
          <>
            <SpNotifyTitle icon={<SpEmailSendedIcon />} title={`新しいメールアドレスに\nメールを送信しました`} />
            <Center alignItems={'center'}>
              <Flex direction={'column'} p={'24px'} bg={'white'} borderRadius={'14px'}>
                <Text variant={'sp_14_170'} textAlign={'center'}>
                  {`メールに記載されている\n認証用URLにアクセスし\nメールアドレスの変更手続きを\n完了してください。`}
                </Text>
              </Flex>
            </Center>
          </>
        )}
      </FormikProvider>
    </SpLayout>
  );
}
