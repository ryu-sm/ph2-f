import { useNavigate } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import { Yup } from '@/libs';
import { REGEX } from '@/constants';
import { useSpContext } from '@/hooks';
import { userPaths } from '@/routers/users/paths';
import { SpGroup, SpLayout } from '@/layouts/sp-end';
import { SpRight, SpRightRadioIcon, SpSmileIcon } from '@/assets/svgs';
import { Box, Button, Center, Text, useDisclosure, useTheme } from '@chakra-ui/react';
import { SpPageTitle, SpInputEmail, SpInputPwd, SpModalWrapper, SpNotifyTitle } from '@/components/sp-end';
import { parseTokenPayload } from '@/utils';
import { spLogin } from '@/api/user-api';

export default function SpLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { updateSpLocalState, setErrMsg } = useSpContext();
  const modal = useDisclosure();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(REGEX.email, '有効なメールアドレスを入力してください。')
        .required()
        .label('登録メールアドレス'),
      password: Yup.string()
        .required()
        .min(8, '有効なパスワードを入力してください。')
        .max(20, '有効なパスワードを入力してください。')
        .matches(REGEX.password, '有効なパスワードを入力してください。')
        .label('パスワード'),
    }),
    onSubmit: async (formData) => {
      try {
        const res = await spLogin(formData);
        const token = res.data?.access_token;
        sessionStorage.setItem('accessToken', token);
        const tokenPayload = parseTokenPayload(token);

        if (!tokenPayload?.agent_sended) {
          // 为向银代送信
          if (!tokenPayload?.draft_data) {
            // 为保存临时数据
            updateSpLocalState({
              user: {
                email: tokenPayload?.email,
                agent_sended: tokenPayload?.agent_sended,
                first_login: tokenPayload?.first_login,
                draft_data: tokenPayload?.draft_data,
              },
            });
            navigate(userPaths.spStep0);
          } else {
            updateSpLocalState({
              ...JSON.parse(tokenPayload?.draft_data),
              user: {
                email: tokenPayload?.email,
                agent_sended: tokenPayload?.agent_sended,
                first_login: tokenPayload?.first_login,
                draft_data: tokenPayload?.draft_data,
              },
            });
            modal.onOpen();
          }
        } else {
          // TODO: 同步DB数据后跳转
          navigate(userPaths.top);
        }
      } catch (error) {
        switch (error?.response?.status) {
          case 400:
            setErrMsg(`メールアドレスまたはパスワードが正しくありません。`);
            break;
          case 423:
            setErrMsg(
              `ログイン失敗でアカウントがロックされました。\nアカウントロックの解除は、ログイン画面の「パスワードを忘れた方はこちらから設定をお願いします」からお進みください。`
            );
            break;
          default:
            setErrMsg(`サーバー内部でエラーが発生しました。 再度お試し下さい。`);
        }
      }
    },
  });

  return (
    <SpLayout hasHeader={true} hasFooter={true}>
      <FormikProvider value={formik}>
        <SpPageTitle>ログイン</SpPageTitle>
        <SpGroup title={'メールアドレス'}>
          <SpInputEmail name="email" placeholder={'例：sample@sample.co.jp'} />
        </SpGroup>
        <SpGroup title={'パスワード'}>
          <SpInputPwd name="password" />
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
            ログイン
          </Button>
        </Center>
        <Center pb={'24px'}>
          <Text
            variant={'sp_16_100_link'}
            display={'flex'}
            alignItems={'center'}
            onClick={() => navigate(userPaths.resetPasswordVerifyEmail)}
          >
            パスワードをお忘れの方 <SpRightRadioIcon />
          </Text>
        </Center>
        <Center px={'24px'}>
          <Button variant={'sp_outline'} size={'lg'} onClick={() => navigate(userPaths.registerVerifyEmail)}>
            初めての方は会員登録
          </Button>
        </Center>
        <SpModalWrapper isOpen={modal.isOpen}>
          <SpNotifyTitle icon={<SpSmileIcon />} title={`おかえりなさい`} variant="sp_20_130_bold" />
          <Center px={'10px'}>
            <Button
              variant={'sp_solid'}
              size={'md'}
              rightIcon={
                <Box pos={'absolute'} right={'22px'} bottom={'12px'} w={'6px'} h={'16px'}>
                  <SpRight color={theme.colors.white} />
                </Box>
              }
              onClick={() => navigate(`/step-${curr_completed_step_id}`)}
            >
              前回の続きから入力する
            </Button>
          </Center>
          <Center pt={'24px'} px={'10px'}>
            <Button
              variant={'sp_outline'}
              size={'md'}
              rightIcon={
                <Box pos={'absolute'} right={'22px'} bottom={'12px'} w={'6px'} h={'16px'}>
                  <SpRight color={theme.colors.sp.primary[100]} />
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
