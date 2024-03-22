import { ApConfirmGroup, ApConfirmItemGroup, ApImgItem, ApLighterButton } from '@/components';
import { agentSendedSelector, applicationAtom } from '@/store';
import { formatJapanDate } from '@/utils';
import { Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { genderOptions, nationalityOptions } from './options';
import { useIsSalesPerson } from '@/hooks';

export const ApStep02Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const { p_applicant_persons__0, p_uploaded_files } = useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);

  return (
    <ApConfirmGroup stepIndex={stepIndex} label={'：あなたの情報'}>
      <ApConfirmItemGroup label={'お名前'}>
        <Stack spacing={1} alignItems={'start'}>
          <Typography variant="modal_label" color={'text.main'}>
            {`${p_applicant_persons__0.last_name_kanji} ${p_applicant_persons__0.first_name_kanji} 様`}
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            {`${p_applicant_persons__0.last_name_kana} ${p_applicant_persons__0.first_name_kana} 様`}
          </Typography>
        </Stack>
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'性別'}>
        {p_applicant_persons__0.gender
          ? genderOptions.find((item) => item.value === p_applicant_persons__0.gender)?.label
          : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'生年月日'}>
        {p_applicant_persons__0.birthday ? formatJapanDate(p_applicant_persons__0.birthday, true) : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'現在の国籍'}>
        <Stack spacing={3}>
          {p_applicant_persons__0.nationality
            ? nationalityOptions.find((item) => item.value === p_applicant_persons__0.nationality)?.label
            : 'ー'}
        </Stack>
      </ApConfirmItemGroup>
      {p_applicant_persons__0.nationality === '2' && (
        <ApConfirmItemGroup label={'在留カードまたは特別永住者証明書を添付してください。'}>
          <Stack spacing={3}>
            <Stack spacing={'6px'}>
              <Typography variant="label" color={'text.main'}>
                〈表面〉
              </Typography>
              {p_uploaded_files.p_applicant_persons__0__H__a.length ? (
                <ApImgItem files={p_uploaded_files.p_applicant_persons__0__H__a} />
              ) : (
                <Typography variant="label" color={'gray.150'}>
                  〈 書類はまだ添付されません。〉
                </Typography>
              )}
            </Stack>
            <Stack spacing={'6px'}>
              <Typography variant="label" color={'text.main'}>
                〈裏面〉
              </Typography>
              {p_uploaded_files.p_applicant_persons__0__H__b.length ? (
                <ApImgItem files={p_uploaded_files.p_applicant_persons__0__H__b} />
              ) : (
                <Typography variant="label" color={'gray.150'}>
                  〈 書類はまだ添付されません。〉
                </Typography>
              )}
            </Stack>
          </Stack>
        </ApConfirmItemGroup>
      )}

      <ApConfirmItemGroup label={'電話番号'}>
        <Stack spacing={1} alignItems={'start'}>
          <Typography variant="modal_label" textAlign={'start'} color={'text.main'}>
            {p_applicant_persons__0.mobile_phone ? `〈携帯〉${p_applicant_persons__0.mobile_phone}` : '〈携帯〉ー'}
          </Typography>
          <Typography variant="modal_label" textAlign={'start'} color={'text.main'}>
            {p_applicant_persons__0.home_phone ? `〈自宅〉${p_applicant_persons__0.home_phone}` : '〈自宅〉ー'}
          </Typography>
        </Stack>
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'現住所'}>
        {p_applicant_persons__0.postal_code ? (
          <Stack spacing={1} alignItems={'start'}>
            <Typography variant="modal_label" textAlign={'start'} color={'text.main'}>
              {`〒${p_applicant_persons__0.postal_code}`}
            </Typography>
            <Typography variant="modal_label" textAlign={'start'} color={'text.main'}>
              {`${p_applicant_persons__0.prefecture_kanji}${p_applicant_persons__0.city_kanji}${p_applicant_persons__0.district_kanji}`}
            </Typography>
            <Typography variant="modal_label" textAlign={'start'} color={'text.main'}>
              {p_applicant_persons__0.other_address_kanji}
            </Typography>
          </Stack>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'ご連絡先用メールアドレス'}>
        {p_applicant_persons__0.email ? p_applicant_persons__0.email : 'ー'}
      </ApConfirmItemGroup>
      {!agentSended && (
        <Stack alignItems={'center'} sx={{ py: 3 }}>
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={() =>
              navigate(isSalesPerson ? routeNames.adSalesPersonStep02Page.path : routeNames.apStep02Page.path)
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
