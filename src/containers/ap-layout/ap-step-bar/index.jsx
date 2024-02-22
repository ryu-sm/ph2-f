import Scroll from 'react-scroll';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { applicationAtom, hasIncomeTotalizerSelector, hasJoinGuarantorSelector } from '@/store';
import { Icons } from '@/assets';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';

export const ApStepBar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const setApplication = useSetRecoilState(applicationAtom);
  const hasJoinGuarantor = useRecoilValue(hasJoinGuarantorSelector);
  const hasIncomeTotalizer = useRecoilValue(hasIncomeTotalizerSelector);

  const apSteps = useMemo(
    () => [
      {
        id: 1,
        label: 'お借入の\nご希望',
        colorIcon: Icons.ApStepIdColorIcon01,
        gradientIcon: Icons.ApStepId01Icon,
      },
      {
        id: 2,
        label: 'あなたの\n情報',
        colorIcon: Icons.ApStepIdColorIcon02,
        gradientIcon: Icons.ApStepId02Icon,
      },
      {
        id: 3,
        label: 'あなたの\nご職業',
        colorIcon: Icons.ApStepIdColorIcon03,
        gradientIcon: Icons.ApStepId03Icon,
      },
      ...(hasIncomeTotalizer
        ? [
            {
              id: 4,
              label: '収入\n合算者',
              colorIcon: Icons.ApStepIdColorIcon04,
              gradientIcon: Icons.ApStepId04Icon,
            },
            {
              id: 5,
              label: '収入合算\n者の職業',
              colorIcon: Icons.ApStepIdColorIcon05,
              gradientIcon: Icons.ApStepId05Icon,
            },
          ]
        : []),
      ...(hasJoinGuarantor
        ? [
            {
              id: 6,
              label: '担保\n提供者',
              colorIcon: Icons.ApStepIdColorIcon06,
              gradientIcon: Icons.ApStepId06Icon,
            },
          ]
        : []),
      {
        id: 7,
        label: 'お住まい',
        colorIcon: Icons.ApStepIdColorIcon07,
        gradientIcon: Icons.ApStepId07Icon,
      },
      {
        id: 8,
        label: '現在の\n借入状況',
        colorIcon: Icons.ApStepIdColorIcon08,
        gradientIcon: Icons.ApStepId08Icon,
      },
      {
        id: 9,
        label: '資金計画',
        colorIcon: Icons.ApStepIdColorIcon09,
        gradientIcon: Icons.ApStepId09Icon,
      },
      {
        id: 10,
        label: '書類添付',
        colorIcon: Icons.ApStepIdColorIcon10,
        gradientIcon: Icons.ApStepId10Icon,
      },
      ...(hasIncomeTotalizer
        ? [
            {
              id: 11,
              label: '収入合算\n者の書類',
              colorIcon: Icons.ApStepIdColorIcon11,
              gradientIcon: Icons.ApStepId11Icon,
            },
          ]
        : []),
      {
        id: 12,
        label: '担当者\n情報',
        colorIcon: Icons.ApStepIdColorIcon12,
        gradientIcon: Icons.ApStepId12Icon,
      },
      {
        id: 13,
        label: '入力内容\nご確認',
        colorIcon: Icons.ApStepIdColorIcon13,
        gradientIcon: Icons.ApStepId13Icon,
      },
      {
        id: 14,
        label: '仮審査\n申込完了',
        colorIcon: Icons.ApStepIdColorIcon14,
        gradientIcon: Icons.ApStepId14Icon,
      },
    ],
    [hasIncomeTotalizer, hasJoinGuarantor]
  );

  const stepIndex = useMemo(() => {
    const pageStepID = parseInt(pathname.replace('/step-id-', ''));
    return apSteps.findIndex((item) => item.id === pageStepID);
  }, [apSteps, pathname]);

  useEffect(() => {
    setApplication((pre) => {
      return {
        ...pre,
        apNextStepId: stepIndex === apSteps.length - 1 ? 14 : apSteps[stepIndex + 1]?.id,
        apPreStepId: stepIndex === 0 ? 1 : apSteps[stepIndex - 1]?.id,
        apCurrStepId: apSteps[stepIndex]?.id > pre.apCurrStepId ? apSteps[stepIndex]?.id : pre.apCurrStepId,
      };
    });
  }, [apSteps, stepIndex]);

  const calcShape = useCallback(
    (index) => {
      return index === 0
        ? 'polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)'
        : index === apSteps.length - 1
        ? 'polygon(100% 0, 100% 50%, 100% 100%, 0% 100%, 9% 50%, 0% 0%)'
        : 'polygon(90% 0, 100% 50%, 90% 100%, 0% 100%, 9% 50%, 0% 0%)';
    },
    [apSteps.length]
  );

  const calcMarginLeft = (index) => {
    return index === 0 ? '0' : '-2.5%';
  };

  const calcBackBgColor = useCallback(
    (index) => {
      return index > stepIndex ? theme.palette.primary[40] : 'white';
    },
    [stepIndex]
  );

  const calcFrontBgColor = useCallback(
    (index) => {
      return index === stepIndex ? theme.palette.primary.main : index > stepIndex ? 'white' : theme.palette.primary[40];
    },
    [stepIndex]
  );

  const calcTextColor = useCallback(
    (index) => {
      return index === stepIndex ? 'white' : index > stepIndex ? theme.palette.primary.main : theme.palette.primary[60];
    },
    [stepIndex]
  );

  const scroller = Scroll.scroller;
  const Element = Scroll.Element;

  useEffect(() => {
    setTimeout(() => {
      scroller.scrollTo(`step-${apSteps[stepIndex]?.id}`, {
        duration: 300,
        smooth: true,
        containerId: 'sp-header-steps',
        isDynamic: true,
        horizontal: true,
      });
    }, 150);
  }, [scroller, stepIndex, apSteps]);

  return (
    <Box
      id="sp-header-steps"
      sx={{
        display: 'flex',
        position: 'fixed',
        top: 44,
        zIndex: 1,
        maxWidth: 480,
        alignItems: 'center',
        width: 1,
        flexWrap: 'nowrap',
        overflow: 'hidden',
        backgroundColor: 'white',
        overscrollBehavior: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        border: (theme) => `0.5px solid ${theme.palette.primary[40]}`,
      }}
    >
      {apSteps.map((step, index) => (
        <Element
          key={step.id}
          name={`step-${step.id}`}
          style={{
            flex: '0 0 27.5%',
            marginLeft: calcMarginLeft(index),
          }}
        >
          <Box
            sx={{
              height: 64,
              right: 0,
              position: 'relative',
              clipPath: calcShape(index),
              bgcolor: calcBackBgColor(index),
              color: calcTextColor(index),
              ...(stepIndex === 0 && { left: '-12px' }),
            }}
          >
            <Box
              sx={{
                height: 62,
                width: index === apSteps.length - 1 ? 'calc(100% - 2px)' : 'calc(100% + 2px)',
                position: 'absolute',
                top: '1px',
                left: '1px',
                bgcolor: calcFrontBgColor(index),
                clipPath: calcShape(index),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box pt={1}>
                <Stack spacing={1} direction={'row'} alignItems={'end'}>
                  {index < stepIndex && <Icons.ApStepComplete />}
                  <Typography variant={'label'} color={calcTextColor(index)}>
                    STEP{' '}
                    <Typography variant={'label'} color={calcTextColor(index)}>
                      {String(index + 1).padStart(2, '0')}
                    </Typography>
                  </Typography>
                </Stack>
              </Box>

              <Box height={32} pt={1} pb={'6px'}>
                <Stack direction={'row'} spacing={'0px'} alignItems={'center'}>
                  {index <= stepIndex ? (
                    <step.colorIcon color={calcTextColor(index)} />
                  ) : (
                    step.gradientIcon && <step.gradientIcon />
                  )}
                  <Typography variant={'step_label'} color={calcTextColor(index)}>
                    {step.label}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Element>
      ))}
    </Box>
  );
};
