import Scroll from 'react-scroll';
import { useCallback, useEffect } from 'react';
import { Box, HStack, Text, useTheme } from '@chakra-ui/react';
import { useSpContext } from '@/hooks';
import { SpComplete } from '@/assets/svgs';

export default function SpStepHeader() {
  const theme = useTheme();
  const { spSteps, currStepHeaderIndex } = useSpContext();
  const calcShape = useCallback(
    (index) => {
      return index === 0
        ? 'polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)'
        : index === spSteps.length - 1
        ? 'polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 9% 50%, 0% 0%)'
        : 'polygon(90% 0, 100% 50%, 90% 100%, 0% 100%, 9% 50%, 0% 0%)';
    },
    [spSteps.length]
  );

  const calcMarginLeft = (index) => {
    return index === 0 ? '0' : '-2.5%';
  };

  const calcBackBgColor = useCallback(
    (index) => {
      return index > currStepHeaderIndex ? 'sp.primary.40' : 'white';
    },
    [currStepHeaderIndex]
  );

  const calcFrontBgColor = useCallback(
    (index) => {
      return index === currStepHeaderIndex ? 'sp.primary.100' : index > currStepHeaderIndex ? 'white' : 'sp.primary.40';
    },
    [currStepHeaderIndex]
  );

  const calcTextColor = useCallback(
    (index) => {
      return index === currStepHeaderIndex
        ? 'white'
        : index > currStepHeaderIndex
        ? theme.colors.sp.primary[100]
        : theme.colors.sp.primary[60];
    },
    [currStepHeaderIndex]
  );

  const scroller = Scroll.scroller;
  const Element = Scroll.Element;

  useEffect(() => {
    setTimeout(() => {
      scroller.scrollTo(`step-${spSteps[currStepHeaderIndex]?.id}`, {
        duration: 300,
        smooth: true,
        containerId: 'sp-header-steps',
        isDynamic: true,
        horizontal: true,
      });
    }, 150);
  }, [scroller, currStepHeaderIndex, spSteps]);

  return (
    <Box
      id="sp-header-steps"
      display={'flex'}
      pos={'fixed'}
      zIndex={888}
      maxW={'480px'}
      alignItems={'center'}
      w={'100%'}
      flexWrap={'nowrap'}
      overscrollBehavior={'none'}
      overflow={'hidden'}
      sx={{
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {spSteps.map((step, index) => (
        <Element
          key={step.id}
          name={`step-${step.id}`}
          style={{
            flex: '0 0 27.5%',
            marginLeft: calcMarginLeft(index),
          }}
        >
          <Box
            h="64px"
            right={'0px'}
            key={index}
            position={'relative'}
            clipPath={calcShape(index)}
            bg={calcBackBgColor(index)}
            color={calcTextColor(index)}
            sx={{
              ...(currStepHeaderIndex === 0 && { left: '-12px' }),
            }}
          >
            <Box
              height={'62px'}
              width={index === spSteps.length - 1 ? 'calc(100% - 2px)' : 'calc(100% + 2px)'}
              position={'absolute'}
              top={'1px'}
              left={'1px'}
              bg={calcFrontBgColor(index)}
              clipPath={calcShape(index)}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
            >
              <Box pt={'4px'}>
                <HStack spacing={'2px'} alignItems={'end'}>
                  {index < currStepHeaderIndex && <SpComplete />}
                  <Text variant={'sp_14_100_bold'} color={calcTextColor(index)}>
                    STEP
                  </Text>
                  <Text variant={'sp_18_100_bold'} color={calcTextColor(index)}>
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </Text>
                </HStack>
              </Box>

              <Box h={'32px'} pt={'4px'} pb={'6px'}>
                <HStack spacing={'0px'} alignItems={'center'}>
                  {index <= currStepHeaderIndex ? (
                    <step.colorIcon color={calcTextColor(index)} />
                  ) : (
                    step.gradientIcon && <step.gradientIcon />
                  )}
                  <Text variant={'sp_12_120_blod'} color={calcTextColor(index)}>
                    {step.label}
                  </Text>
                </HStack>
              </Box>
            </Box>
          </Box>
        </Element>
      ))}
    </Box>
  );
}
