import { SpPageTitle, SpTopList, SpTopMsg } from '@/components/sp-end';
import { SpLayout } from '@/layouts/sp-end';
import { Center, useTheme } from '@chakra-ui/react';
import { useMemo } from 'react';

export default function SpTop() {
  const theme = useTheme();

  const topMsg = useMemo(() => {
    return `前回の続きから\n入力しましょう！`;
  }, []);
  return (
    <SpLayout
      hasChat={true}
      hasHeader={true}
      hasFooter={true}
      hasHeaderMenu={true}
      pageBg={theme.background.sp.gradation}
    >
      <SpPageTitle>{'住宅ローン仮審査'}</SpPageTitle>
      <SpTopMsg>{topMsg}</SpTopMsg>
      <SpTopList />
    </SpLayout>
  );
}
