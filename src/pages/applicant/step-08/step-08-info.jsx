import { ApConfirmGroup, ApConfirmItemGroup, ApImgItem, ApLighterButton } from '@/components';
import { useBankMaster } from '@/hooks/use-bank-master';
import { agentSendedSelector, applicationAtom, hasIncomeTotalizerSelector, isMcjSelector } from '@/store';
import { formatJapanDate } from '@/utils';
import { Box, Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import {
  CurrBorrowingStatusOptions,
  borrowerOptions,
  categoryOptions,
  commonHousingOptions,
  estateSettingOptions,
  houseFinanceAgency,
  loanBusinessTargetOptions,
  loanPurposeOptions,
  refundSourceTypeOptions,
  scheduledLoanPayoffOptions,
  typeOptions,
} from './options';
import { useIsSalesPerson } from '@/hooks';

export const ApStep08Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const { isMCJ, hasIncomeTotalizer, p_application_headers, p_borrowings } = useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);

  const bankMaster = useBankMaster();
  return (
    <ApConfirmGroup stepIndex={stepIndex} label={`：現在の借入状況`}>
      <ApConfirmItemGroup label={'あなたや連帯保証人予定者に、現在お借入はありますか？'}>
        {p_application_headers.curr_borrowing_status ? (
          <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
            {
              CurrBorrowingStatusOptions.find((item) => item.value === p_application_headers.curr_borrowing_status)
                .label
            }
          </Typography>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      {p_borrowings.map((p_borrowing, index) => (
        <ApConfirmItemGroup key={index} label={`お借入${index + 1}件目`}>
          <Stack spacing={1} alignItems={'start'}>
            {hasIncomeTotalizer && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈借入名義人〉
                {p_borrowing.borrower
                  ? borrowerOptions.find((item) => item.value === p_borrowing.borrower).label
                  : 'ー'}
              </Typography>
            )}

            <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
              〈借入種類〉
              {p_borrowing.type ? typeOptions.find((item) => item.value === p_borrowing.type).label : 'ー'}
            </Typography>
            {p_borrowing.p_borrowings__I.length > 0 && <ApImgItem files={p_borrowing.p_borrowings__I} />}

            {p_borrowing.lender && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈借入先〉
                {p_borrowing.lender ? p_borrowing.lender : 'ー'}
              </Typography>
            )}

            {p_borrowing.loan_purpose && p_borrowing.type === '2' && (
              <Stack>
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  〈お借入の目的〉
                  {p_borrowing.loan_purpose
                    ? loanPurposeOptions.find((item) => item.value === p_borrowing.loan_purpose).label
                    : 'ー'}
                </Typography>
                {p_borrowing.loan_purpose === '99' && (
                  <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                    〈その他の方は詳細〉
                    {p_borrowing.loan_purpose_other ? p_borrowing.loan_purpose_other : 'ー'}
                  </Typography>
                )}
              </Stack>
            )}

            {p_borrowing.loan_business_target && p_borrowing.type === '4' && (
              <Stack>
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  〈お借入の目的〉
                  {p_borrowing.loan_business_target
                    ? loanBusinessTargetOptions.find((item) => item.value === p_borrowing.loan_business_target).label
                    : 'ー'}
                </Typography>
                {p_borrowing.loan_business_target === '99' && (
                  <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                    〈その他の方は詳細〉
                    {p_borrowing.loan_business_target_other ? p_borrowing.loan_business_target_other : 'ー'}
                  </Typography>
                )}
              </Stack>
            )}

            {p_borrowing.category && p_borrowing.type === '2' && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈借入区分〉
                {p_borrowing.category
                  ? categoryOptions.find((item) => item.value === p_borrowing.category).label
                  : 'ー'}
              </Typography>
            )}

            {p_borrowing.borrowing_from_house_finance_agency && p_borrowing.type === '1' && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈住宅金融支援機構からの借入ですか？〉
                {p_borrowing.borrowing_from_house_finance_agency
                  ? houseFinanceAgency.find((item) => item.value === p_borrowing.borrowing_from_house_finance_agency)
                      .label
                  : 'ー'}
              </Typography>
            )}

            {p_borrowing.loan_start_date && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_borrowing.type === '2' ? '〈当初カード契約年月〉' : '〈当初借入年月〉'}
                {p_borrowing.loan_start_date ? formatJapanDate(p_borrowing.loan_start_date) : 'ー'}
              </Typography>
            )}

            {p_borrowing.loan_amount && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_borrowing.type === '2' ? '〈借入限度額〉' : '〈当初借入額〉'}
                {p_borrowing.loan_amount ? Number(p_borrowing.loan_amount).toLocaleString() : 'ー'}
                万円
              </Typography>
            )}

            {p_borrowing.curr_loan_balance_amount && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈現在の残高〉
                {p_borrowing.curr_loan_balance_amount
                  ? Number(p_borrowing.curr_loan_balance_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            )}

            {p_borrowing.annual_repayment_amount && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈年間返済額〉
                {p_borrowing.annual_repayment_amount
                  ? Number(p_borrowing.annual_repayment_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            )}

            {p_borrowing.card_expiry_date && p_borrowing.type === '2' && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈カード有効期限〉
                {p_borrowing.card_expiry_date ? formatJapanDate(p_borrowing.card_expiry_date) : 'ー'}
              </Typography>
            )}

            {p_borrowing.loan_end_date && p_borrowing.type !== '2' && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                {p_borrowing.type === '3' ? '〈最終返済年月〉' : '〈最終期限〉'}
                {p_borrowing.loan_end_date ? formatJapanDate(p_borrowing.loan_end_date) : 'ー'}
              </Typography>
            )}

            {p_borrowing.type === '3' && (
              <Stack>
                {p_borrowing.rental_room_num && (
                  <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                    {`〈賃貸戸（室）数〉${p_borrowing.rental_room_num}戸（室）`}
                  </Typography>
                )}
                {p_borrowing.common_housing && (
                  <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                    〈共同住宅〉
                    {p_borrowing.common_housing
                      ? commonHousingOptions.find((item) => item.value === p_borrowing.common_housing).label
                      : 'ー'}
                  </Typography>
                )}
              </Stack>
            )}

            {p_borrowing.estate_setting && p_borrowing.type !== '1' && p_borrowing.type !== '2' && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈不動産担保設定〉
                {p_borrowing.estate_setting
                  ? estateSettingOptions.find((item) => item.value === p_borrowing.estate_setting).label
                  : 'ー'}
              </Typography>
            )}

            {p_borrowing.scheduled_loan_payoff && !p_borrowing.type === '4' && (
              <Stack>
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  〈今回のお借入までに完済の予定はありますか？〉
                </Typography>
                {p_borrowing.scheduled_loan_payoff && (
                  <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                    {p_borrowing.scheduled_loan_payoff
                      ? scheduledLoanPayoffOptions.find((item) => item.value === p_borrowing.scheduled_loan_payoff)
                          .label
                      : 'ー'}
                  </Typography>
                )}
              </Stack>
            )}

            {p_borrowing.scheduled_loan_payoff_date && (
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈完済（予定）年月〉
                {p_borrowing.scheduled_loan_payoff_date
                  ? formatJapanDate(p_borrowing.scheduled_loan_payoff_date)
                  : 'ー'}
              </Typography>
            )}
          </Stack>
        </ApConfirmItemGroup>
      ))}
      {isMCJ &&
        p_application_headers.curr_borrowing_status === '1' &&
        p_borrowings.some((item) => item.scheduled_loan_payoff === '1') && (
          <Stack>
            <ApConfirmItemGroup label={'完済原資'}>
              <Stack spacing={1} alignItems={'start'}>
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  〈完済原資の種類〉
                  {p_application_headers.refund_source_type
                    ? p_application_headers.refund_source_type
                        .map((item) => refundSourceTypeOptions.find((i) => i.value === item).label)
                        .filter((item) => !!item)
                        .join(',')
                    : 'ー'}
                </Typography>
                {p_application_headers.refund_source_type.includes('99') && (
                  <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                    〈その他の方は詳細〉
                    {p_application_headers.refund_source_type_other
                      ? p_application_headers.refund_source_type_other
                      : 'ー'}
                  </Typography>
                )}
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  〈完済原資の内容〉
                  {p_application_headers.refund_source_content ? p_application_headers.refund_source_content : 'ー'}
                </Typography>
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  〈完済原資の金額〉
                  {p_application_headers.refund_source_amount
                    ? Number(p_application_headers.refund_source_amount).toLocaleString()
                    : 'ー'}
                </Typography>
              </Stack>
            </ApConfirmItemGroup>
            <ApConfirmItemGroup label={'今回の住宅取得後も継続する支払地代・支払家賃'}>
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                支払地代
              </Typography>
              {hasIncomeTotalizer && (
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  〈支払いをしている方〉
                  {p_application_headers.rent_to_be_paid_land_borrower
                    ? borrowerOptions.find((item) => item.value === p_application_headers.rent_to_be_paid_land_borrower)
                        .label
                    : 'ー'}
                </Typography>
              )}
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈月間の支払金額〉
                {p_application_headers.rent_to_be_paid_land
                  ? Number(p_application_headers.rent_to_be_paid_land).toLocaleString()
                  : 'ー'}
                円
              </Typography>

              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                支払家賃
              </Typography>
              {hasIncomeTotalizer && (
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  〈支払いをしている方〉
                  {p_application_headers.rent_to_be_paid_house_borrower
                    ? borrowerOptions.find(
                        (item) => item.value === p_application_headers.rent_to_be_paid_house_borrower
                      ).label
                    : 'ー'}
                </Typography>
              )}
              <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                〈月間の支払金額〉
                {p_application_headers.rent_to_be_paid_house
                  ? Number(p_application_headers.rent_to_be_paid_house).toLocaleString()
                  : 'ー'}
                円
              </Typography>
            </ApConfirmItemGroup>
          </Stack>
        )}
      {!agentSended && (
        <Stack alignItems={'center'} sx={{ py: 3 }}>
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={() =>
              navigate(isSalesPerson ? routeNames.adSalesPersonStep08Page.path : routeNames.apStep08Page.path)
            }
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
