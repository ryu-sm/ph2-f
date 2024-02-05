import { Center, Stack, Text } from '@chakra-ui/react';

export default function SpNotifyTitle({ title, icon, variant = 'sp_24_130_bold' }) {
  return (
    <Center py={'24px'}>
      <Stack spacing={'8px'} alignItems={'center'}>
        {icon}
        <Text variant={variant}>{title}</Text>
      </Stack>
    </Center>
  );
}
