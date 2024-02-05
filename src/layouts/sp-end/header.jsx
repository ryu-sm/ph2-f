import { Box, IconButton, Stack } from '@chakra-ui/react';

import { SpHeaderLogo, SpHeaderMenuIcon } from '@/assets/svgs';

export default function Header({ hasMenu, menu }) {
  return (
    <Box
      pos={'fixed'}
      top={'0px'}
      h={'40px'}
      w={'inherit'}
      maxW={'inherit'}
      pl={'16px'}
      pr={'8px'}
      bg={'white'}
      zIndex={888}
    >
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} h={'40px'}>
        <SpHeaderLogo />
        {hasMenu && (
          <IconButton h={'40px'} w={'40px'} bg={'transparent'} _hover={{ bg: 'transparent' }} onClick={menu.onToggle}>
            <SpHeaderMenuIcon />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}
