import { Badge, Box, Button, Divider, Stack, Typography } from '@mui/material';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { PopoverSelect } from '../common/popover-select';
import { ProgressStatus } from '../common/progress-status';
import { FieldItem } from '../common/field-item';
import { formatApplyTime, formatNumber } from '@/utils';
import { Icons } from '@/assets';
import { FormikProvider, useFormik } from 'formik';
import {
  adGetAccessSalesPersonOptions,
  adUpdatePreliminaryManagerId,
  adUpdatePreliminarySalesAreaId,
  adUpdatePreliminarySalesExhibitionHallId,
  adUpdatePreliminarySalesPersonId,
  adUpdateProvisionalAfterResult,
  getChildrenOrgsWithCategory,
} from '@/services';
import { toast } from 'react-toastify';
import { useBoolean, useDashboardContext } from '@/hooks';
import { SetPairLoanModal } from './pair-loan-modal';
import { widthConfig } from '../common/width-config';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { UpAfterResultModal } from './after-result-modal';
import {
  dashboardTabStatusAtom,
  editMainTabStatusAtom,
  incomeTotalizerInfoGroupTabAtom,
  infoGroupTabAtom,
  pairLoanInfoGroupTabAtom,
  preliminarySelect,
} from '@/store';
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useSetRecoilState } from 'recoil';
import { API_500_ERROR } from '@/constant';
import { UnAccessModal } from '../common/un-access-modal';

export const AdCaseItem = ({ item }) => {
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
  const dashboardTabStatus = useRecoilValue(dashboardTabStatusAtom);
  const setMainTabStatus = useSetRecoilState(editMainTabStatusAtom);
  const setInfoGroupTab = useSetRecoilState(infoGroupTabAtom);
  const setIncomeTotalizerInfoGroupTab = useSetRecoilState(incomeTotalizerInfoGroupTabAtom);
  const setPairLoanInfoGroupTab = useSetRecoilState(pairLoanInfoGroupTabAtom);
  const refreshPreliminary = useRecoilRefresher_UNSTABLE(preliminarySelect);
  const { refreshPreliminarieList } = useDashboardContext();
  const navigator = useNavigate();
  const pairLoanModal = useBoolean(false);
  const afterResultModal = useBoolean(false);
  const unAccessModal = useBoolean(false);
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
      onClick: async () => {
        setMainTabStatus(1);
        setInfoGroupTab(1);
        setIncomeTotalizerInfoGroupTab(2);
        setPairLoanInfoGroupTab(1);
        refreshPreliminary();
        navigator(`${routeNames.adManagerEditPreliminaryPage.path}?id=${item.id}`);
      },
    },
    {
      label: 'メッセージ確認',
      onClick: async () => {
        navigator(`/manager/messages-detail?id=${item.id}&type=1`);
      },
    },
    {
      label: 'メモ表示',
      onClick: async () => {
        navigator(`${routeNames.adManagerMemoPage.path}?id=${item?.id}&&name=${item?.name_kanji}`);
      },
    },
    ...(item.loan_type === '2'
      ? [
          {
            label: item.pair_loan_id !== '' ? 'ペアローン解除' : 'ペアローン紐付',
            onClick: async () => {
              pairLoanModal.onTrue();
            },
          },
        ]
      : []),
  ];
  const [afterResult, setAfterResult] = useState({
    p_application_header_id: '',
    s_bank_id: '',
    provisional_after_result: '',
  });
  const provisionalAfterResult = useMemo(() => {
    const basicList = [
      {
        label: '仮審査否決等',
        value: '0',
        enable: item.provisional_after_result === '' && dashboardTabStatus === 1,
        active: item.provisional_after_result === '0',
        onClick: async () => {
          setAfterResult({
            p_application_header_id: item.id,
            s_bank_id: item.s_bank_id,
            provisional_after_result: '0',
          });
          afterResultModal.onTrue();
        },
      },
      {
        label: '本審査',
        value: '1',
        enable: ['0', '1'].includes(item.provisional_result) && item.provisional_after_result === '',
        active: item.provisional_after_result === '1',
        onClick: async () => {
          setAfterResult({
            p_application_header_id: item.id,
            s_bank_id: item.s_bank_id,
            provisional_after_result: '1',
          });
          afterResultModal.onTrue();
        },
      },
      {
        label: '本審査否決等',
        value: '2',
        enable: item.provisional_after_result === '1',
        active: item.provisional_after_result === '2',
        onClick: async () => {
          setAfterResult({
            p_application_header_id: item.id,
            s_bank_id: item.s_bank_id,
            provisional_after_result: '2',
          });
          afterResultModal.onTrue();
        },
      },
      {
        label: '融資実行済み',
        value: '3',
        enable: item.provisional_after_result === '1' && !['4', '5'].includes(item.provisional_after_result),
        active: item.provisional_after_result === '3',
        onClick: async () => {
          setAfterResult({
            p_application_header_id: item.id,
            s_bank_id: item.s_bank_id,
            provisional_after_result: '3',
          });
          afterResultModal.onTrue();
        },
      },
      {
        label: '他行借入',
        value: '4',
        enable: item.provisional_after_result === '1' && !['3', '5'].includes(item.provisional_after_result),
        active: item.provisional_after_result === '4',
        onClick: async () => {
          setAfterResult({
            p_application_header_id: item.id,
            s_bank_id: item.s_bank_id,
            provisional_after_result: '4',
          });
          afterResultModal.onTrue();
        },
      },
      {
        label: '自宅購入取止め',
        value: '5',
        enable: item.provisional_after_result === '1' && !['3', '4'].includes(item.provisional_after_result),
        active: item.provisional_after_result === '5',
        onClick: async () => {
          setAfterResult({
            p_application_header_id: item.id,
            s_bank_id: item.s_bank_id,
            provisional_after_result: '5',
          });
          afterResultModal.onTrue();
        },
      },
    ];
    return basicList;
  }, []);

  const provisionalresultOptions = [
    { value: '0', label: '承認' },
    { value: '1', label: '条件付き承認' },
    { value: '2', label: '否決' },
  ];

  const [salesAreaOptions, setSalesAreaOptions] = useState([]);
  const [salesExhibitionHallOptions, setSalesExhibitionHallOptions] = useState([]);
  const [salesPersonOptions, setSalesPersonOptions] = useState([]);

  const fetchSalesAreaOptions = async (sales_company_id) => {
    try {
      const res = await getChildrenOrgsWithCategory(sales_company_id, 'B');
      setSalesAreaOptions(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const fetchSalesExhibitionHallOptions = async (sales_area_id, sales_company_id) => {
    try {
      const res = await getChildrenOrgsWithCategory(sales_area_id || sales_company_id, 'E');
      setSalesExhibitionHallOptions(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  const fetchSalesPersonOptions = async (sales_exhibition_hall_id, sales_area_id, sales_company_id) => {
    try {
      const res = await adGetAccessSalesPersonOptions(sales_exhibition_hall_id || sales_area_id || sales_company_id);
      setSalesPersonOptions(res.data);
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

  const handleUpdateProvisionalAfterResult = useCallback(async () => {
    try {
      await adUpdateProvisionalAfterResult(afterResult);
      await refreshPreliminarieList();
      afterResultModal.onFalse();
      toast.success('更新をしました。');
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  }, [afterResult]);

  const handleChangeManager = useCallback(async (s_manager_id, item) => {
    try {
      const res = await adUpdatePreliminaryManagerId({
        p_application_header_id: item?.id,
        s_manager_id: s_manager_id,
      });
      toast.success('銀代担当を変更しました。');
    } catch (error) {
      toast.error('サーバーとの通信に失敗しました。再度お試しください。');
      return;
    }
  }, []);

  const handleSalesPerson = useCallback(async (s_sales_person_id) => {
    try {
      const res = await adUpdatePreliminarySalesPersonId({
        p_application_header_id: item?.id,
        s_sales_person_id: s_sales_person_id,
      });
      toast.success('担当担当を変更しました。');
    } catch (error) {
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
      formik.setFieldValue('sales_exhibition_hall_id', res.data.sales_exhibition_hall_id);
      formik.setFieldValue('s_sales_person_id', res.data.s_sales_person_id);

      toast.success('エリアを変更しました。');
    } catch (error) {
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
      toast.error('サーバーとの通信に失敗しました。再度お試しください。');
      return;
    }
  }, []);

  return (
    <FormikProvider value={formik}>
      <UnAccessModal
        isOpen={unAccessModal.value}
        onClose={async () => {
          unAccessModal.onFalse();
          await refreshPreliminarieList();
        }}
      />
      <UpAfterResultModal
        provisional_after_result={afterResult?.provisional_after_result}
        isOpen={afterResultModal.value}
        onConfirm={handleUpdateProvisionalAfterResult}
        onClose={() => {
          setAfterResult({
            p_application_header_id: '',
            s_bank_id: '',
            provisional_after_result: '',
          });
          afterResultModal.onFalse();
        }}
      />
      <SetPairLoanModal
        isOpen={pairLoanModal.value}
        onClose={pairLoanModal.onFalse}
        isPairLoan={isPairLoan}
        id={item.id}
        pair_loan_id={item?.pair_loan_id}
        apply_no={item.pair_loan_data?.apply_no}
      />
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
            textAlign={'center'}
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
                {formatNumber(item.desired_loan_amount, '')}
                <Typography variant="case_content_text" fontSize={7} fontFamily={'Noto Sans JP'}>
                  （万円）
                </Typography>
              </Box>
            }
            isText={true}
          />
          <FieldItem
            maxWidth={widthConfig[7]}
            minWidth={widthConfig[7]}
            value={<ProgressStatus status={item.pre_examination_status} id={item?.id} />}
            isText={false}
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
            value={<PopoverSelect name="sales_area_id" options={salesAreaOptions} onChange={handleChangeSalesArea} />}
            isText={false}
          />
          <FieldItem
            maxWidth={widthConfig[10]}
            minWidth={widthConfig[10]}
            fontSize={15}
            value={
              <PopoverSelect
                name="sales_exhibition_hall_id"
                options={salesExhibitionHallOptions}
                onChange={handleChangeSalesExhibitionHall}
              />
            }
            isText={false}
          />
          <FieldItem
            maxWidth={widthConfig[11]}
            minWidth={widthConfig[11]}
            value={<PopoverSelect name="s_sales_person_id" options={salesPersonOptions} onChange={handleSalesPerson} />}
            isText={false}
          />
          <FieldItem
            maxWidth={widthConfig[12]}
            minWidth={widthConfig[12]}
            value={
              <PopoverSelect
                name="s_manager_id"
                options={item?.manager_options}
                onChange={(value) => handleChangeManager(value, item)}
              />
            }
            isText={false}
            isLast={true}
          />
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Stack direction={'row'} justifyContent={'space-between'} p={1}>
          <Stack direction={'row'} spacing={'10px'} alignItems={'center'}>
            {letfLinkItems.map((linkItem, index) => (
              <Fragment key={index}>
                {index === 1 ? (
                  <Button
                    onClick={linkItem.onClick}
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
                    <Badge badgeContent={Number(item?.unviewed)} color="error">
                      <Typography
                        variant="case_content_text_edit"
                        color={'primary.main'}
                        sx={{
                          '&.MuiTypography-root:hover': {
                            color: 'blue.100',
                          },
                        }}
                      >
                        {linkItem.label}
                      </Typography>
                    </Badge>
                  </Button>
                ) : (
                  <Button
                    onClick={linkItem.onClick}
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
                      {linkItem.label}
                    </Typography>
                  </Button>
                )}
                {index !== letfLinkItems.length - 1 && (
                  <Icons.AdSlashIcon sx={{ color: 'gray.60', width: 12, height: 12 }} />
                )}
              </Fragment>
            ))}
          </Stack>
          <Stack direction={'row'} alignItems={'center'}>
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
                onClick={status.onClick}
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
