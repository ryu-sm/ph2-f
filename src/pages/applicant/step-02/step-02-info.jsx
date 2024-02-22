import { ApConfirmGroup, ApConfirmItemGroup, ApLighterButton } from '@/components';
import { useBankMaster } from '@/hooks/use-bank-master';
import { agentSendedSelector, applicationAtom } from '@/store';
import { formatJapanDate } from '@/utils';
import { Box, Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { genderOptions, nationalityOptions } from './options';

export const ApStep02Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const {
    p_applicant_persons__0__last_name_kanji,
    p_applicant_persons__0__first_name_kanji,
    p_applicant_persons__0__last_name_kana,
    p_applicant_persons__0__first_name_kana,
    p_applicant_persons__0__gender,
    p_applicant_persons__0__birthday,
    p_applicant_persons__0__nationality,
    p_applicant_persons__0__mobile_phone,
    p_applicant_persons__0__home_phone,
    p_applicant_persons__0__postal_code,
    p_applicant_persons__0__prefecture_kanji,
    p_applicant_persons__0__city_kanji,
    p_applicant_persons__0__district_kanji,
    p_applicant_persons__0__other_address_kanji,
    p_applicant_persons__0__email,
  } = useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);

  return (
    <ApConfirmGroup label={`STEP${stepIndex}：あなたの情報`}>
      <ApConfirmItemGroup label={'お名前'}>
        <Stack spacing={1} alignItems={'start'}>
          <Typography variant="modal_label" color={'text.main'}>
            {`${p_applicant_persons__0__last_name_kanji} ${p_applicant_persons__0__first_name_kanji} 様`}
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            {`${p_applicant_persons__0__last_name_kana} ${p_applicant_persons__0__first_name_kana} 様`}
          </Typography>
        </Stack>
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'性別'}>
        {p_applicant_persons__0__gender
          ? genderOptions.find((item) => item.value === p_applicant_persons__0__gender)?.label
          : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'生年月日'}>
        {p_applicant_persons__0__birthday ? formatJapanDate(p_applicant_persons__0__birthday, true) : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'現在の国籍'}>
        {p_applicant_persons__0__nationality
          ? nationalityOptions.find((item) => item.value === p_applicant_persons__0__nationality)?.label
          : 'ー'}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'電話番号'}>
        <Stack spacing={1} alignItems={'start'}>
          <Typography variant="modal_label" color={'text.main'}>
            {p_applicant_persons__0__mobile_phone ? `〈携帯〉${p_applicant_persons__0__mobile_phone}` : 'ー'}
          </Typography>
          <Typography variant="modal_label" color={'text.main'}>
            {p_applicant_persons__0__home_phone ? `〈自宅〉${p_applicant_persons__0__home_phone}` : 'ー'}
          </Typography>
        </Stack>
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'現住所'}>
        {p_applicant_persons__0__postal_code ? (
          <Stack spacing={1} alignItems={'start'}>
            <Typography variant="modal_label" color={'text.main'}>
              {`〒${p_applicant_persons__0__postal_code}`}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              {`${p_applicant_persons__0__prefecture_kanji}${p_applicant_persons__0__city_kanji}${p_applicant_persons__0__district_kanji}`}
            </Typography>
            <Typography variant="modal_label" color={'text.main'}>
              {p_applicant_persons__0__other_address_kanji}
            </Typography>
          </Stack>
        ) : (
          'ー'
        )}
      </ApConfirmItemGroup>
      <ApConfirmItemGroup label={'ご連絡先用メールアドレス'}>
        {p_applicant_persons__0__email ? p_applicant_persons__0__email : 'ー'}
      </ApConfirmItemGroup>
      {!agentSended && (
        <Stack alignItems={'center'} sx={{ py: 3 }}>
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={() => navigate(routeNames.apStep02Page.path)}
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
