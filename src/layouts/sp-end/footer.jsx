import { Box, Stack, Text } from '@chakra-ui/react';
import { SpFooterLogo } from '@/assets/svgs';

export default function Footer({ hasFooterContact, footerHeight }) {
  return (
    <Box p={'24px'} h={footerHeight}>
      <Stack spacing={'12px'} alignItems={'start'} justifyContent={'center'}>
        <SpFooterLogo />
        {hasFooterContact && (
          <Text variant={'sp_14_130'} display={'flex'} alignItems={'center'}>
            {'お電話でのお問合せは'}
            <Text as={'a'} variant={'sp_14_130_link'} href="tel:0120-609-861">
              {'0120-609-861'}
            </Text>
            {'まで'}
          </Text>
        )}
        {hasFooterContact && (
          <Text variant={'sp_14_130'}>{`営業時間：10:00~19:00\n休業日　：火曜・水曜日及び年末年始`}</Text>
        )}
        <Text
          fontFamily={'Hiragino Sans'}
          fontSize={'12px'}
          fontStyle={'normal'}
          fontWeight={300}
          lineHeight={'25px'}
          color={'#0B1F65'}
        >
          © 2023 みらいバンク Inc.
        </Text>
      </Stack>
    </Box>
  );
}
