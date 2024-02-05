import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Center, Text, useTheme } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { checkTokenExp } from '@/utils';
import { useSearchParams } from '@/hooks';
import { SpLayout } from '@/layouts/sp-end';
import { spChangeEmail } from '@/api/user-api';
import { userPaths } from '@/routers/users/paths';
import { SpNotifyTitle } from '@/components/sp-end';
import { SpRight, SpSmileIcon } from '@/assets/svgs';

export default function SpChangeEmail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [validToken, setValidToken] = useState(true);

  const comfirmChangeEmail = useCallback(async () => {
    try {
      await spChangeEmail({ token });
    } catch (error) {
      setValidToken(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setValidToken(false);
    }
    if (!!token && !checkTokenExp(token)) {
      setValidToken(false);
    } else {
      comfirmChangeEmail();
    }
  }, [validToken]);
  return (
    <SpLayout hasHeader={true} hasHeaderMenu={true} hasFooter={true}>
      {validToken && (
        <>
          <SpNotifyTitle icon={<SpSmileIcon />} title={`メールアドレス変更完了`} variant="sp_20_130_bold" />
          <Center pb={'24px'}>
            <Text variant={'sp_14_170'} textAlign={'center'}>
              {`メールアドレスの変更が完了しました。\n引き続きサービスをご利用ください。`}
            </Text>
          </Center>

          <Center px={'24px'}>
            <Button
              variant={'sp_solid'}
              size={'lg'}
              rightIcon={
                <Box position={'absolute'} right={'22px'} bottom={'19px'} w={'16px'} h={'16px'}>
                  <SpRight color={theme.colors.white} />
                </Box>
              }
              onClick={() => navigate(userPaths.top)}
            >
              TOPへ
            </Button>
          </Center>
        </>
      )}
    </SpLayout>
  );
}
