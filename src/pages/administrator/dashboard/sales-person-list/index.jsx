import { LinearProgress, Stack } from '@mui/material';
import { HeaderFilter } from '../common/header-filter';
import { SpCaseItem } from './list-item';
import { widthConfig } from '../common/width-config';
import { useDashboardContext } from '@/hooks';
import { useEffect, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { REGEX } from '@/constant';
import { yup } from '@/libs';
export const SalesPersonList = () => {
  const { status, preliminarieList, refreshPreliminarieList } = useDashboardContext();

  const [data, setData] = useState([]);
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
    provisional_result: [],
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
      if (values.provisional_result.length > 0) {
        temp = temp.filter((item) => {
          return values.provisional_result.includes(item.provisional_result);
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

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  return (
    <FormikProvider value={formik}>
      <Stack sx={{ height: '100%', marginX: 0, p: 0, flexGrow: 1 }} overflow={'auto'} mb={8}>
        <HeaderFilter />
        {status === 'loading' && <LinearProgress />}
        {status === 'hasValue' && (
          <Stack
            p={3}
            width={1}
            spacing={3}
            minWidth={Object.values(widthConfig).reduce((acc, curr) => acc + curr, 0) + 40}
            overflow={'auto'}
          >
            {data.map((item) => (
              <SpCaseItem
                key={`${item.id}${item.provisional_after_result}${item.pair_loan_data?.provisional_after_result}`}
                item={item}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </FormikProvider>
  );
};
