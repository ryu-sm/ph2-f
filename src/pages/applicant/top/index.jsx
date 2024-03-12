import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  agentSendedSelector,
  apCurrStepIdSelector,
  applicationAtom,
  appliedBanksSelector,
  applyNoSelector,
  hasDraftDataSelector,
  hasIncomeTotalizerSelector,
  hasJoinGuarantorSelector,
  preExaminationStatusSelector,
  provisionalResultSelector,
} from '@/store';
import { ApFooter, ApLayout } from '@/containers';
import { Box, Stack, Typography } from '@mui/material';
import { Icons } from '@/assets';
import { ApChat, ApLighterButton, ApPageTitle, ApPrimaryButton } from '@/components';
import {
  APPROVAL,
  DATA_LINKAGE_TO_BANKS,
  DISCLOSURE_RESULTS_TO_APPLICANTS,
  DISCLOSURE_RESULTS_TO_PARTNER_COMPANIES,
} from '@/constant/pre-examination-status';
import { MCJ_CODE } from '@/configs';
import { routeNames } from '@/router/settings';
import { useNavigate } from 'react-router-dom';
import { apApplication } from '@/services';

export const ApTopPage = () => {
  const applyNo = useRecoilValue(applyNoSelector);
  const appliedBanks = useRecoilValue(appliedBanksSelector);
  const preExaminationStatus = useRecoilValue(preExaminationStatusSelector);
  const hasDraftData = useRecoilValue(hasDraftDataSelector);
  const apCurrStepId = useRecoilValue(apCurrStepIdSelector);
  const agentSended = useRecoilValue(agentSendedSelector);
  const hasJoinGuarantor = useRecoilValue(hasJoinGuarantorSelector);
  const hasIncomeTotalizer = useRecoilValue(hasIncomeTotalizerSelector);
  const provisionalResult = useRecoilValue(provisionalResultSelector);
  const setApplicationInfo = useSetRecoilState(applicationAtom);

  const refreshApplyInfo = useCallback(async () => {
    try {
      const res = await apApplication(applyNo);
      setApplicationInfo((pre) => {
        return {
          ...pre,
          ...res.data,
          apCurrStepId: 14,
          isMCJ: res.data.p_application_banks?.lengt > 1,
          hasIncomeTotalizer: Boolean(res.data.p_applicant_persons__1),
          hasJoinGuarantor: Boolean(res.data.p_join_guarantors),
          changeJoinGuarantor: false,
          changeToIncomeTotalizer: false,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    if (agentSended) {
      refreshApplyInfo();
    }
  }, [agentSended, applyNo]);

  const topItems = useMemo(
    () => [
      {
        id: 1,
        stepTitle: 'お借入のご希望',
        stepIcon: <Icons.ApTopStepIdIcon01 />,
        stepPath: routeNames.apStep01Page.path,
        buttonLabel: apCurrStepId === 1 ? '入力する' : '修正する',
        show: preExaminationStatus < parseInt(APPROVAL),
      },
      {
        id: 2,
        stepTitle: 'あなたの情報',
        stepIcon: <Icons.ApTopStepIdIcon02 />,
        stepPath: routeNames.apStep02Page.path,
        buttonLabel: apCurrStepId < 2 ? '---' : apCurrStepId === 2 ? '入力する' : '修正する',
        show: preExaminationStatus < parseInt(APPROVAL),
      },
      {
        id: 3,
        stepTitle: 'あなたのご職業',
        stepIcon: <Icons.ApTopStepIdIcon03 />,
        stepPath: routeNames.apStep03Page.path,
        buttonLabel: apCurrStepId < 3 ? '---' : apCurrStepId === 3 ? '入力する' : '修正する',
        show: preExaminationStatus < parseInt(APPROVAL),
      },
      ...(hasIncomeTotalizer
        ? [
            {
              id: 4,
              stepTitle: '収入合算者',
              stepIcon: <Icons.ApTopStepIdIcon04 />,
              stepPath: routeNames.apStep04Page.path,
              buttonLabel: apCurrStepId < 4 ? '---' : apCurrStepId === 4 ? '入力する' : '修正する',
              show: preExaminationStatus < parseInt(APPROVAL),
            },
            {
              id: 5,
              stepTitle: '収入合算者の職業',
              stepIcon: <Icons.ApTopStepIdIcon05 />,
              stepPath: routeNames.apStep05Page.path,
              buttonLabel: apCurrStepId < 5 ? '---' : apCurrStepId === 5 ? '入力する' : '修正する',
              show: preExaminationStatus < parseInt(APPROVAL),
            },
          ]
        : []),
      ...(hasJoinGuarantor
        ? [
            {
              id: 6,
              stepTitle: '担保提供者',
              stepIcon: <Icons.ApTopStepIdIcon06 />,
              stepPath: routeNames.apStep06Page.path,
              buttonLabel: apCurrStepId < 6 ? '---' : apCurrStepId === 6 ? '入力する' : '修正する',
              show: preExaminationStatus < parseInt(APPROVAL),
            },
          ]
        : []),
      {
        id: 7,
        stepTitle: 'お住まい',
        stepIcon: <Icons.ApTopStepIdIcon07 />,
        stepPath: routeNames.apStep07Page.path,
        buttonLabel: apCurrStepId < 7 ? '---' : apCurrStepId === 7 ? '入力する' : '修正する',
        show: preExaminationStatus < parseInt(APPROVAL),
      },
      {
        id: 8,
        stepTitle: '現在のお借入状況',
        stepIcon: <Icons.ApTopStepIdIcon08 />,
        stepPath: routeNames.apStep08Page.path,
        buttonLabel: apCurrStepId < 8 ? '---' : apCurrStepId === 8 ? '入力する' : '修正する',
        show: preExaminationStatus < parseInt(APPROVAL),
      },
      {
        id: 9,
        stepTitle: '資金計画',
        stepIcon: <Icons.ApTopStepIdIcon09 />,
        stepPath: routeNames.apStep09Page.path,
        buttonLabel: apCurrStepId < 9 ? '---' : apCurrStepId === 9 ? '入力する' : '修正する',
        show: preExaminationStatus < parseInt(APPROVAL),
      },
      {
        id: 10,
        stepTitle: '書類添付',
        stepIcon: <Icons.ApTopStepIdIcon10 />,
        stepPath: routeNames.apStep10Page.path,
        buttonLabel: apCurrStepId < 10 ? '---' : apCurrStepId === 10 ? '入力する' : '修正する',
        show: preExaminationStatus < parseInt(APPROVAL),
      },
      ...(hasIncomeTotalizer
        ? [
            {
              id: 11,
              stepTitle: '収入合算者の書類',
              stepIcon: <Icons.ApTopStepIdIcon11 />,
              stepPath: routeNames.apStep11Page.path,
              buttonLabel: apCurrStepId < 11 ? '---' : apCurrStepId === 11 ? '入力する' : '修正する',
              show: preExaminationStatus < parseInt(APPROVAL),
            },
          ]
        : []),
      {
        id: 12,
        stepTitle: '担当者情報',
        stepIcon: <Icons.ApTopStepIdIcon12 />,
        stepPath: routeNames.apStep12Page.path,
        buttonLabel: apCurrStepId < 12 ? '---' : apCurrStepId === 12 ? '入力する' : '修正する',
        show: preExaminationStatus < parseInt(APPROVAL),
      },
      {
        id: 13,
        stepTitle: '入力内容確認',
        stepIcon: <Icons.ApTopStepIdIcon13 />,
        stepPath: routeNames.apStep13Page.path,
        buttonLabel: apCurrStepId < 13 ? '---' : apCurrStepId === 13 ? '入力する' : '修正する',
        show: !agentSended,
      },
      {
        id: 14,
        stepTitle: '仮審査申込',
        stepIcon: <Icons.ApTopStepIdIcon14 />,
        stepPath: routeNames.apConfirmPage.path,
        buttonLabel: apCurrStepId < 14 ? '---' : '申込内容確認',
        show: true,
      },
      ...(preExaminationStatus === DISCLOSURE_RESULTS_TO_APPLICANTS
        ? [
            {
              id: 15,
              stepTitle: '仮審査結果',
              stepIcon: <Icons.ApTopStepIdIcon15 />,
              stepPath: '',
              buttonLabel: preExaminationStatus === DISCLOSURE_RESULTS_TO_APPLICANTS ? '申込内容確認' : '---',
              show: true,
            },
          ]
        : []),

      ...(appliedBanks.includes(MCJ_CODE)
        ? [
            {
              id: 16,
              stepTitle: '日本住宅ローン用\nPDF出力',
              stepIcon: <Icons.ApTopStepIdIcon16 />,
              stepPath: '',
              buttonLabel: preExaminationStatus === DISCLOSURE_RESULTS_TO_APPLICANTS ? 'ダウンロード' : '---',
              show: true,
            },
          ]
        : []),
    ],
    [appliedBanks, preExaminationStatus, hasIncomeTotalizer, hasJoinGuarantor]
  );

  const topLabelText = useMemo(() => {
    if (preExaminationStatus === DISCLOSURE_RESULTS_TO_APPLICANTS) return `審査結果が届きました\nご確認ください`;
    if (
      preExaminationStatus === APPROVAL ||
      preExaminationStatus === DATA_LINKAGE_TO_BANKS ||
      preExaminationStatus === DISCLOSURE_RESULTS_TO_PARTNER_COMPANIES
    )
      return `仮審査の結果につきましては、\n提携先企業からお知らせいたします。`;
    if (!!applyNo) return `お申込完了しています`;
    if (hasDraftData) return `前回の続きから\n入力しましょう！`;
    return `STEPに沿って入力してください\n途中保存もできます！`;
  }, [preExaminationStatus, applyNo, hasDraftData]);

  return (
    <ApLayout hasMenu>
      <Box sx={{ background: (theme) => theme.palette.background.gradation }}>
        <Stack sx={{ minHeight: 'calc(100dvh - 44px)' }}>
          <Stack flex={1}>
            <ApPageTitle>住宅ローン仮審査</ApPageTitle>
            <Stack alignItems={'center'} sx={{ px: 8 }}>
              <Stack
                spacing={3}
                alignItems={'center'}
                sx={{ px: 4, py: 3, width: 'fit-content', minWidth: 280, bgcolor: 'white', borderRadius: 2 }}
              >
                {<Icons.ApSmileIcon />}
                <Typography
                  variant="modal_label"
                  sx={{ fontWeight: 500, color: (theme) => theme.palette.primary.main }}
                >
                  {topLabelText}
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={-2} sx={{ flex: 1, py: 6, px: 4 }}>
              {topItems.map((item, index) =>
                item.show ? (
                  <TopItem
                    key={item.id}
                    stepNo={index + 1}
                    isCompleted={apCurrStepId > item.id}
                    {...item}
                    topItems={topItems}
                  />
                ) : null
              )}
            </Stack>
          </Stack>
          <ApFooter mb={16} />
          <ApChat />
        </Stack>
      </Box>
    </ApLayout>
  );
};

const TopItem = ({ id, stepNo, isCompleted, stepIcon, stepTitle, buttonLabel, stepPath, topItems }) => {
  const navigate = useNavigate();
  const preExaminationStatus = useRecoilValue(preExaminationStatusSelector);
  const apCurrStepId = useRecoilValue(apCurrStepIdSelector);
  const agentSended = useRecoilValue(agentSendedSelector);

  const itemButton = useCallback((id) => {
    switch (id) {
      case 14:
        return (
          <ApPrimaryButton height={40} width={114} disabled={!agentSended} onClick={() => navigate(stepPath)}>
            {buttonLabel}
          </ApPrimaryButton>
        );
      case 15:
        return (
          <ApPrimaryButton
            height={40}
            width={114}
            disabled={!(preExaminationStatus === DISCLOSURE_RESULTS_TO_APPLICANTS)}
            onClick={() => navigate(stepPath)}
          >
            {buttonLabel}
          </ApPrimaryButton>
        );
      case 16:
        return (
          <ApPrimaryButton
            height={40}
            width={114}
            disabled={!(preExaminationStatus === DISCLOSURE_RESULTS_TO_APPLICANTS)}
            onClick={() => navigate(stepPath)}
          >
            {buttonLabel}
          </ApPrimaryButton>
        );
      default:
        if (id === apCurrStepId)
          return (
            <ApPrimaryButton height={40} width={114} onClick={() => navigate(stepPath)}>
              {buttonLabel}
            </ApPrimaryButton>
          );
        if (id > apCurrStepId)
          return (
            <ApPrimaryButton height={40} width={114} disabled={true} onClick={() => navigate(stepPath)}>
              {buttonLabel}
            </ApPrimaryButton>
          );
        if (id < apCurrStepId)
          return (
            <ApLighterButton height={40} width={114} onClick={() => navigate(stepPath)}>
              {buttonLabel}
            </ApLighterButton>
          );
    }
  }, []);
  return (
    <Stack>
      <Typography variant="step" sx={{ fontSize: 16, color: (theme) => theme.palette.primary.main, mb: '-3px' }}>
        {'STEP '}
        <Typography variant="step" sx={{ fontSize: 24 }}>
          {String(stepNo).padStart(2, '0')}
        </Typography>
      </Typography>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{
          borderTop: '1px solid',
          borderColor: (theme) => theme.palette.primary.main,
          bgcolor: (theme) => (isCompleted ? theme.palette.primary[20] : 'white'),
          borderRadius: '0px 0px 4px 4px',
          px: 3,
          height: 64,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {isCompleted ? <Icons.ApTopStepCheckedIcon /> : stepIcon}

          <Typography
            variant="radio_checkbox_button"
            sx={{ color: (theme) => theme.palette.primary.main, whiteSpace: 'break-spaces' }}
          >
            {stepTitle}
          </Typography>
        </Stack>
        {itemButton(id)}
      </Stack>
      {stepNo !== topItems.length && (
        <Stack alignItems="center" sx={{ pt: 1 }}>
          <Icons.ApTopStepDown />
        </Stack>
      )}
    </Stack>
  );
};
