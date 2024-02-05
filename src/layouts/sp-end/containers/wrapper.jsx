import { Box, Container, useTheme } from '@chakra-ui/react';

export default function SpWrapper({ children, bgImage }) {
  const theme = useTheme();
  return (
    <Box bg={theme.background.sp.wrapper}>
      <Container
        px={'0px'}
        maxW={'480px'}
        minH={'100dvh'}
        bgSize={'cover'}
        bgPosition={'center'}
        bgImage={bgImage}
        bg={theme.background.white}
      >
        {children}
      </Container>
    </Box>
  );
}
