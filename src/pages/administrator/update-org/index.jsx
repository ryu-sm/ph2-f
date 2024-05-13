import { AdAuthWrapper } from '@/containers';

import { useCurrSearchParams, useIsManager } from '@/hooks';

import { authAtom } from '@/store';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { validationSchema } from './validationSchema';
import { adBackground, adLogoCompany } from '@/assets';

import { adSalesPersonSalesCompanyOrgId, getAzureOrgsWithCategory } from '@/services';
import { setToken } from '@/libs';
import { jwtDecode } from 'jwt-decode';
import { routeNames } from '@/router/settings';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { OrgsSelect } from './orgs-select';

export const AdSalesPersonUpdateOrg = () => {
  const navigate = useNavigate();
  const setAuthInfo = useSetRecoilState(authAtom);
  const sales_person_id = useCurrSearchParams().get('sales_person_id');
  const [orgs, setOrgs] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getAzureOrgsWithCategory('C');
      setOrgs(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sales_person_id]);

  const formik = useFormik({
    initialValues: {
      sales_person_id: sales_person_id,
      s_sales_company_org_id: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await adSalesPersonSalesCompanyOrgId({
          sales_person_id: values.sales_person_id,
          s_sales_company_org_id: values.s_sales_company_org_id,
        });
        const { access_token } = res.data;
        setToken(access_token);
        const payload = jwtDecode(access_token);
        setAuthInfo((pre) => {
          return {
            ...pre,
            isLogined: true,
            roleType: payload?.role_type,
            user: {
              id: null,
              email: null,
              salesCompanyOrgId: null,
              displayPdf: true,
              hasDraftData: false,
              provisionalResult: null,
            },
            salesPerson: {
              id: payload?.id,
              email: payload?.email,
              name: payload?.name_kanji,
            },
            manager: {
              id: null,
              email: null,
              name: null,
            },
            agentSended: false,
          };
        });
        navigate(routeNames.adSalesPersonDashboardPage.path);
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });

  return (
    <AdAuthWrapper bgImage={`url(${adBackground})`}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'100vh'}>
        <Stack
          boxShadow={'0px 2px 8px rgba(0, 0, 0, 0.15)'}
          bgcolor={'white'}
          borderRadius={'5px'}
          width={'430px'}
          justifyContent={'center'}
          alignItems={'center'}
          py={10}
        >
          <Avatar src={adLogoCompany} variant="square" sx={{ height: '64px', width: '272px' }} />
          <Typography variant="login_title" my={5}>
            連携会社登録
          </Typography>

          <FormikProvider value={formik}>
            <Stack alignItems={'center'} spacing={6}>
              <OrgsSelect name="s_sales_company_org_id" options={orgs} />
              <Button
                sx={{
                  bgcolor: 'white',
                  boxShadow: 'none',
                  width: '200px',
                  height: '36px',
                  marginBottom: 5,
                  borderRadius: '2px',
                  minHeight: '36px',
                  border: '1px solid',
                  borderColor: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: 'white',
                    border: '1px solid',
                    borderColor: (theme) => theme.palette.primary.main,
                    opacity: 0.8,
                  },
                }}
                disabled={formik.isSubmitting || !formik.values.s_sales_company_org_id}
                onClick={() => formik.handleSubmit()}
              >
                <Typography variant="login_button" color="primary.main">
                  登録する
                </Typography>
              </Button>
            </Stack>
          </FormikProvider>
        </Stack>
      </Box>
    </AdAuthWrapper>
  );
};
