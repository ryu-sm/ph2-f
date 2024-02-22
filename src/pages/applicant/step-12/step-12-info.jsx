import { ApConfirmGroup, ApConfirmItemGroup, ApLighterButton } from '@/components';
import { agentSendedSelector, applicationAtom, authAtom } from '@/store';
import { Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { useCallback, useEffect, useState } from 'react';
import { apGetSalesCompanyOrgs } from '@/services';

export const ApStep12Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const {
    p_application_headers__J,
    p_application_headers__sales_company_id,
    p_application_headers__sales_area_id,
    p_application_headers__sales_exhibition_hall_id,
    p_application_headers__vendor_name,
    p_application_headers__vendor_phone,
  } = useRecoilValue(applicationAtom);
  const agentSended = useRecoilValue(agentSendedSelector);
  const {
    user: { salesCompanyOrgId },
  } = useRecoilValue(authAtom);
  const [orgs, setOrgs] = useState([]);
  const getOrgs = useCallback(async () => {
    try {
      const res = await apGetSalesCompanyOrgs(salesCompanyOrgId);

      const tempOrgs = res.data.map((item) => ({
        value: item.id,
        pid: item.pid,
        label: item.name,
        category: item.category,
      }));
      setOrgs(tempOrgs);
    } catch (error) {
      console.error(error);
    }
  }, [salesCompanyOrgId]);

  useEffect(() => {
    getOrgs();
  }, []);

  return (
    <Stack sx={{ width: 1 }}>
      <ApConfirmGroup label={`STEP${stepIndex}：担当者情報`}></ApConfirmGroup>
      {p_application_headers__J.length > 0 ? (
        <ApConfirmItemGroup label={'担当者の名刺'}>
          {p_application_headers__J.length ? (
            <ApImgItem files={p_application_headers__J} />
          ) : (
            <Typography variant="label" color={'gray.150'}>
              〈 書類はまだ添付されません。〉
            </Typography>
          )}
        </ApConfirmItemGroup>
      ) : (
        <Stack>
          <ApConfirmItemGroup label={`提携先企業 （不動産会社・住宅メーカー等）`}>
            <Typography variant="modal_label" color={'text.main'}>
              {p_application_headers__sales_company_id
                ? orgs.find((item) => item.value === p_application_headers__sales_company_id)?.label
                : 'ー'}
            </Typography>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={`エリア`}>
            <Typography variant="modal_label" color={'text.main'}>
              {p_application_headers__sales_area_id
                ? orgs.find((item) => item.value === p_application_headers__sales_area_id)?.label
                : 'ー'}
            </Typography>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={`展示場`}>
            <Typography variant="modal_label" color={'text.main'}>
              {p_application_headers__sales_exhibition_hall_id
                ? orgs.find((item) => item.value === p_application_headers__sales_exhibition_hall_id)?.label
                : 'ー'}
            </Typography>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={`担当者名`}>
            <Typography variant="modal_label" color={'text.main'}>
              {p_application_headers__vendor_name ? p_application_headers__vendor_name : 'ー'}
            </Typography>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={`電話番号`}>
            <Typography variant="modal_label" color={'text.main'}>
              {p_application_headers__vendor_phone ? p_application_headers__vendor_phone : 'ー'}
            </Typography>
          </ApConfirmItemGroup>
        </Stack>
      )}
      {!agentSended && (
        <Stack alignItems={'center'} sx={{ width: 1, py: 3 }}>
          <ApLighterButton
            height={40}
            width={200}
            sx={{ border: '1px solid', borderColor: (theme) => theme.palette.primary.main }}
            onClick={() => navigate(routeNames.apStep12Page.path)}
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
