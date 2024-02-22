import { ApConfirmGroup, ApConfirmItemGroup, ApLighterButton } from '@/components';
import { useBankMaster } from '@/hooks/use-bank-master';
import { agentSendedSelector, applicationAtom } from '@/store';
import { formatJapanDate } from '@/utils';
import { Box, Stack, Typography } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  bonusRepaymentMonthOptions,
  hasJoinGuarantorOptions,
  landAadvancePlanOptions,
  loanPlusOptions,
  loanTargetOptions,
  loanTargetOptions_,
  loanTypeOptions,
  repaymentMethodOptions,
} from './options';
import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';

export const ApStep01Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const {
    p_application_headers__move_scheduled_date,
    p_application_banks__s_bank_ids,
    p_application_headers__loan_target,
    p_application_headers__land_advance_plan,
    p_application_headers__loan_type,
    p_application_headers__pair_loan_last_name,
    p_application_headers__pair_loan_first_name,
    p_application_headers__pair_loan_rel_name,
    p_borrowing_details__0__desired_borrowing_date,
    p_borrowing_details__0__desired_loan_amount,
    p_borrowing_details__0__bonus_repayment_amount,
    p_borrowing_details__0__bonus_repayment_month,
    p_borrowing_details__0__loan_term_year,
    p_borrowing_details__0__repayment_method,
    p_borrowing_details__1__desired_borrowing_date,
    p_borrowing_details__1__desired_loan_amount,
    p_borrowing_details__1__bonus_repayment_amount,
    p_application_headers__join_guarantor_umu,
    p_application_headers__loan_plus,
    p_application_headers__loan_target_,
  } = useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);

  const bankMaster = useBankMaster();
  return (
    <ApConfirmGroup label={`STEP${stepIndex}：お借入のご希望`}>
      <ApConfirmItemGroup label={'入居予定年月'}>
        {p_application_headers__move_scheduled_date
          ? formatJapanDate(p_application_headers__move_scheduled_date, true)
          : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'仮審査を申し込む金融機関'}>
        {p_application_banks__s_bank_ids.length > 0
          ? p_application_banks__s_bank_ids.map((bankID) => {
              return (
                <Typography key={bankID} variant="modal_label" color={'text.main'}>
                  {bankMaster.find((item) => item.value == bankID)?.label}
                </Typography>
              );
            })
          : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'お借入の目的'}>
        {p_application_headers__loan_target_
          ? loanTargetOptions_.find((item) => item.value === p_application_headers__loan_target_)?.label
          : 'ー'}
      </ApConfirmItemGroup>
      {p_application_headers__loan_target_ === '0' && (
        <ApConfirmItemGroup label={'資金の使いみち'}>
          {p_application_headers__loan_target
            ? loanTargetOptions.find((item) => item.value === p_application_headers__loan_target)?.label
            : 'ー'}
        </ApConfirmItemGroup>
      )}

      {p_application_headers__loan_target === '6' && (
        <ApConfirmItemGroup label={'土地先行プランをご希望ですか？'}>
          {p_application_headers__land_advance_plan
            ? landAadvancePlanOptions.find((item) => item.value === p_application_headers__land_advance_plan)?.label
            : 'ー'}
        </ApConfirmItemGroup>
      )}

      <ApConfirmItemGroup label={'お借入形態'}>
        {p_application_headers__loan_type
          ? loanTypeOptions.find((item) => item.value === p_application_headers__loan_type)?.label
          : 'ー'}
        {p_application_headers__loan_type === '2' && (
          <Stack direction={'row'}>
            <Typography variant="modal_label" color={'text.main'}>
              {`〈お名前〉`}
              {p_application_headers__pair_loan_last_name && p_application_headers__pair_loan_first_name ? (
                <Typography variant="modal_label" color={'text.main'}>
                  {`${p_application_headers__pair_loan_last_name} ${p_application_headers__pair_loan_first_name}`}
                </Typography>
              ) : (
                'ー'
              )}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              {'〈続柄〉'}
              {p_application_headers__pair_loan_rel_name ? p_application_headers__pair_loan_rel_name : 'ー'}
            </Typography>
          </Stack>
        )}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup
        label={p_application_headers__land_advance_plan === '1' ? `お借入内容 1回目の融資` : 'お借入内容'}
      >
        <Stack spacing={3} alignItems={'start'}>
          <Typography variant="modal_label" color={'text.main'}>
            〈お借入希望日〉
            {p_borrowing_details__0__desired_borrowing_date
              ? formatJapanDate(p_borrowing_details__0__desired_borrowing_date, true)
              : 'ー'}
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            〈お借入希望額〉
            {p_borrowing_details__0__desired_loan_amount
              ? Number(p_borrowing_details__0__desired_loan_amount).toLocaleString()
              : 'ー'}
            万円
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            〈うち、ボーナス返済分〉
            {p_borrowing_details__0__bonus_repayment_amount
              ? Number(p_borrowing_details__0__bonus_repayment_amount).toLocaleString()
              : 'ー'}
            万円
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            〈ボーナス返済月〉
            {p_borrowing_details__0__bonus_repayment_month
              ? bonusRepaymentMonthOptions.find((item) => item.value === p_borrowing_details__0__bonus_repayment_month)
                  ?.label
              : 'ー'}
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            〈お借入期間〉
            {p_borrowing_details__0__loan_term_year ? p_borrowing_details__0__loan_term_year : 'ー'}年
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            〈返済方法〉
            {p_borrowing_details__0__repayment_method
              ? repaymentMethodOptions.find((item) => item.value === p_borrowing_details__0__repayment_method)?.label
              : 'ー'}
          </Typography>
        </Stack>
      </ApConfirmItemGroup>

      {p_application_headers__land_advance_plan === '1' && (
        <ApConfirmItemGroup label={'お借入内容 2回目の融資'}>
          <Stack spacing={3} alignItems={'start'}>
            <Typography variant="modal_label" color={'text.main'}>
              〈お借入希望日〉
              {p_borrowing_details__1__desired_borrowing_date
                ? formatJapanDate(p_borrowing_details__1__desired_borrowing_date, true)
                : 'ー'}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              〈お借入希望額〉
              {p_borrowing_details__1__desired_loan_amount
                ? Number(p_borrowing_details__1__desired_loan_amount).toLocaleString()
                : 'ー'}
              万円
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              〈うち、ボーナス返済分〉
              {p_borrowing_details__1__bonus_repayment_amount
                ? Number(p_borrowing_details__1__bonus_repayment_amount).toLocaleString()
                : 'ー'}
              万円
            </Typography>
          </Stack>
        </ApConfirmItemGroup>
      )}
      <ApConfirmItemGroup label={'担保提供者がいらっしゃいますか？'}>
        <Typography variant="modal_label" color={'text.main'}>
          {p_application_headers__join_guarantor_umu
            ? hasJoinGuarantorOptions.find((item) => item.value === p_application_headers__join_guarantor_umu)?.label
            : 'ー'}
        </Typography>
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'住信SBIネット銀行の「住宅ローンプラス」を申し込みますか？'}>
        <Typography variant="modal_label" color={'text.main'}>
          {p_application_headers__loan_plus
            ? loanPlusOptions.find((item) => item.value === p_application_headers__loan_plus)?.label
            : 'ー'}
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
