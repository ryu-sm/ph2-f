import { FormikProvider, useFormik } from 'formik';
import { useSpContext } from '@/hooks';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SpLayout, SpStepFooter } from '@/layouts/sp-end';
import { useTheme } from '@chakra-ui/react';
import { SpPageTitle } from '@/components/sp-end';
import { userPaths } from '@/routers/users/paths';
import { parseStepId } from '@/utils';

export default function SpStep1() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useSpContext();

  const formik = useFormik({});
  const handleOnRight = useCallback(async () => {
    try {
      if (user?.agent_sended) {
        navigate(userPaths.top);
      } else {
        navigate(userPaths.top);
      }
    } catch (error) {}
  }, []);

  const handleOnLeft = useCallback(() => {
    if (user?.agent_sended) {
      navigate(userPaths.top);
    } else {
      const stepId = parseStepId(pathname);
      navigate(getPreStepUrl(stepId));
    }
  }, []);
  return (
    <SpLayout hasHeader={true} hasHeaderMenu={true} hasStepHeader={true}>
      <FormikProvider value={formik}>
        <SpPageTitle>{`仮審査申込が完了しました。\n受付番号をお控えください。`}</SpPageTitle>

        <SpStepFooter onLeft={handleOnLeft} onRight={handleOnRight} />
      </FormikProvider>
    </SpLayout>
  );
}
