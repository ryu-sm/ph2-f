import { Box, Stack, Text, useTheme } from '@chakra-ui/react';

export default function SpGroup({
  sx,
  mark,
  note,
  title,
  helper,
  children,
  isOption,
  isMini,
  isFirst,
  markType = 'nowrap',
  noteType = 'nowrap',
}) {
  const theme = useTheme();
  return (
    <Box {...sx}>
      <Box
        px={'16px'}
        py={isMini ? '4px' : '8px'}
        bg={theme.colors.sp.primary[40]}
        borderRadius={isFirst && '9px 9px 0px 0px'}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'start'}>
          {isOption && (
            <Box px={'3px'} pb={'3px'} pt={'1px'} minW={'28px'} borderRadius={'4px'} bg={theme.colors.sp.gray[250]}>
              <Text variant={'sp_10_100_bold'} textAlign={'center'} color={'white'}>
                任意
              </Text>
            </Box>
          )}
          <Stack direction={noteType === 'nowrap' ? 'row' : 'column'} justifyContent={'space-between'}>
            <Stack spacing={'0px'}>
              <Box>
                <Stack
                  direction={markType === 'nowrap' ? 'row' : 'column'}
                  spacing={'0px'}
                  alignItems={markType === 'nowrap' ? 'end' : 'start'}
                  justifyContent={'start'}
                >
                  <Text variant={'sp_16_130_bold'}>{title}</Text>
                  {mark && <Text variant={'sp_12_130_blod'}>{mark}</Text>}
                </Stack>
              </Box>
              {helper && <Text variant={'sp_12_130_blod'}>※{helper}</Text>}
            </Stack>
            {note && <Box alignSelf={'end'}>{note}</Box>}
          </Stack>
        </Stack>
      </Box>
      <Box pt={'12px'} pb={isMini ? '12px' : '32px'} px={'16px'}>
        {children}
      </Box>
    </Box>
  );
}
