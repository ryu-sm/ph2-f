import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { Yup } from '@/libs';
import { REGEX } from '@/constants';
import { userPaths } from '@/routers/users/paths';
import { SpGroup, SpLayout } from '@/layouts/sp-end';
import { spRegisterVerifyEmail } from '@/api/user-api';
import { useSearchParams, useSpContext } from '@/hooks';
import { SpEmailSendedIcon, SpRightRadioIcon } from '@/assets/svgs';
import { Box, Button, Center, Flex, Stack, Text } from '@chakra-ui/react';
import { SpPageTitle, SpInputEmail, SpNotifyTitle, SpCheckRegister } from '@/components/sp-end';

export default function SpRegisterVerifyEmail() {
  const navigate = useNavigate();
  const { setErrMsg } = useSpContext();
  const searchParams = useSearchParams();
  const [sended, setSended] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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
        await spRegisterVerifyEmail({ ...formData, s_sales_company_org_id: searchParams.get('s_sale_company_org_id') });
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
            <SpPageTitle>新規登録</SpPageTitle>
            <SpGroup title={'メールアドレス'}>
              <SpInputEmail name="email" placeholder={'例：sample@sample.co.jp'} />
            </SpGroup>
            <Center pb={'24px'}>
              <Stack direction={'row'} spacing={'6px'} alignItems={'center'} justifyContent={'center'}>
                <SpCheckRegister checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
                <Flex alignItems={'center'}>
                  <Text
                    as={'a'}
                    variant={'sp_14_100_link'}
                    cursor={'pointer'}
                    href={userPaths.spTermOfServiceUrl}
                    target={'_blank'}
                  >
                    利用規約
                  </Text>
                  <Text variant={'sp_14_100'}>に同意する</Text>
                </Flex>
              </Stack>
            </Center>

            <Box px={'24px'} pb={'24px'}>
              <Text variant={'sp_12_150'}>
                {`※入力したメールアドレス宛に仮登録メールが届きます。\nメール受信制限をされている方は info@milibank.co.jp\nからのメール受信を許可してください。`}
              </Text>
            </Box>
            <Center px={'24px'} pb={'24px'}>
              <Button
                variant={'sp_solid'}
                size={'lg'}
                isDisabled={formik.isSubmitting || !(formik.isValid && formik.dirty) || !confirmed}
                onClick={() => formik.handleSubmit()}
              >
                登録する
              </Button>
            </Center>
            <Center>
              <Text
                variant={'sp_16_100_link'}
                display={'flex'}
                alignItems={'center'}
                onClick={() => navigate(userPaths.login)}
              >
                既にアカウントをお持ちの方 <SpRightRadioIcon />
              </Text>
            </Center>
          </>
        ) : (
          <>
            <SpNotifyTitle icon={<SpEmailSendedIcon />} title={`メールを送信しました`} />
            <Center alignItems={'center'}>
              <Flex direction={'column'} p={'24px'} bg={'white'} borderRadius={'14px'}>
                <Text variant={'sp_14_170'} textAlign={'center'}>
                  {`メールに記載されている\nURLにアクセスし\n新規登録を完了してください。`}
                </Text>
              </Flex>
            </Center>
          </>
        )}
      </FormikProvider>
    </SpLayout>
  );
}
