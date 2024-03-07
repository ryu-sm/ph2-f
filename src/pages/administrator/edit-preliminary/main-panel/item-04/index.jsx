import { Button, Stack, Typography } from '@mui/material';
import { EditRow } from '../../common/content-edit-row';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { preliminaryAotm } from '@/store';
import { formatJapanDate } from '@/utils';
import { Fragment, useEffect, useMemo } from 'react';
import {
  AdEditInput,
  AdNumericInput,
  AdSelectCheckbox,
  AdSelectRadios,
  DayPicker,
  MonthPicker,
} from '@/components/administrator';
import { genderOptions, nationalityOptions, yearOptions } from './options';

import dayjs from 'dayjs';
import { useApUpdateApplyInfo } from '@/hooks';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR, PREFECTURES } from '@/constant';

export const Item04 = () => {
  const { p_application_headers, p_applicant_persons__0, p_join_guarantors, hasJoinGuarantor } =
    useRecoilValue(preliminaryAotm);
  const setPreliminaryInfo = useSetRecoilState(preliminaryAotm);
  const initialValues = {
    p_join_guarantors: p_join_guarantors,
    hasJoinGuarantor: hasJoinGuarantor,
  };
  const updateApply = useApUpdateApplyInfo();
  const setUpdateData = (values) => {
    const diffData = {
      p_applicant_persons__0: {
        ...diffObj(initialValues.p_applicant_persons__0, values.p_applicant_persons__0),
      },
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await updateApply(p_application_headers.apply_no, setUpdateData(values));
        toast.success('申込内容を更新しました。');
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });
  const isEditable = useMemo(() => {
    return true;
  }, []);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  return (
    <FormikProvider value={formik}>
      <Stack width={'100%'} marginTop={'16px'}>
        <Stack width={'100%'} direction={'row'} justifyContent={'flex-end'}>
          <Button
            sx={{
              width: 200,
              padding: '6px 16px',
              bgcolor: 'secondary.main',
              color: 'white',
              boxShadow: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: 'secondary.main', opacity: 0.8 },
            }}
            onClick={formik.handleSubmit}
          >
            保存
          </Button>
        </Stack>

        <FieldArray
          name="p_join_guarantors"
          render={(arrayHelpers) => (
            <Fragment>
              {formik.values.p_join_guarantors.map((item, index) => (
                <Stack key={index}>
                  <Stack direction={'row'} alignItems={'flex-end'}>
                    <Typography variant="edit_content_title" sx={{ fontSize: 15, fontWeight: 600, color: 'gray.100' }}>
                      {`担保提供者`}
                    </Typography>
                    <Typography variant="edit_content_title" sx={{ fontWeight: 500, color: 'gray.100' }}>
                      {`（${index + 1}人目）`}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    width={'100%'}
                    borderBottom={'1px solid '}
                    borderColor={'gray.100'}
                  >
                    <Typography
                      variant="edit_content_title"
                      sx={{ fontWeight: 500, color: 'gray.100', flex: 1, textAlign: 'center' }}
                    >
                      入力項目
                    </Typography>
                    <Typography
                      variant="edit_content_title"
                      sx={{ fontWeight: 500, color: 'gray.100', flex: 2, textAlign: 'center' }}
                    >
                      入力内容
                    </Typography>
                  </Stack>
                  <Stack width={1} overflow={'auto'} pb={'10px'}>
                    <EditRow label={'担保提供者の氏名（姓）'} isRequired></EditRow>
                    <EditRow label={'担保提供者の氏名（名）'} isRequired></EditRow>
                    <EditRow label={'担保提供者の氏名（姓）（フリガナ）'} isRequired></EditRow>
                    <EditRow label={'担保提供者の氏名（名）（フリガナ）'} isRequired></EditRow>
                    <EditRow label={'性別'}></EditRow>
                    <EditRow label={'続柄'}></EditRow>
                    <EditRow label={'生年月日'} isRequired></EditRow>
                    <EditRow label={'電話番号携帯'}></EditRow>
                    <EditRow label={'電話番号自宅'}></EditRow>
                    <EditRow label={'緊急連絡先'} isAddendum></EditRow>
                    <EditRow label={'郵便番号'}></EditRow>
                    <EditRow label={'都道府県'} isRequired></EditRow>
                    <EditRow label={'市区郡'} isRequired></EditRow>
                    <EditRow label={'町村丁目'} isRequired></EditRow>
                    <EditRow label={'丁目以下・建物名・部屋番号'} isRequired></EditRow>
                    <EditRow label={'都道府県（フリガナ）'} isAddendum></EditRow>
                    <EditRow label={'市区郡（フリガナ）'} isAddendum></EditRow>
                    <EditRow label={'町村丁目（フリガナ）'} isAddendum></EditRow>
                    <EditRow label={'丁目以下・建物名・部屋番号（フリガナ）'} isAddendum></EditRow>
                    <EditRow label={'メールアドレス'} isAddendum></EditRow>
                  </Stack>
                </Stack>
              ))}
            </Fragment>
          )}
        />
      </Stack>
    </FormikProvider>
  );
};
