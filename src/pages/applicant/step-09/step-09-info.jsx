import {
  ApConfirmGroup,
  ApConfirmItemGroup,
  ApLighterButton,
  ApErrorScroll,
  ApItemGroup,
  ApNumberInputField,
  ApPageTitle,
  ApStarHelp,
  ApTextInputField,
} from '@/components';
import { useBankMaster } from '@/hooks/use-bank-master';
import { agentSendedSelector, applicationAtom, isMcjSelector } from '@/store';
import { formatJapanDate } from '@/utils';
import { Box, Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';

export const ApStep09Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const {
    p_application_headers__required_funds_land_amount,
    p_application_headers__required_funds_house_amount,
    p_application_headers__required_funds_accessory_amount,
    p_application_headers__required_funds_additional_amount,
    p_application_headers__required_funds_refinance_loan_balance,
    p_application_headers__required_funds_upgrade_amount,
    p_application_headers__required_funds_loan_plus_amount,
    p_application_headers__required_funds_total_amount,
    p_application_headers__funding_saving_amount,
    p_application_headers__funding_estate_sale_amount,
    p_application_headers__funding_other_saving_amount,
    p_application_headers__funding_relative_donation_amount,
    p_application_headers__funding_loan_amount,
    p_application_headers__funding_pair_loan_amount,
    p_application_headers__funding_other_amount,
    p_application_headers__funding_other_amount_detail,
    p_application_headers__funding_total_amount,
    // STEP01
    p_application_headers__loan_target,
    p_application_headers__loan_type,
    p_application_headers__loan_plus,
  } = useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);
  const isMCJ = useRecoilValue(isMcjSelector);

  const bankMaster = useBankMaster();
  return (
    <ApConfirmGroup label={`STEP${stepIndex}：資金計画`}>
      <Stack spacing={'1px'} direction={'row'} justifyContent={'space-between'} sx={{ bgcolor: 'primary.60' }}>
        <Stack sx={{ width: '50%' }}>
          <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.main' }}>
            <Typography variant="form_item_label" color="white" textAlign={'center'}>
              必要資金
            </Typography>
          </Stack>
          <Stack flex={1} sx={{ bgcolor: 'white' }}>
            {p_application_headers__loan_target === '6' && (
              <ApItemGroup
                optional
                label={
                  <Typography
                    variant="form_item_label"
                    sx={{ fontWeight: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                  >
                    {'土地'}
                  </Typography>
                }
                pb={3}
                px={2}
              >
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers__required_funds_land_amount
                    ? Number(p_application_headers__required_funds_land_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}
            {['1', '2', '3', '4', '5', '6'].includes(p_application_headers__loan_target) && (
              <ApItemGroup
                optional
                label={
                  ['1', '2'].includes(p_application_headers__loan_target)
                    ? '物件価格'
                    : ['3', '4'].includes(p_application_headers__loan_target)
                    ? 'マンション価格'
                    : '建物'
                }
                labelFontSize={13}
                pb={3}
                px={2}
              >
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers__required_funds_house_amount
                    ? Number(p_application_headers__required_funds_house_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}

            {['5', '6'].includes(p_application_headers__loan_target) && (
              <ApItemGroup optional label={'付帯設備'} labelFontSize={13} pb={3} px={2}>
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers__required_funds_accessory_amount
                    ? Number(p_application_headers__required_funds_accessory_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}

            {p_application_headers__loan_target === '8' && (
              <ApItemGroup optional label={'増改築費'} labelFontSize={13} pb={3} px={2}>
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers__required_funds_upgrade_amount
                    ? Number(p_application_headers__required_funds_upgrade_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}

            {['7', '8'].includes(p_application_headers__loan_target) && (
              <ApItemGroup optional label={'借換対象ローン残債'} labelFontSize={13} pb={3} px={2}>
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers__required_funds_refinance_loan_balance
                    ? Number(p_application_headers__required_funds_refinance_loan_balance).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}

            <ApItemGroup optional label={'諸費用等'} labelFontSize={13} pb={3} px={2}>
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers__required_funds_additional_amount
                  ? Number(p_application_headers__required_funds_additional_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>
            {p_application_headers__loan_plus === '1' && (
              <ApItemGroup
                optional
                label={
                  <Typography variant="form_item_label" sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}>
                    {'住宅ローンプラス利用'}
                  </Typography>
                }
                pb={3}
                px={2}
              >
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers__required_funds_loan_plus_amount
                    ? Number(p_application_headers__required_funds_loan_plus_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}
          </Stack>
        </Stack>
        <Stack sx={{ width: '50%' }}>
          <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.main' }}>
            <Typography variant="form_item_label" color="white" textAlign={'center'}>
              調達資金
            </Typography>
          </Stack>
          <Stack flex={1} sx={{ bgcolor: 'white' }}>
            <ApItemGroup
              label={
                <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                  <Typography variant="form_item_label" sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}>
                    預貯金
                  </Typography>
                  {p_application_headers__loan_type === '2' && (
                    <Typography variant="note" color={'text.main'}>
                      ※お二人分
                    </Typography>
                  )}
                </Stack>
              }
              pb={3}
              px={2}
            >
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers__funding_saving_amount
                  ? Number(p_application_headers__funding_saving_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>

            <ApItemGroup
              label={
                <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                  <Typography variant="form_item_label" sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}>
                    不動産売却代金
                  </Typography>
                  {p_application_headers__loan_type === '2' && (
                    <Typography variant="note" color={'text.main'}>
                      ※お二人分
                    </Typography>
                  )}
                </Stack>
              }
              pb={3}
              px={2}
            >
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers__funding_estate_sale_amount
                  ? Number(p_application_headers__funding_estate_sale_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>

            <ApItemGroup
              label={
                <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                  <Typography variant="form_item_label" sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}>
                    {['7', '8'].includes(p_application_headers__loan_target)
                      ? 'その他（有価証券等）'
                      : '有価証券売却など'}
                  </Typography>
                  {p_application_headers__loan_type === '2' && (
                    <Typography variant="note" color={'text.main'}>
                      ※お二人分
                    </Typography>
                  )}
                </Stack>
              }
              pb={3}
              px={2}
            >
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers__funding_other_saving_amount
                  ? Number(p_application_headers__funding_other_saving_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>

            <ApItemGroup
              label={
                <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                  <Typography variant="form_item_label" sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}>
                    親族からの贈与
                  </Typography>
                  {p_application_headers__loan_type === '2' && (
                    <Typography variant="note" color={'text.main'}>
                      ※お二人が受ける贈与
                    </Typography>
                  )}
                </Stack>
              }
              pb={3}
              px={2}
            >
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers__funding_relative_donation_amount
                  ? Number(p_application_headers__funding_relative_donation_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>

            <ApItemGroup label={'本件ローン'} labelFontSize={13} pb={3} px={2}>
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers__funding_loan_amount
                  ? Number(p_application_headers__funding_loan_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>
            {p_application_headers__loan_type === '2' && (
              <ApItemGroup label={'ペアローン'} labelFontSize={13} pb={3} px={2}>
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers__funding_pair_loan_amount
                    ? Number(p_application_headers__funding_pair_loan_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}
            <ApItemGroup label={'その他'} labelFontSize={13} pb={3} px={2}>
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers__funding_other_amount
                  ? Number(p_application_headers__funding_other_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={'1px'} direction={'row'} justifyContent={'space-between'} sx={{ bgcolor: 'primary.60' }}>
        <Stack sx={{ width: '50%' }}>
          <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.60' }}>
            <Typography variant="form_item_label" color="white">
              {'必要資金　合計'}
            </Typography>
          </Stack>
          <Stack sx={{ px: 2, py: 1, bgcolor: 'white' }}>
            <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
              {p_application_headers__required_funds_total_amount
                ? Number(p_application_headers__required_funds_total_amount).toLocaleString()
                : 'ー'}
              万円
            </Typography>
          </Stack>
        </Stack>
        <Stack sx={{ width: '50%' }}>
          <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.60' }}>
            <Typography variant="form_item_label" color="white">
              {'調達資金　合計'}
            </Typography>
          </Stack>
          <Stack sx={{ px: 2, py: 1, bgcolor: 'white' }}>
            <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
              {p_application_headers__funding_total_amount
                ? Number(p_application_headers__funding_total_amount).toLocaleString()
                : 'ー'}
              万円
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {!agentSended && (
        <Stack alignItems={'center'} sx={{ py: 3 }}>
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={() => navigate(routeNames.apStep09Page.path)}
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
