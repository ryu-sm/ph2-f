import { ApConfirmGroup, ApConfirmItemGroup, ApLighterButton } from '@/components';
import { agentSendedSelector, applicationAtom, isMcjSelector } from '@/store';
import { formatJapanDate } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import {
  incomeOptions,
  industryOptions,
  maternityPaternityLeaveOptions,
  nursingLeaveOptions,
  occupationDetailOptions,
  occupationOptions,
  taxReturnOptions,
  taxReturnReasonsOptions,
} from './options';

export const ApStep05Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const { p_applicant_persons__1 } = useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);
  const isMCJ = useRecoilValue(isMcjSelector);

  return (
    <ApConfirmGroup stepIndex={stepIndex} label={`：収入合算者の職業`}>
      <ApConfirmItemGroup label={'ご職業'}>
        <Stack spacing={1} alignItems={'start'}>
          <Typography variant="modal_label" color={'text.main'}>
            {p_applicant_persons__1.office_occupation
              ? occupationOptions.find((item) => item.value === p_applicant_persons__1.office_occupation)?.label
              : 'ー'}
          </Typography>
          {p_applicant_persons__1.office_occupation === '99' && (
            <Typography variant="modal_label" color={'text.main'}>
              〈その他の詳細〉
              {p_applicant_persons__1.office_occupation_other ? p_applicant_persons__1.office_occupation_other : 'ー'}
            </Typography>
          )}
        </Stack>
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'業種'}>
        <Stack spacing={1} alignItems={'start'}>
          <Typography variant="modal_label" color={'text.main'}>
            {p_applicant_persons__1.office_industry
              ? industryOptions.find((item) => item.value === p_applicant_persons__1.office_industry)?.label
              : 'ー'}
          </Typography>
          {p_applicant_persons__1.office_industry === '99' && (
            <Typography variant="modal_label" color={'text.main'}>
              〈その他の詳細〉
              {p_applicant_persons__1.office_industry_other ? p_applicant_persons__1.office_industry_other : 'ー'}
            </Typography>
          )}
        </Stack>
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'職種'}>
        <Stack spacing={1} alignItems={'start'}>
          <Typography variant="modal_label" color={'text.main'}>
            {p_applicant_persons__1.office_occupation_detail
              ? occupationDetailOptions.find((item) => item.value === p_applicant_persons__1.office_occupation_detail)
                  ?.label
              : 'ー'}
          </Typography>
          {p_applicant_persons__1.office_occupation_detail === '99' && (
            <Typography variant="modal_label" color={'text.main'}>
              〈その他の詳細〉
              {p_applicant_persons__1.office_occupation_detail_other
                ? p_applicant_persons__1.office_occupation_detail_other
                : 'ー'}
            </Typography>
          )}
        </Stack>
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'勤務先名'}>
        {p_applicant_persons__1.office_name_kanji ? p_applicant_persons__1.office_name_kanji : 'ー'}
      </ApConfirmItemGroup>
      {p_applicant_persons__1.office_occupation !== '5' && (
        <ApConfirmItemGroup label={'所属部課'}>
          {p_applicant_persons__1.office_department ? p_applicant_persons__1.office_department : 'ー'}
        </ApConfirmItemGroup>
      )}
      <ApConfirmItemGroup label={'勤務先の電話番号'}>
        {p_applicant_persons__1.office_phone ? p_applicant_persons__1.office_phone : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'勤務先の住所'}>
        {p_applicant_persons__1.office_postal_code ? (
          <Stack spacing={1} alignItems={'start'}>
            <Typography variant="modal_label" color={'text.main'}>
              {`〒${p_applicant_persons__1.office_postal_code}`}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              {`${p_applicant_persons__1.office_prefecture_kanji}${p_applicant_persons__1.office_city_kanji}${p_applicant_persons__1.office_district_kanji}`}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              {p_applicant_persons__1.office_other_address_kanji}
            </Typography>
          </Stack>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'従業員数'}>
        {p_applicant_persons__1.office_employee_num
          ? Number(p_applicant_persons__1.office_employee_num).toLocaleString()
          : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'入社年月'}>
        {p_applicant_persons__1.office_joining_date
          ? formatJapanDate(p_applicant_persons__1.office_joining_date)
          : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'ご年収'}>
        {p_applicant_persons__1.last_year_income ||
        p_applicant_persons__1.last_year_bonus_income ||
        p_applicant_persons__1.income_sources.length ||
        p_applicant_persons__1.tax_return ||
        p_applicant_persons__1.tax_return_reasons.length ? (
          <Stack spacing={1} alignItems={'start'}>
            <Typography variant="modal_label" color={'text.main'}>
              〈前年度年収〉
              {p_applicant_persons__1.last_year_income
                ? `${Number(p_applicant_persons__1.last_year_income).toLocaleString()}万円`
                : 'ー'}
            </Typography>
            {isMCJ && (
              <Typography variant="modal_label" color={'text.main'}>
                〈うち、ボーナス（MCJ固有項目）〉
                {p_applicant_persons__1.last_year_bonus_income
                  ? `${Number(p_applicant_persons__1.last_year_bonus_income).toLocaleString()}万円`
                  : 'ー'}
              </Typography>
            )}
            {isMCJ && (
              <Typography variant="modal_label" color={'text.main'}>
                〈前々年度の年収（MCJ固有項目）〉
                {p_applicant_persons__1.before_last_year_income
                  ? `${Number(p_applicant_persons__1.before_last_year_income).toLocaleString()}万円`
                  : 'ー'}
              </Typography>
            )}
            <Typography variant="modal_label" color={'text.main'}>
              〈収入源〉
              {p_applicant_persons__1.income_sources
                ? p_applicant_persons__1.income_sources
                    .map((value) => incomeOptions.find((item) => item.value === value)?.label)
                    .join('、')
                : 'ー'}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              〈確定申告をしていますか？〉
              {p_applicant_persons__1.tax_return
                ? taxReturnOptions.find((item) => item.value === p_applicant_persons__1.tax_return)?.label
                : 'ー'}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              〈確定申告の理由〉
              {p_applicant_persons__1.tax_return_reasons
                ? p_applicant_persons__1.tax_return_reasons
                    .map((value) => taxReturnReasonsOptions.find((item) => item.value === value)?.label)
                    .join('、')
                : 'ー'}
            </Typography>
            {p_applicant_persons__1.tax_return_reasons.includes('99') && (
              <Typography variant="modal_label" color={'text.main'}>
                〈その他の詳細〉
                {p_applicant_persons__1.tax_return_reason_other ? p_applicant_persons__1.tax_return_reason_other : 'ー'}
              </Typography>
            )}
          </Stack>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'現在、出向（派遣）していますか？'}>
        {p_applicant_persons__1.transfer_office ? (
          p_applicant_persons__1.transfer_office === '1' ? (
            <Stack spacing={1} alignItems={'start'}>
              {p_applicant_persons__1.transfer_office_name_kanji && (
                <Typography variant="modal_label" color={'text.main'}>
                  〈出向（派遣）勤務先名〉
                  {p_applicant_persons__1.transfer_office_name_kanji
                    ? p_applicant_persons__1.transfer_office_name_kanji
                    : 'ー'}
                </Typography>
              )}

              {p_applicant_persons__1.transfer_office_name_kana && (
                <Typography variant="modal_label" color={'text.main'}>
                  〈出向（派遣）勤務先名（フリガナ）〉
                  {p_applicant_persons__1.transfer_office_name_kana
                    ? p_applicant_persons__1.transfer_office_name_kana
                    : 'ー'}
                </Typography>
              )}

              {p_applicant_persons__1.transfer_office_phone && (
                <Typography variant="modal_label" color={'text.main'}>
                  〈出向（派遣）先 電話番号〉
                  {p_applicant_persons__1.transfer_office_phone ? p_applicant_persons__1.transfer_office_phone : 'ー'}
                </Typography>
              )}
              <Typography variant="sp_value_text" color="b_333">
                〈出向（派遣）先　住所〉
                {p_applicant_persons__1.transfer_office_postal_code ? (
                  <Stack spacing={1} alignItems={'start'} sx={{ px: 4, pt: 1 }}>
                    <Typography variant="modal_label" color={'text.main'}>
                      {`〒${p_applicant_persons__1.transfer_office_postal_code}`}
                    </Typography>
                    <Typography variant="modal_label" color={'text.main'}>
                      {`${p_applicant_persons__1.transfer_office_prefecture_kanji}${p_applicant_persons__1.transfer_office_city_kanji}${p_applicant_persons__1.transfer_office_district_kanji}`}
                    </Typography>
                    <Typography variant="modal_label" color={'text.main'}>
                      {p_applicant_persons__1.transfer_office_other_address_kanji}
                    </Typography>
                  </Stack>
                ) : (
                  'ー'
                )}
              </Typography>
            </Stack>
          ) : (
            'いいえ'
          )
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'産休・育休の取得状況'}>
        {p_applicant_persons__1.maternity_paternity_leave ? (
          <Stack spacing={1} alignItems={'start'}>
            <Typography variant="modal_label" color={'text.main'}>
              {p_applicant_persons__1.maternity_paternity_leave
                ? maternityPaternityLeaveOptions.find(
                    (item) => item.value === p_applicant_persons__1.maternity_paternity_leave
                  )?.label
                : 'ー'}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              〈取得開始時期〉
              {p_applicant_persons__1.maternity_paternity_leave_start_date
                ? formatJapanDate(p_applicant_persons__1.maternity_paternity_leave_start_date)
                : 'ー'}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              〈取得終了時期〉
              {p_applicant_persons__1.maternity_paternity_leave_end_date
                ? formatJapanDate(p_applicant_persons__1.maternity_paternity_leave_end_date)
                : 'ー'}
            </Typography>
          </Stack>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      {isMCJ && (
        <ApConfirmItemGroup label={'介護休暇の取得状況（MCJ固有項目）'}>
          {p_applicant_persons__1.nursing_leave ? (
            <Stack spacing={1} alignItems={'start'}>
              <Typography variant="modal_label" color={'text.main'}>
                {p_applicant_persons__1.nursing_leave
                  ? nursingLeaveOptions.find((item) => item.value === p_applicant_persons__1.nursing_leave)?.label
                  : 'ー'}
              </Typography>
            </Stack>
          ) : (
            'ー'
          )}
        </ApConfirmItemGroup>
      )}
      {!agentSended && (
        <Stack alignItems={'center'} sx={{ py: 3 }}>
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={() => navigate(routeNames.apStep05Page.path)}
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
