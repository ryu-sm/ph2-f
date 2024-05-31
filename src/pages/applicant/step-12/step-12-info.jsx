import { ApConfirmGroup, ApConfirmItemGroup, ApImgItem, ApLighterButton } from '@/components';
import { authAtom, localApplication } from '@/store';
import { Stack, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { Icons } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { useCallback, useEffect, useState } from 'react';
import { apGetSalesCompanyOrgs } from '@/services';
import { useIsSalesPerson } from '@/hooks';

export const ApStep12Info = ({ stepIndex }) => {
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const { p_application_headers } = useRecoilValue(localApplication);
  const {
    agentSended,
    user: { salesCompanyOrgId },
  } = useRecoilValue(authAtom);

  const [orgs, setOrgs] = useState([]);
  const getOrgs = useCallback(async () => {
    try {
      const res = await apGetSalesCompanyOrgs();

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
  }, [p_application_headers.sales_host_company_id]);

  useEffect(() => {
    getOrgs();
  }, []);

  return (
    <ApConfirmGroup stepIndex={stepIndex} label={`：担当者情報`}>
      {p_application_headers.vendor_business_card === '1' ? (
        <ApConfirmItemGroup label={'担当者の名刺'}>
          {p_application_headers.J.length ? (
            <ApImgItem files={p_application_headers.J} />
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
              {p_application_headers.sales_company_id
                ? orgs.find((item) => item.value === p_application_headers.sales_company_id)?.label
                : p_application_headers.sales_company || 'ー'}
            </Typography>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={`エリア`}>
            <Typography variant="modal_label" color={'text.main'}>
              {p_application_headers.sales_area_id
                ? orgs.find((item) => item.value === p_application_headers.sales_area_id)?.label
                : p_application_headers.sales_area || 'ー'}
            </Typography>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={`展示場`}>
            <Typography variant="modal_label" color={'text.main'}>
              {p_application_headers.sales_exhibition_hall_id
                ? orgs.find((item) => item.value === p_application_headers.sales_exhibition_hall_id)?.label
                : p_application_headers.sales_exhibition_hall || 'ー'}
            </Typography>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={`担当者名`}>
            <Typography variant="modal_label" color={'text.main'}>
              {p_application_headers.vendor_name ? p_application_headers.vendor_name : 'ー'}
            </Typography>
          </ApConfirmItemGroup>
          <ApConfirmItemGroup label={`電話番号`}>
            <Typography variant="modal_label" color={'text.main'}>
              {p_application_headers.vendor_phone ? p_application_headers.vendor_phone : 'ー'}
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
            onClick={() =>
              navigate(isSalesPerson ? routeNames.adSalesPersonStep12Page.path : routeNames.apStep12Page.path)
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
