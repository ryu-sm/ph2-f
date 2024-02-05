import SpTopListItemIcon from '@/assets/svgs/sp-top-list-item-checked';
import { useSpContext } from '@/hooks';
import { Box, Button, Center, HStack, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function SpTopList() {
  const { spSteps, curr_completed_step_id } = useSpContext();
  const navigate = useNavigate();
  return (
    <Box px={'16px'}>
      <Stack>
        {spSteps.map((item, index) => (
          <Box key={item.id}>
            <Box pos={'relative'} bottom={'-2px'}>
              <HStack spacing={'4px'} alignItems={'end'}>
                <Text variant={'sp_16_100_bold'} color={'sp.primary.100'}>
                  STEP
                </Text>
                <Text variant={'sp_24_100_bold'} color={'sp.primary.100'}>
                  {index < 9 ? `0${index + 1}` : index + 1}
                </Text>
              </HStack>
            </Box>

            <HStack
              h={'64px'}
              px={'12px'}
              alignItems={'center'}
              justifyContent={'space-between'}
              borderTop={'1px solid'}
              borderColor={'sp.primary.100'}
              borderRadius={'0px 0px 4px 4px'}
              bg={item.id < curr_completed_step_id ? 'sp.primary.20' : 'white'}
            >
              <HStack>
                <Center w={'40px'} h={'40px'}>
                  {item.id < curr_completed_step_id ? (
                    <SpTopListItemIcon />
                  ) : (
                    <item.gradientIcon width="40px" height="40px" />
                  )}
                </Center>
                <Text variant={'sp_16_100_bold'} color={'sp.primary.100'}>
                  {item.label.replace('\n', '')}
                </Text>
              </HStack>
              <Button
                maxW={'114px'}
                variant={item.id < curr_completed_step_id ? 'sp_solid_secondary' : 'sp_solid'}
                isDisabled={item.id > curr_completed_step_id}
                onClick={() => navigate(`/step-${item.id}`)}
              >
                {item.id < curr_completed_step_id
                  ? '修正する'
                  : item.id === curr_completed_step_id
                  ? '入力する'
                  : '---'}
              </Button>
            </HStack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
