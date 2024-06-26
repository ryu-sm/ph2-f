import { ApConfirmGroup, ApLighterButton, ApItemGroup } from '@/components';
import { authAtom, localApplication } from '@/store';
import { Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { useIsSalesPerson } from '@/hooks';
import { useMemo } from 'react';

export const ApStep09Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const { p_application_headers } = useRecoilValue(localApplication);
  const { agentSended } = useRecoilValue(authAtom);

  const required_funds_total_amount = useMemo(() => {
    return (
      Number(p_application_headers.required_funds_land_amount.replaceAll(',', '')) +
      Number(p_application_headers.required_funds_house_amount.replaceAll(',', '')) +
      Number(p_application_headers.required_funds_accessory_amount.replaceAll(',', '')) +
      Number(p_application_headers.required_funds_upgrade_amount.replaceAll(',', '')) +
      Number(p_application_headers.required_funds_refinance_loan_balance.replaceAll(',', '')) +
      Number(p_application_headers.required_funds_additional_amount.replaceAll(',', '')) +
      Number(p_application_headers.required_funds_loan_plus_amount.replaceAll(',', ''))
    );
  }, [p_application_headers]);

  const funding_total_amount = useMemo(() => {
    return (
      Number(p_application_headers.funding_saving_amount.replaceAll(',', '')) +
      Number(p_application_headers.funding_estate_sale_amount.replaceAll(',', '')) +
      Number(p_application_headers.funding_other_saving_amount.replaceAll(',', '')) +
      Number(p_application_headers.funding_relative_donation_amount.replaceAll(',', '')) +
      Number(p_application_headers.funding_loan_amount.replaceAll(',', '')) +
      Number(p_application_headers.funding_pair_loan_amount.replaceAll(',', '')) +
      Number(p_application_headers.funding_other_amount.replaceAll(',', ''))
    );
  }, [p_application_headers]);

  return (
    <ApConfirmGroup stepIndex={stepIndex} label={`：資金計画`}>
      <Stack
        spacing={'1px'}
        direction={'row'}
        justifyContent={'space-between'}
        sx={{ bgcolor: 'primary.60', pt: '1px' }}
      >
        <Stack sx={{ width: '50%' }}>
          <Stack sx={{ px: 4, py: 1, bgcolor: 'primary.main' }}>
            <Typography variant="form_item_label" color="white" textAlign={'center'}>
              必要資金
            </Typography>
          </Stack>
          <Stack flex={1} sx={{ bgcolor: 'white' }}>
            {p_application_headers.loan_target === '6' && (
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
                  {p_application_headers.required_funds_land_amount
                    ? Number(p_application_headers.required_funds_land_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}
            {['1', '2', '3', '4', '5', '6'].includes(p_application_headers.loan_target) && (
              <ApItemGroup
                optional
                label={
                  ['1', '2'].includes(p_application_headers.loan_target)
                    ? '物件価格'
                    : ['3', '4'].includes(p_application_headers.loan_target)
                    ? 'マンション価格'
                    : '建物'
                }
                labelFontSize={13}
                pb={3}
                px={2}
              >
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers.required_funds_house_amount
                    ? Number(p_application_headers.required_funds_house_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}

            {['5', '6'].includes(p_application_headers.loan_target) && (
              <ApItemGroup optional label={'付帯設備'} labelFontSize={13} pb={3} px={2}>
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers.required_funds_accessory_amount
                    ? Number(p_application_headers.required_funds_accessory_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}

            {p_application_headers.loan_target === '8' && (
              <ApItemGroup optional label={'増改築費'} labelFontSize={13} pb={3} px={2}>
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers.required_funds_upgrade_amount
                    ? Number(p_application_headers.required_funds_upgrade_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}

            {['7', '8'].includes(p_application_headers.loan_target) && (
              <ApItemGroup optional label={'借換対象ローン残債'} labelFontSize={13} pb={3} px={2}>
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers.required_funds_refinance_loan_balance
                    ? Number(p_application_headers.required_funds_refinance_loan_balance).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}

            <ApItemGroup optional label={'諸費用等'} labelFontSize={13} pb={3} px={2}>
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers.required_funds_additional_amount
                  ? Number(p_application_headers.required_funds_additional_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>
            {p_application_headers.loan_plus === '1' && (
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
                  {p_application_headers.required_funds_loan_plus_amount
                    ? Number(p_application_headers.required_funds_loan_plus_amount).toLocaleString()
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
                  {p_application_headers.loan_type === '2' && (
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
                {p_application_headers.funding_saving_amount
                  ? Number(p_application_headers.funding_saving_amount).toLocaleString()
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
                  {p_application_headers.loan_type === '2' && (
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
                {p_application_headers.funding_estate_sale_amount
                  ? Number(p_application_headers.funding_estate_sale_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>

            <ApItemGroup
              label={
                <Stack spacing={1}>
                  <Stack>
                    <Typography
                      variant="form_item_label"
                      sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}
                    >
                      {['7', '8'].includes(p_application_headers.loan_target)
                        ? 'その他（有価証券等）'
                        : '有価証券売却など'}
                    </Typography>
                  </Stack>
                  <Stack>
                    {p_application_headers.loan_type === '2' && (
                      <Typography variant="note" color={'text.main'}>
                        ※お二人分
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              }
              pb={3}
              px={2}
            >
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers.funding_other_saving_amount
                  ? Number(p_application_headers.funding_other_saving_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>

            <ApItemGroup
              label={
                <Stack spacing={1}>
                  <Typography variant="form_item_label" sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}>
                    親族からの贈与
                  </Typography>
                  {p_application_headers.loan_type === '2' && (
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
                {p_application_headers.funding_relative_donation_amount
                  ? Number(p_application_headers.funding_relative_donation_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>

            <ApItemGroup label={'本件ローン'} labelFontSize={13} pb={3} px={2}>
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers.funding_loan_amount
                  ? Number(p_application_headers.funding_loan_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
            </ApItemGroup>
            {p_application_headers.loan_type === '2' && (
              <ApItemGroup label={'ペアローン'} labelFontSize={13} pb={3} px={2}>
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers.funding_pair_loan_amount
                    ? Number(p_application_headers.funding_pair_loan_amount).toLocaleString()
                    : 'ー'}
                  万円
                </Typography>
              </ApItemGroup>
            )}
            <ApItemGroup
              label={
                <Stack spacing={1} direction={'row'} alignItems={'flex-end'}>
                  <Typography variant="form_item_label" sx={{ fontSize: 13, color: 'text.main', whiteSpace: 'nowrap' }}>
                    その他
                  </Typography>
                  {p_application_headers.loan_type === '2' && (
                    <Typography variant="note" color={'text.main'}>
                      ※お二人分
                    </Typography>
                  )}
                </Stack>
              }
              labelFontSize={13}
              pb={3}
              px={2}
            >
              <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                {p_application_headers.funding_other_amount
                  ? Number(p_application_headers.funding_other_amount).toLocaleString()
                  : 'ー'}
                万円
              </Typography>
              {Number(p_application_headers.funding_other_amount) > 0 && (
                <Typography variant="modal_label" color={'text.main'} textAlign={'end'}>
                  {p_application_headers.funding_other_amount_detail || 'ー'}
                </Typography>
              )}
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
              {required_funds_total_amount ? Number(required_funds_total_amount).toLocaleString() : 'ー'}
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
              {funding_total_amount ? Number(funding_total_amount).toLocaleString() : 'ー'}
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
            onClick={() =>
              navigate(isSalesPerson ? routeNames.adSalesPersonStep09Page.path : routeNames.apStep09Page.path)
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
