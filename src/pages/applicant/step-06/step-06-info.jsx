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

export const ApStep06Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const { p_join_guarantors } = useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);

  return (
    <Stack sx={{ width: 1 }}>
      <ApConfirmGroup label={`STEP${stepIndex}担保提供者`}>
        {p_join_guarantors.map((p_join_guarantor, index) => (
          <ApConfirmItemGroup key={index} label={`担保提供者 ${index + 1}人目`}>
            <Stack spacing={1} alignItems={'start'}>
              {(p_join_guarantor.last_name_kanji || p_join_guarantor.first_name_kanji) && (
                <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                  〈担保提供者の氏名〉
                  {p_join_guarantor.last_name_kanji || p_join_guarantor.first_name_kanji
                    ? `${p_join_guarantor.last_name_kanji} ${p_join_guarantor.first_name_kanji} 様`
                    : 'ー'}
                </Typography>
              )}
              {(p_join_guarantor.last_name_kana || p_join_guarantor.first_name_kana) && (
                <Stack>
                  <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                    〈担保提供者の氏名（フリガナ）〉
                  </Typography>
                  <Typography variant="modal_label" color={'text.main'} textAlign={'start'}>
                    {'　'}
                    {p_join_guarantor.last_name_kana || p_join_guarantor.first_name_kana
                      ? `${p_join_guarantor.last_name_kana} ${p_join_guarantor.first_name_kana} 様`
                      : 'ー'}
                  </Typography>
                </Stack>
              )}

              {p_join_guarantor.gender && (
                <Typography variant="modal_label" color={'text.main'}>
                  〈性別〉
                  {p_join_guarantor.gender
                    ? genderOptions.find((item) => item.value === p_join_guarantor.gender)?.label
                    : 'ー'}
                </Typography>
              )}
              {p_join_guarantor.rel_to_applicant_a_name && (
                <Typography variant="modal_label" color={'text.main'}>
                  〈続柄〉
                  {p_join_guarantor.rel_to_applicant_a_name ? p_join_guarantor.rel_to_applicant_a_name : 'ー'}
                </Typography>
              )}
              {p_join_guarantor.birthday && (
                <Typography variant="modal_label" color={'text.main'}>
                  〈生年月日〉
                  {p_join_guarantor.birthday ? formatJapanDate(p_join_guarantor.birthday, true) : 'ー'}
                </Typography>
              )}
              {p_join_guarantor.mobile_phone || p_join_guarantor.home_phone ? (
                <Stack spacing={1} alignItems={'start'}>
                  <Typography variant="modal_label" color={'text.main'}>
                    〈電話番号〉
                  </Typography>
                  <Stack spacing={1} alignItems={'start'} sx={{ px: 4 }}>
                    {p_join_guarantor.mobile_phone && (
                      <Typography variant="modal_label" color={'text.main'}>
                        〈携帯〉：
                        {p_join_guarantor.mobile_phone ? p_join_guarantor.mobile_phone : 'ー'}
                      </Typography>
                    )}
                    {p_join_guarantor.home_phone && (
                      <Typography variant="modal_label" color={'text.main'}>
                        〈自宅〉：
                        {p_join_guarantor.home_phone ? p_join_guarantor.home_phone : 'ー'}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              ) : (
                <Typography variant="modal_label" color={'text.main'}>
                  〈電話番号〉ー
                </Typography>
              )}

              <Typography variant="sp_value_text" color="b_333">
                〈担保提供者の住所〉
                {p_join_guarantor.postal_code ? (
                  <Stack spacing={1} alignItems={'start'} sx={{ px: 4, pt: 1 }}>
                    <Typography variant="modal_label" color={'text.main'}>
                      {`〒${p_join_guarantor.postal_code}`}
                    </Typography>
                    <Typography variant="modal_label" color={'text.main'}>
                      {`${p_join_guarantor.prefecture_kanji}${p_join_guarantor.city_kanji}${p_join_guarantor.district_kanji}`}
                    </Typography>
                    <Typography variant="modal_label" color={'text.main'}>
                      {p_join_guarantor.other_address_kanji}
                    </Typography>
                  </Stack>
                ) : (
                  'ー'
                )}
              </Typography>
            </Stack>
          </ApConfirmItemGroup>
        ))}
      </ApConfirmGroup>

      {!agentSended && (
        <Stack alignItems={'center'} sx={{ width: 1, py: 3 }}>
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={() => navigate(routeNames.apStep06Page.path)}
          >
            <Stack spacing={'6px'} direction={'row'} alignItems={'center'}>
              <Icons.ApEditorIcon />
              <Typography variant="radio_checkbox_button">{`STEP${stepIndex}を修正する`}</Typography>
            </Stack>
          </ApLighterButton>
        </Stack>
      )}
    </Stack>
  );
};
