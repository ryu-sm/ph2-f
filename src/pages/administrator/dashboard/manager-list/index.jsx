import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { HeaderFilter } from '../common/header-filter';
import { AdCaseItem } from './list-item';
import { widthConfig } from '../common/width-config';
import { useBoolean, useDashboardContext } from '@/hooks';
import { Fragment, useEffect, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { REGEX } from '@/constant';
import { yup } from '@/libs';
import { InboxOutlined } from '@mui/icons-material';
import { Icons } from '@/assets';
import { AdListFilterModal } from '../common/filter-modal';

export const ManagerList = () => {
  const { status, preliminarieList, refreshPreliminarieList } = useDashboardContext();
  const [data, setData] = useState([]);
  const filterModal = useBoolean(false);
  useEffect(() => {
    refreshPreliminarieList();
  }, []);

  useEffect(() => {
    if (status === 'hasValue') {
      setData(preliminarieList);
    }
  }, [status, preliminarieList]);

  const initialValues = {
    s_bank_id: [],
    name_kanji: '',
    created_at_from: '',
    created_at_to: '',
    desired_borrowing_date_from: '',
    desired_borrowing_date_to: '',
    desired_loan_amount_from: '',
    desired_loan_amount_to: '',
    provisional_result: [],
    sales_company_id: [],
    sales_area_id: [],
    sales_exhibition_hall_id: [],
    s_sales_person_id: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object({
      created_at_from: yup.string().matches(REGEX.YMD),
      created_at_to: yup.string().matches(REGEX.YMD),
      desired_borrowing_date_from: yup.string().matches(REGEX.YMD),
      desired_borrowing_date_to: yup.string().matches(REGEX.YMD),
    }),
    onSubmit: (values) => {
      let temp = [...preliminarieList];
      if (values.s_bank_id.length > 0) {
        temp = temp.filter((item) => {
          return values.s_bank_id.includes(item.s_bank_id);
        });
      }
      if (values.name_kanji) {
        temp = temp.filter((item) => {
          return item.name_kanji.includes(values.name_kanji);
        });
      }
      if (values.created_at_from) {
        temp = temp.filter((item) => {
          return item.created_at.split(' ')[0] >= values.created_at_from;
        });
      }
      if (values.created_at_to) {
        temp = temp.filter((item) => {
          return item.created_at.split(' ')[0] <= values.created_at_to;
        });
      }
      if (values.desired_loan_amount_from) {
        temp = temp.filter((item) => {
          return Number(item.desired_loan_amount_from) >= Number(values.desired_loan_amount_from);
        });
      }
      if (values.desired_loan_amount_to) {
        temp = temp.filter((item) => {
          return Number(item.desired_loan_amount_to) <= Number(values.desired_loan_amount_to);
        });
      }
      if (values.desired_borrowing_date_from) {
        temp = temp.filter((item) => {
          return item.created_at.split(' ')[0] >= values.desired_borrowing_date_from;
        });
      }
      if (values.desired_borrowing_date_to) {
        temp = temp.filter((item) => {
          return item.created_at.split(' ')[0] <= values.desired_borrowing_date_to;
        });
      }
      if (values.sales_company_id.length > 0) {
        temp = temp.filter((item) => {
          return values.sales_company_id.includes(item.sales_company_id);
        });
      }
      if (values.sales_area_id.length > 0) {
        temp = temp.filter((item) => {
          return values.sales_area_id.includes(item.sales_area_id);
        });
      }
      if (values.sales_exhibition_hall_id.length > 0) {
        temp = temp.filter((item) => {
          return values.sales_exhibition_hall_id.includes(item.sales_exhibition_hall_id);
        });
      }
      if (values.s_sales_person_id.length > 0) {
        temp = temp.filter((item) => {
          return values.s_sales_person_id.includes(item.s_sales_person_id);
        });
      }
      setData(temp);
    },
  });

  return (
    <FormikProvider value={formik}>
      <Stack sx={{ height: '100%', flexGrow: 1 }} overflow={'auto'} mb={8}>
        <HeaderFilter />
        {status === 'loading' && <LinearProgress />}
        {status === 'hasValue' && (
          <Fragment>
            {data.length > 0 ? (
              <Stack
                p={3}
                width={1}
                spacing={3}
                minWidth={Object.values(widthConfig).reduce((acc, curr) => acc + curr, 0) + 40}
                overflow={'auto'}
              >
                {data.map((item) => (
                  <AdCaseItem
                    key={`${item.id}${item.provisional_after_result}${item.pair_loan_data?.provisional_after_result}`}
                    item={item}
                  />
                ))}
              </Stack>
            ) : (
              <Stack flex={1} alignContent={'center'} justifyContent={'center'}>
                <InboxOutlined
                  sx={{
                    width: 80,
                    height: 70,
                    ml: 'calc(50% - 50px)',
                    color: '#d8d8d8',
                  }}
                />
                <Typography sx={{ color: '#7d7d7d', textAlign: 'center' }}>案件がありません。</Typography>
              </Stack>
            )}
          </Fragment>
        )}
      </Stack>
      <Box
        sx={{
          cursor: 'pointer',
          height: 45,
          width: 45,
          // border: '1px solid',
          // borderColor: (theme) => theme.palette.grey[100],
          borderRadius: '50%',
          // bgcolor: (theme) => theme.palette.grey[100],
          bgcolor: (theme) => theme.palette.primary[40],
          color: '#333333',
          position: 'fixed',
          bottom: '80px',
          right: '50px',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'rgba(59, 118, 129, 0.15) 0px 2px 8px',
        }}
      >
        <Icons.AdListFilterIcon
          sx={{ width: 24, height: 24 }}
          onClick={() => {
            // formik.resetForm();
            filterModal.onTrue();
          }}
        />
        <AdListFilterModal
          open={filterModal.value}
          onClose={filterModal.onFalse}
          onCleare={formik.resetForm}
          handleSearch={formik.handleSubmit}
          errors={formik.errors}
        />
      </Box>
    </FormikProvider>
  );
};
