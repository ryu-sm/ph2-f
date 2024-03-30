import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { PopoverSelect } from '../common/popover-select';
import { FieldItem } from '../common/field-item';
import { formatApplyTime } from '@/utils';
import { Icons } from '@/assets';
import { FormikProvider, useFormik } from 'formik';
import {
  adGetAccessSalesPersonOptions,
  adUpdatePreliminarySalesAreaId,
  adUpdatePreliminarySalesExhibitionHallId,
  adUpdatePreliminarySalesPersonId,
  getChildrenOrgsWithCategory,
} from '@/services';
import { toast } from 'react-toastify';

import { widthConfig } from '../common/width-config';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { authAtom, editMainTabStatusAtom, infoGroupTabAtom } from '@/store';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { API_500_ERROR } from '@/constant';

export const SpCaseItem = ({ item }) => {
  const isPairLoan = useMemo(() => {
    return item.loan_type === '2' && item.pair_loan_id !== '';
  }, [item]);

  const pairLoanData = useMemo(() => {
    const data = [];
    if (item.loan_type === '2' && item.pair_loan_id !== '') {
      data.push({ ...item, pair_loan_data: '' }, { ...item.pair_loan_data });
    }

    return data;
  }, [item]);

  return (
    <>
      {isPairLoan ? (
        <Stack>
          {pairLoanData.map((pairLoanItem, index) => (
            <CaseItem key={pairLoanItem.id} item={pairLoanItem} index={index} isPairLoan={isPairLoan} />
          ))}
        </Stack>
      ) : (
        <CaseItem item={item} isPairLoan={isPairLoan} />
      )}
    </>
  );
};

const CaseItem = ({ item, isPairLoan, index }) => {
  const setMainTabStatus = useSetRecoilState(editMainTabStatusAtom);
  const setInfoGroupTab = useSetRecoilState(infoGroupTabAtom);
  const {
    salesPerson: { orgs },
  } = useRecoilValue(authAtom);
  const navigator = useNavigate();
  const formik = useFormik({
    initialValues: {
      sales_company_id: item?.sales_company_id,
      sales_area_id: item?.sales_area_id,
      sales_exhibition_hall_id: item?.sales_exhibition_hall_id,
      s_sales_person_id: item?.s_sales_person_id,
      s_manager_id: item?.s_manager_id,
    },
  });

  useEffect(() => {
    formik.setFieldValue('sales_company_id', item?.sales_company_id);
    formik.setFieldValue('sales_area_id', item?.sales_area_id);
    formik.setFieldValue('sales_exhibition_hall_id', item?.sales_exhibition_hall_id);
    formik.setFieldValue('s_sales_person_id', item?.s_sales_person_id);
    formik.setFieldValue('s_manager_id', item?.s_manager_id);
  }, [
    item?.sales_company_id,
    item?.sales_area_id,
    item?.sales_exhibition_hall_id,
    item?.s_sales_person_id,
    item?.s_manager_id,
  ]);

  const letfLinkItems = [
    {
      label: '申込内容の修正・確認',
      onClick: () => {
        setMainTabStatus(1);
        setInfoGroupTab(1);
        navigator(`${routeNames.adSalesPersonEditPreliminaryPage.path}?id=${item.id}`);
      },
    },
    {
      label: 'メッセージ確認',
      onClick: () => {
        navigator(`/sales-person/messages-detail?id=${item.id}&type=1`);
      },
    },
  ];

  const provisionalAfterResult = useMemo(() => {
    const basicList = [
      { label: '仮審査否決等', value: '0', enable: false, active: false },
      { label: '本審査', value: '1', enable: false, active: false },
      { label: '本審査否決等', value: '2', enable: false, active: false },
      { label: '融資実行済み', value: '3', enable: false, active: false },
      { label: '他行借入', value: '4', enable: false, active: false },
      { label: '自宅購入取止め', value: '5', enable: false, active: false },
    ];
    return basicList;
  }, []);

  const reviewProgress = [
    {
      value: '0',
      title: 'みらいバンク支店',
      label: '書類確認中',
      bgcolor: ['0'].includes(item?.pre_examination_status) ? '#C5D5FF' : 'gray.20',
    },
    {
      value: '1',
      title: '申込人',
      label: '書類不備対応中',
      bgcolor: ['1', '2', '3'].includes(item?.pre_examination_status) ? '#C5D5FF' : 'gray.20',
    },
    {
      value: '4',
      title: '住信SBIネット銀行',
      label: ['4'].includes(item?.pre_examination_status)
        ? `仮審査中（${item?.provisional_status ? item?.provisional_status : 0}/5）`
        : '仮審査中',
      bgcolor: ['4'].includes(item?.pre_examination_status) ? '#DF8550' : 'gray.20',
    },
    {
      value: '5',
      title: 'みらいバンク支店',
      label: '提携会社へ仮審査結果公開',
      bgcolor: ['5', '6'].includes(item?.pre_examination_status) ? '#ACEAB1' : 'gray.20',
    },
  ];

  const provisionalresultOptions = [
    { value: '0', label: '承認' },
    { value: '1', label: '条件付き承認' },
    { value: '2', label: '否決' },
  ];

  const [salesAreaOptions, setSalesAreaOptions] = useState([]);
  const [salesExhibitionHallOptions, setSalesExhibitionHallOptions] = useState([]);
  const [salesPersonOptions, setSalesPersonOptions] = useState([]);

  const [accessOrgs, setAccessOrgs] = useState([]);

  const fetchAccessOrgs = async () => {
    try {
      const tempAccessOrgs = [];
      for (let org of orgs) {
        const resC = await getChildrenOrgsWithCategory(org?.s_sales_company_org_id, 'C');
        const resB = await getChildrenOrgsWithCategory(org?.s_sales_company_org_id, 'B');
        const resE = await getChildrenOrgsWithCategory(org?.s_sales_company_org_id, 'E');

        [...resC.data, ...resB.data, ...resE.data].forEach((item) => {
          tempAccessOrgs.push({ ...item, role: org?.role });
        });
      }
      setAccessOrgs(tempAccessOrgs);
      console.log(9999, tempAccessOrgs);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchAccessOrgs();
  }, [orgs]);

  const fetchSalesAreaOptions = async (sales_company_id) => {
    try {
      const res = await getChildrenOrgsWithCategory(sales_company_id, 'B');
      console.log(res.data);
      setSalesAreaOptions(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const fetchSalesExhibitionHallOptions = async (sales_area_id, sales_company_id) => {
    try {
      const res = await getChildrenOrgsWithCategory(sales_area_id || sales_company_id, 'E');
      console.log(res.data);
      setSalesExhibitionHallOptions(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const fetchSalesPersonOptions = async (sales_exhibition_hall_id, sales_area_id, sales_company_id) => {
    try {
      const res = await adGetAccessSalesPersonOptions(sales_exhibition_hall_id || sales_area_id || sales_company_id);
      setSalesPersonOptions(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchSalesAreaOptions(formik.values.sales_company_id);
    fetchSalesExhibitionHallOptions(formik.values.sales_area_id, formik.values.sales_company_id);
    fetchSalesPersonOptions(
      formik.values.sales_exhibition_hall_id,
      formik.values.sales_area_id,
      formik.values.sales_company_id
    );
  }, []);

  const checkEnableSalesArea = useMemo(() => {
    return accessOrgs.find((accessOrg) => accessOrg?.category === 'C' && accessOrg?.role === 9);
  }, [accessOrgs]);

  const checkEnableSalesExhibitionHall = useMemo(() => {
    const accessOrgsID = [];
    accessOrgs.forEach((item) => {
      if (item?.role === 9) {
        accessOrgsID.push(item?.value);
      }
    });
    return accessOrgs.find(
      (accessOrg) =>
        accessOrg?.category === 'B' && accessOrg?.role === 9 && accessOrgsID.includes(formik.values.sales_area_id)
    );
  }, [accessOrgs, formik.values.sales_area_id]);

  const checkEnableSalesPerson = useMemo(() => {
    const accessOrgsID = [];
    accessOrgs.forEach((item) => {
      if (item?.role === 9) {
        accessOrgsID.push(item?.value);
      }
    });
    return accessOrgs.find(
      (accessOrg) =>
        accessOrg?.category === 'E' &&
        accessOrg?.role === 9 &&
        accessOrgsID.includes(formik.values.sales_exhibition_hall_id)
    );
  }, [accessOrgs, formik.values.sales_exhibition_hall_id]);

  const handleSalesPerson = useCallback(async (s_sales_person_id) => {
    try {
      const res = await adUpdatePreliminarySalesPersonId({
        p_application_header_id: item?.id,
        s_sales_person_id: s_sales_person_id,
      });
      toast.success('担当担当を変更しました。');
    } catch (error) {
      console.log(error);
      toast.error('サーバーとの通信に失敗しました。再度お試しください。');
      return;
    }
  }, []);

  const handleChangeSalesArea = useCallback(async (sales_area_id) => {
    try {
      const res = await adUpdatePreliminarySalesAreaId({
        p_application_header_id: item?.id,
        sales_company_id: item?.sales_company_id,
        sales_area_id: sales_area_id,
        sales_exhibition_hall_id: item?.sales_exhibition_hall_id,
        s_sales_person_id: item?.s_sales_person_id,
      });
      await fetchSalesExhibitionHallOptions(sales_area_id, formik.values.sales_company_id);
      await fetchSalesPersonOptions(res.data.sales_exhibition_hall_id, sales_area_id, formik.values.sales_company_id);
      console.log(res.data);
      formik.setFieldValue('sales_exhibition_hall_id', res.data.sales_exhibition_hall_id);
      formik.setFieldValue('s_sales_person_id', res.data.s_sales_person_id);

      toast.success('エリアを変更しました。');
    } catch (error) {
      console.log(error);
      toast.error('サーバーとの通信に失敗しました。再度お試しください。');
      return;
    }
  }, []);

  const handleChangeSalesExhibitionHall = useCallback(async (sales_exhibition_hall_id) => {
    try {
      const res = await adUpdatePreliminarySalesExhibitionHallId({
        p_application_header_id: item?.id,
        sales_exhibition_hall_id: sales_exhibition_hall_id,
        s_sales_person_id: item?.s_sales_person_id,
      });
      await fetchSalesPersonOptions(
        sales_exhibition_hall_id,
        formik.values.sales_area_id,
        formik.values.sales_company_id
      );
      formik.setFieldValue('s_sales_person_id', res.data.s_sales_person_id);
      toast.success('エリアを変更しました。');
    } catch (error) {
      console.log(error);
      toast.error('サーバーとの通信に失敗しました。再度お試しください。');
      return;
    }
  }, []);

  const checkClipPath = (index) => {
    const space = '16px';
    if (!index)
      return `polygon(calc(100% - ${space}) 0%, 100% 50%, calc(100% - ${space}) 100%, 0% 100%, 0% 50%, 0% 0%)`;

    return `polygon(calc(100% - ${space}) 0%, 100% 50%, calc(100% - ${space}) 100%, 0% 100%, ${space} 50%, 0% 0%)`;
  };

  return (
    <FormikProvider value={formik}>
      <Stack
        p={2}
        sx={{
          bgcolor: isPairLoan ? (theme) => theme.palette.green[60] : 'white',
          borderRadius: '2px',
          borderBottom: (theme) => (isPairLoan && index === 0 ? `6px solid ${theme.palette.green[100]}` : 'none'),
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
        }}
        width={1}
        minWidth={Object.values(widthConfig).reduce((acc, curr) => acc + curr, 0) + 16}
      >
        <Stack
          py={4}
          pr={4}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={1}
          height={50}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <FieldItem
            maxWidth={widthConfig[1]}
            minWidth={widthConfig[1]}
            textStyle={'case_content_title'}
            value={item.apply_no}
            isText={true}
          />
          <FieldItem
            maxWidth={widthConfig[2]}
            minWidth={widthConfig[2]}
            textStyle={'case_content_text'}
            value={item.bank_name}
            isText={true}
          />
          <FieldItem
            maxWidth={widthConfig[3]}
            minWidth={widthConfig[3]}
            textStyle={'case_content_text'}
            value={item.name_kanji}
            isText={true}
          />
          <FieldItem
            maxWidth={widthConfig[4]}
            minWidth={widthConfig[4]}
            textStyle={'case_content_text'}
            fontFamily="Barlow"
            value={formatApplyTime(item.created_at)}
            isText={true}
          />
          <FieldItem
            maxWidth={widthConfig[5]}
            minWidth={widthConfig[5]}
            textStyle={'case_content_text'}
            value={item.desired_borrowing_date}
            isText={true}
          />
          <FieldItem
            maxWidth={widthConfig[6]}
            minWidth={widthConfig[6]}
            textStyle={'case_content_text'}
            fontFamily="Barlow"
            value={
              <Box lineHeight={'25px'}>
                {item.desired_loan_amount}
                <Typography variant="case_content_text" fontSize={7} fontFamily={'Noto Sans JP'}>
                  （万円）
                </Typography>
              </Box>
            }
            isText={true}
          />
          <FieldItem
            maxWidth={widthConfig[8]}
            minWidth={widthConfig[8]}
            textStyle="case_content_text"
            value={
              !!item.provisional_result
                ? provisionalresultOptions.find((option) => option.value === item.provisional_result)?.label
                : 'ー'
            }
            isText={true}
          />
          <FieldItem
            maxWidth={widthConfig[9]}
            minWidth={widthConfig[9]}
            fontSize={15}
            value={
              checkEnableSalesArea ? (
                <PopoverSelect name="sales_area_id" options={salesAreaOptions} onChange={handleChangeSalesArea} />
              ) : (
                salesAreaOptions.find((op) => op.value === formik.values.sales_area_id)?.label
              )
            }
            isText={!checkEnableSalesArea}
          />
          <FieldItem
            maxWidth={widthConfig[10]}
            minWidth={widthConfig[10]}
            fontSize={15}
            value={
              checkEnableSalesExhibitionHall ? (
                <PopoverSelect
                  name="sales_exhibition_hall_id"
                  options={salesExhibitionHallOptions}
                  onChange={handleChangeSalesExhibitionHall}
                />
              ) : (
                salesExhibitionHallOptions.find((op) => op.value === formik.values.sales_exhibition_hall_id)?.label
              )
            }
            isText={!checkEnableSalesExhibitionHall}
          />
          <FieldItem
            maxWidth={widthConfig[11]}
            minWidth={widthConfig[11]}
            value={
              checkEnableSalesPerson ? (
                <PopoverSelect name="s_sales_person_id" options={salesPersonOptions} onChange={handleSalesPerson} />
              ) : (
                salesPersonOptions.find((op) => op.value === formik.values.s_sales_person_id)?.label
              )
            }
            isText={!checkEnableSalesPerson}
          />
          <FieldItem
            maxWidth={widthConfig[12]}
            minWidth={widthConfig[12]}
            textStyle="case_content_text"
            value={
              !!item.s_manager_id
                ? item.manager_options.find((option) => option.value === item.s_manager_id)?.label
                : 'ー'
            }
            isText={true}
            isLast={true}
          />
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Stack direction={'row'} px={2} mb={2}>
          {reviewProgress.map((item, index) => (
            <Stack key={item.value} flex={item.value === 4 ? 1.5 : 1}>
              <Typography variant="manager_progress_item_title" width={'100%'} textAlign={'center'} color={'text.main'}>
                {item.title}
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  minHeight: 38,
                  bgcolor: 'gray.60',
                  mr: '-12px',
                  clipPath: checkClipPath(index),
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '1px',
                    left: '2px',
                    right: '1px',
                    bottom: '1px',
                    bgcolor: item.bgcolor,
                    clipPath: checkClipPath(index),
                  }}
                >
                  <Typography variant="manager_progress_item">{item.label}</Typography>
                </Box>
              </Box>
              {item.value === '4' && (
                <Stack direction={'row'} spacing={2} mt={2} justifyContent={'center'}>
                  {['1', '2', '3', '4', '5'].map((step) => (
                    <Box
                      key={step}
                      height={6}
                      width={'65px'}
                      bgcolor={step === item.provisional_status ? 'primary.amin' : 'gray.40'}
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          ))}
        </Stack>

        <Stack direction={'row'} justifyContent={'space-between'} px={1}>
          <Stack direction={'row'} spacing={'10px'} alignItems={'center'}>
            {letfLinkItems.map((item, index) => (
              <Fragment key={index}>
                <Button
                  onClick={item.onClick}
                  variant="text"
                  sx={{
                    mr: '10px',
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: 'white',
                      opacity: 1,
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <Typography
                    variant="case_content_text_edit"
                    color={'primary.main'}
                    sx={{
                      '&.MuiTypography-root:hover': {
                        color: 'blue.100',
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Button>
                {index !== letfLinkItems.length - 1 && (
                  <Icons.AdSlashIcon sx={{ color: 'gray.60', width: 12, height: 12 }} />
                )}
              </Fragment>
            ))}
          </Stack>

          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant="case_content_text_edit">仮審査後の状況</Typography>
            {provisionalAfterResult.map((status) => (
              <Button
                key={status.label}
                variant="text"
                disabled={!status.enable}
                sx={{
                  ml: 10,
                  mr: 2,
                  bgcolor: status.active ? 'primary.main' : 'none',
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'button_hover',
                    opacity: 1,
                  },
                }}
              >
                <Typography variant="case_content_text_edit" color={`${status.active ? 'white' : 'primary.main'}`}>
                  {status.label}
                </Typography>
              </Button>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </FormikProvider>
  );
};
