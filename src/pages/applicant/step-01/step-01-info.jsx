import { ApConfirmGroup, ApConfirmItemGroup, ApLighterButton } from '@/components';
import { useBankMaster } from '@/hooks/use-bank-master';
import { agentSendedSelector, applicationAtom } from '@/store';
import { formatJapanDate } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import {
  bonusRepaymentMonthOptions,
  landAadvancePlanOptions,
  loanTargetOptions,
  loanTargetOptions_,
  loanTypeOptions,
  repaymentMethodOptions,
} from './options';
import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { useMemo } from 'react';

export const ApStep01Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const { p_application_headers, p_application_banks, p_borrowing_details__1, p_borrowing_details__2 } =
    useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);
  const bankMaster = useBankMaster();

  const loan_target_ = useMemo(() => {
    if (['1', '2', '3', '4', '5', '6', ''].includes(p_application_headers.loan_target)) {
      return '0';
    } else {
      return p_application_headers.loan_target;
    }
  }, [p_application_headers.loan_target]);

  return (
    <ApConfirmGroup stepIndex={stepIndex} label={'：お借入のご希望'}>
      <ApConfirmItemGroup label={'入居予定年月'}>
        {p_application_headers.move_scheduled_date
          ? formatJapanDate(p_application_headers.move_scheduled_date, true)
          : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'仮審査を申し込む金融機関'}>
        {p_application_banks.length > 0
          ? p_application_banks.map((bankID) => {
              return (
                <Typography key={bankID} variant="modal_label" color={'text.main'}>
                  {bankMaster.find((item) => item.value == bankID)?.label}
                </Typography>
              );
            })
          : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'お借入の目的'}>
        {loanTargetOptions_.find((item) => item.value === loan_target_)?.label}
      </ApConfirmItemGroup>
      {loan_target_ === '0' && (
        <ApConfirmItemGroup label={'資金の使いみち'}>
          {loanTargetOptions.find((item) => item.value === p_application_headers.loan_target)?.label}
        </ApConfirmItemGroup>
      )}

      {p_application_headers.loan_target === '6' && (
        <ApConfirmItemGroup label={'土地先行プランをご希望ですか？'}>
          {landAadvancePlanOptions.find((item) => item.value === p_application_headers.land_advance_plan)?.label}
        </ApConfirmItemGroup>
      )}

      <ApConfirmItemGroup label={'お借入形態'}>
        {p_application_headers.loan_type
          ? loanTypeOptions.find((item) => item.value === p_application_headers.loan_type)?.label
          : 'ー'}
        {p_application_headers.loan_type === '2' && (
          <Stack direction={'row'}>
            <Typography variant="modal_label" color={'text.main'}>
              {`〈お名前〉`}
              {p_application_headers.pair_loan_last_name && p_application_headers.pair_loan_first_name ? (
                <Typography variant="modal_label" color={'text.main'}>
                  {`${p_application_headers.pair_loan_last_name} ${p_application_headers.pair_loan_first_name}`}
                </Typography>
              ) : (
                'ー'
              )}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              {'〈続柄〉'}
              {p_application_headers.pair_loan_rel_name ? p_application_headers.pair_loan_rel_name : 'ー'}
            </Typography>
          </Stack>
        )}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup
        label={p_application_headers.land_advance_plan === '1' ? `お借入内容 1回目の融資` : 'お借入内容'}
      >
        <Stack spacing={3} alignItems={'start'}>
          <Typography variant="modal_label" color={'text.main'}>
            〈お借入希望日〉
            {p_borrowing_details__1.desired_borrowing_date
              ? formatJapanDate(p_borrowing_details__1.desired_borrowing_date, true)
              : 'ー'}
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            〈お借入希望額〉
            {p_borrowing_details__1.desired_loan_amount
              ? Number(p_borrowing_details__1.desired_loan_amount).toLocaleString()
              : 'ー'}
            万円
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            〈うち、ボーナス返済分〉
            {p_borrowing_details__1.bonus_repayment_amount
              ? Number(p_borrowing_details__1.bonus_repayment_amount).toLocaleString()
              : 'ー'}
            万円
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            〈ボーナス返済月〉
            {p_borrowing_details__1.bonus_repayment_month
              ? bonusRepaymentMonthOptions.find((item) => item.value === p_borrowing_details__1.bonus_repayment_month)
                  ?.label
              : 'ー'}
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            〈お借入期間〉
            {p_borrowing_details__1.loan_term_year ? p_borrowing_details__1.loan_term_year : 'ー'}年
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            〈返済方法〉
            {p_borrowing_details__1.repayment_method
              ? repaymentMethodOptions.find((item) => item.value === p_borrowing_details__1.repayment_method)?.label
              : 'ー'}
          </Typography>
        </Stack>
      </ApConfirmItemGroup>

      {p_application_headers.land_advance_plan === '1' && (
        <ApConfirmItemGroup label={'お借入内容 2回目の融資'}>
          <Stack spacing={3} alignItems={'start'}>
            <Typography variant="modal_label" color={'text.main'}>
              〈お借入希望日〉
              {p_borrowing_details__2.desired_borrowing_date
                ? formatJapanDate(p_borrowing_details__2.desired_borrowing_date, true)
                : 'ー'}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              〈お借入希望額〉
              {p_borrowing_details__2.desired_loan_amount
                ? Number(p_borrowing_details__2.desired_loan_amount).toLocaleString()
                : 'ー'}
              万円
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              〈うち、ボーナス返済分〉
              {p_borrowing_details__2.bonus_repayment_amount
                ? Number(p_borrowing_details__2.bonus_repayment_amount).toLocaleString()
                : 'ー'}
              万円
            </Typography>
          </Stack>
        </ApConfirmItemGroup>
      )}
      <ApConfirmItemGroup label={'担保提供者がいらっしゃいますか？'}>
        <Typography variant="modal_label" color={'text.main'}>
          {p_application_headers.join_guarantor_umu ? 'いる' : 'いない'}
        </Typography>
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'住信SBIネット銀行の「住宅ローンプラス」を申し込みますか？'}>
        <Typography variant="modal_label" color={'text.main'}>
          {p_application_headers.loan_plus ? '申し込む' : '申し込まない'}
        </Typography>
      </ApConfirmItemGroup>
      {!agentSended && (
        <Stack alignItems={'center'} sx={{ py: 3 }}>
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={() => navigate(routeNames.apStep01Page.path)}
          >
            <Stack spacing={'6px'} direction={'row'} alignItems={'center'}>
              <Icons.ApEditorIcon />
              <Typography variant="radio_checkbox_button">{`STEP${stepIndex}を修正する`}</Typography>
            </Stack>
          </ApLighterButton>
        </Stack>
      )}
    </ApConfirmGroup>
  );
};
