import { Box, useTheme } from '@chakra-ui/react';
import Footer from '../footer';
import { useEffect, useState } from 'react';
import SpStepHeader from '../step-header';
import TopChat from '../top-chat';

export default function SpPaper({
  pageBg,
  isMenu,
  hasChat,
  children,
  hasFooter,
  menuIsOpen,
  hasStepHeader,
  hasFooterContact,
}) {
  const theme = useTheme();
  const [footerHeight, setFooterHeight] = useState(117);
  useEffect(() => {
    if (hasFooterContact) {
      setFooterHeight(footerHeight + 74);
    }
    if (hasChat) {
      setFooterHeight(footerHeight + 65);
    }
  }, [hasFooterContact, hasChat]);

  return (
    <Box
      w={'100%'}
      minH={'100dvh'}
      bg={pageBg || theme.colors.sp.gray[50]}
      pt={isMenu ? `0px` : `40px`}
      sx={{ ...(menuIsOpen && { maxH: '100dvh', overflow: 'hidden' }) }}
    >
      {hasStepHeader && <SpStepHeader />}
      <Box
        w={'100%'}
        minH={isMenu ? `calc(100dvh - ${footerHeight}px)` : `calc(100dvh - ${footerHeight + 40}px)`}
        pt={hasStepHeader ? '64px' : '0px'}
      >
        {children}
      </Box>
      {hasFooter && <Footer footerHeight={footerHeight} hasFooterContact={hasFooterContact} />}
      {hasChat && <TopChat />}
    </Box>
  );
}
