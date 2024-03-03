import { FormikProvider, useFormik } from 'formik';
import {
  ApErrorScroll,
  ApImgUpload,
  ApItemGroup,
  ApPageTitle,
  ApRadioColumnGroupUpload,
  ApSaveDraftButton,
  ApStarHelp,
  ApUpdateApply,
} from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { agentSendedSelector, applicationAtom, applyNoSelector } from '@/store';
import { validationSchema } from './validationSchema';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Link } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { Icons } from '@/assets';
import { cloneDeep } from 'lodash';
import { useApUpdateApplyInfo, useBoolean } from '@/hooks';
import { routeNames } from '@/router/settings';
import { apApplicationImg } from '@/services';

export const ApStep11Page = () => {
  const navigate = useNavigate();
  const setApplicationInfo = useSetRecoilState(applicationAtom);
  const applyNo = useRecoilValue(applyNoSelector);
  const agentSended = useRecoilValue(agentSendedSelector);
  const updateModal = useBoolean(false);
  const {
    apNextStepId,
    apPreStepId,
    hasIncomeTotalizer,
    changeToIncomeTotalizer,
    p_applicant_persons__1,
    p_uploaded_files,
    p_application_headers,
  } = useRecoilValue(applicationAtom);
  const updateApply = useApUpdateApplyInfo();
  const formik = useFormik({
    initialValues: {
      p_applicant_persons__1,
      p_uploaded_files,
      hasIncomeTotalizer,
      p_application_headers,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const dataCopy = cloneDeep(formik.values);
      if (values.p_applicant_persons__1.identity_verification_type === '1') {
        dataCopy.p_uploaded_files.p_applicant_persons__1__A__02 = [];
        dataCopy.p_uploaded_files.p_applicant_persons__1__A__03__a = [];
        dataCopy.p_uploaded_files.p_applicant_persons__1__A__03__b = [];
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__02', []);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__03__a', []);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__03__b', []);
      }
      if (values.p_applicant_persons__1.identity_verification_type === '2') {
        dataCopy.p_uploaded_files.p_applicant_persons__1__A__01__a = [];
        dataCopy.p_uploaded_files.p_applicant_persons__1__A__01__b = [];
        dataCopy.p_uploaded_files.p_applicant_persons__1__A__03__a = [];
        dataCopy.p_uploaded_files.p_applicant_persons__1__A__03__b = [];
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__01__a', []);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__01__b', []);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__03__a', []);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__03__b', []);
      }
      if (values.p_applicant_persons__1.identity_verification_type === '3') {
        dataCopy.p_uploaded_files.p_applicant_persons__1__A__01__a = [];
        dataCopy.p_uploaded_files.p_applicant_persons__1__A__01__b = [];
        dataCopy.p_uploaded_files.p_applicant_persons__1__A__02 = [];
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__01__a', []);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__01__b', []);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__02', []);
      }
      if (agentSended) {
        await updateApply(applyNo, dataCopy);
        updateModal.onTrue();
      } else {
        setApplicationInfo((pre) => {
          return { ...pre, ...values };
        });
        navigate(`/step-id-${apNextStepId}`);
      }
    },
  });

  const sendedImg = useCallback(async () => {
    if (agentSended) {
      try {
        const res = await apApplicationImg(applyNo);
        formik.setFieldValue(
          'p_uploaded_files.p_applicant_persons__1__A__01__a',
          res.data.p_applicant_persons__1__A__01__a
        );
        formik.setFieldValue(
          'p_uploaded_files.p_applicant_persons__1__A__01__b',
          res.data.p_applicant_persons__1__A__01__b
        );
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__A__02', res.data.p_applicant_persons__1__A__02);
        formik.setFieldValue(
          'p_uploaded_files.p_applicant_persons__1__A__03__a',
          res.data.p_applicant_persons__1__A__03__a
        );
        formik.setFieldValue(
          'p_uploaded_files.p_applicant_persons__1__A__03__b',
          res.data.p_applicant_persons__1__A__03__b
        );
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__B__a', res.data.p_applicant_persons__1__B__a);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__B__b', res.data.p_applicant_persons__1__B__b);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__C__01', res.data.p_applicant_persons__1__C__01);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__C__02', res.data.p_applicant_persons__1__C__02);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__C__03', res.data.p_applicant_persons__1__C__03);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__C__04', res.data.p_applicant_persons__1__C__04);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__C__05', res.data.p_applicant_persons__1__C__05);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__D__01', res.data.p_applicant_persons__1__D__01);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__D__02', res.data.p_applicant_persons__1__D__02);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__D__03', res.data.p_applicant_persons__1__D__03);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__E', res.data.p_applicant_persons__1__E);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__F__01', res.data.p_applicant_persons__1__F__01);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__F__02', res.data.p_applicant_persons__1__F__02);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__F__03', res.data.p_applicant_persons__1__F__03);
        formik.setFieldValue('p_uploaded_files.p_applicant_persons__1__K', res.data.p_applicant_persons__1__K);
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    sendedImg();
  }, [agentSended, applyNo]);

  const parseVaildData = useMemo(() => {
    const dataCopy = cloneDeep(formik.values);
    return dataCopy;
  }, [formik.values]);

  const handelLeft = () => {
    if (changeToIncomeTotalizer) {
      navigate(routeNames.apStep05Page.path);
    } else if (agentSended) {
      navigate(routeNames.apTopPage.path);
    } else {
      navigate(`/step-id-${apPreStepId}`);
    }
  };

  const plan = useMemo(() => {
    if (
      p_applicant_persons__1.tax_return === '1' &&
      (p_applicant_persons__1.tax_return_reasons.includes('1') ||
        p_applicant_persons__1.tax_return_reasons.includes('2') ||
        p_applicant_persons__1.tax_return_reasons.includes('3') ||
        p_applicant_persons__1.tax_return_reasons.includes('6') ||
        p_applicant_persons__1.tax_return_reasons.includes('99'))
    ) {
      return 'B';
    } else {
      return 'A';
    }
  }, [p_applicant_persons__1.tax_return, p_applicant_persons__1.tax_return_reasons]);

  const identityVerificationOption = [
    {
      value: '1',
      label: '運転免許証',
      touched:
        formik.touched.p_uploaded_files?.p_applicant_persons__1__A__01__a &&
        formik.touched.p_uploaded_files?.p_applicant_persons__1__A__01__b,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__A__01__a" singleFile />
          </Stack>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈裏面〉
            </Typography>
            <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__A__01__b" singleFile />
          </Stack>
        </Stack>
      ),
    },
    {
      value: '2',
      label: 'マイナンバーカード',
      touched: formik.touched.p_uploaded_files?.p_applicant_persons__1__A__02,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__A__02" singleFile />
          </Stack>
        </Stack>
      ),
    },
    {
      value: '3',
      label: '住民基本台帳カード（顔写真付き）',
      touched:
        formik.touched.p_uploaded_files?.p_applicant_persons__1__A__03__a &&
        formik.touched.p_uploaded_files?.p_applicant_persons__1__A__03__b,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__A__03__a" singleFile />
          </Stack>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈裏面〉
            </Typography>
            <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__A__03__b" singleFile />
          </Stack>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={18}>
        <ApUpdateApply isOpen={updateModal.value} onClose={updateModal.onFalse} />
        <ApPageTitle>{`本人確認書類など\n書類を添付しましょう`}</ApPageTitle>
        <Stack sx={{ px: 4, pb: 4 }}>
          <ApStarHelp label={'審査状況により他の資料提出をお願いすることがありますのでご了承ください。'} />
        </Stack>
        <ApItemGroup
          label={
            <Typography variant="form_item_label" color={'text.main'}>
              本人確認書類
              <Typography variant="note" color={'text.main'}>
                {' '}
                ※どれか一つ選択してください
              </Typography>
            </Typography>
          }
        >
          <ApRadioColumnGroupUpload
            name="p_applicant_persons__1.identity_verification_type"
            options={identityVerificationOption}
          />
        </ApItemGroup>

        <ApItemGroup label={'健康保険証'}>
          <Stack sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}>
            <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white' }}>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  〈表面〉
                </Typography>
                <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__B__a" singleFile />
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  〈裏面〉
                </Typography>
                <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__B__b" singleFile />
              </Stack>
            </Stack>
          </Stack>
        </ApItemGroup>
        {plan === 'A' && p_applicant_persons__1.office_occupation === '1' && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
              <Stack spacing={3}>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    源泉徴収票（前年度分）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    源泉徴収票（前々年度分）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__02" />
                </Stack>
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={`非上場企業の役員の方は\n下記の書類も添付してください。`}>
              <Stack spacing={3}>
                <ApStarHelp
                  label={
                    <Typography variant="note" color={'text.main'}>
                      {`枚数が多い場合はPDFファイルを\n`}
                      <Typography
                        component={Link}
                        variant="note"
                        color={'text.main'}
                        href={`mailto:ssnbmbk_info@ssnbagent.netbk.co.jp`}
                        sx={{ textDecorationLine: 'none' }}
                      >
                        ssnbmbk_info@ssnbagent.netbk.co.jp
                      </Typography>
                      へメール送付してください。
                    </Typography>
                  }
                />
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（1期前）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（2期前）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__02" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（3期前）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__03" />
                </Stack>
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'A' && ['6', '7', '8'].includes(p_applicant_persons__1.office_occupation) && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
              <Stack
                spacing={'6px'}
                sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
              >
                <Typography variant="label" color={'text.main'}>
                  源泉徴収票（前年度分）
                </Typography>
                <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__01" />
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={`雇用契約に関する書類`}>
              <Stack
                spacing={'6px'}
                sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
              >
                <Typography variant="label" color={'text.main'}>
                  雇用契約書
                </Typography>
                <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__E" />
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'A' && !['1', '6', '7', '8'].includes(p_applicant_persons__1.office_occupation) && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
              <Stack spacing={3}>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    源泉徴収票（前年度分）
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__01" />
                </Stack>
                {(p_applicant_persons__1.income_sources.includes('2') ||
                  p_applicant_persons__1.income_sources.includes('3')) && (
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      源泉徴収票（前々年度分）
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__02" />
                  </Stack>
                )}
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={`親族経営の会社等にご勤務の方は\n下記の書類も添付してください。`}>
              <Stack spacing={3}>
                <ApStarHelp
                  label={
                    <Typography variant="note" color={'text.main'}>
                      {`枚数が多い場合はPDFファイルを\n`}
                      <Typography
                        component={Link}
                        variant="note"
                        color={'text.main'}
                        href={`mailto:ssnbmbk_info@ssnbagent.netbk.co.jp`}
                        sx={{ textDecorationLine: 'none' }}
                      >
                        ssnbmbk_info@ssnbagent.netbk.co.jp
                      </Typography>
                      へメール送付してください。
                    </Typography>
                  }
                />
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（1期前）`}
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（2期前）`}
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__02" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（3期前）`}
                  </Typography>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__03" />
                </Stack>
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'B' && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
              <Stack spacing={3}>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    確定申告書（1期前）
                  </Typography>
                  <Stack spacing={1} direction={'row'} alignItems={'center'}>
                    <Icons.ApImportentIcon />
                    <Typography variant="waring" color={'secondary.main'}>
                      個人番号を隠した画像を添付してください
                    </Typography>
                  </Stack>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__03" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    確定申告書（2期前）
                  </Typography>
                  <Stack spacing={1} direction={'row'} alignItems={'center'}>
                    <Icons.ApImportentIcon />
                    <Typography variant="waring" color={'secondary.main'}>
                      個人番号を隠した画像を添付してください
                    </Typography>
                  </Stack>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__04" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    確定申告書（3期前）
                  </Typography>
                  <Stack spacing={1} direction={'row'} alignItems={'center'}>
                    <Icons.ApImportentIcon />
                    <Typography variant="waring" color={'secondary.main'}>
                      個人番号を隠した画像を添付してください
                    </Typography>
                  </Stack>
                  <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__C__05" />
                </Stack>
              </Stack>
            </ApItemGroup>
            {p_applicant_persons__1.office_occupation === '1' && (
              <ApItemGroup label={`非上場企業の役員の方は\n下記の書類も添付してください。`}>
                <Stack spacing={3}>
                  <ApStarHelp
                    label={
                      <Typography variant="note" color={'text.main'}>
                        {`枚数が多い場合はPDFファイルを\n`}
                        <Typography
                          component={Link}
                          variant="note"
                          color={'text.main'}
                          href={`mailto:ssnbmbk_info@ssnbagent.netbk.co.jp`}
                          sx={{ textDecorationLine: 'none' }}
                        >
                          ssnbmbk_info@ssnbagent.netbk.co.jp
                        </Typography>
                        へメール送付してください。
                      </Typography>
                    }
                  />
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（1期前）
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__01" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（2期前）
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__02" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（3期前）
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__D__03" />
                  </Stack>
                </Stack>
              </ApItemGroup>
            )}

            {!['1', '5', '10'].includes(p_applicant_persons__1.office_occupation) && (
              <ApItemGroup label={`親族経営の会社等にご勤務の方は\n下記の書類も添付してください。`}>
                <Stack spacing={3}>
                  <ApStarHelp
                    label={
                      <Typography variant="note" color={'text.main'}>
                        {`枚数が多い場合はPDFファイルを\n`}
                        <Typography
                          component={Link}
                          variant="note"
                          color={'text.main'}
                          href={`mailto:ssnbmbk_info@ssnbagent.netbk.co.jp`}
                          sx={{ textDecorationLine: 'none' }}
                        >
                          ssnbmbk_info@ssnbagent.netbk.co.jp
                        </Typography>
                        へメール送付してください。
                      </Typography>
                    }
                  />
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（1期前）`}
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__01" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（2期前）`}
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__02" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（3期前）`}
                    </Typography>
                    <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__F__03" />
                  </Stack>
                </Stack>
              </ApItemGroup>
            )}
          </Stack>
        )}

        <ApItemGroup optional label={'その他の書類'}>
          <Stack spacing={3}>
            {plan === 'B' && !['1', '5', '10'].includes(p_applicant_persons__1.office_occupation) && (
              <ApStarHelp label={'契約社員・派遣社員・嘱託の方は雇用契約書を添付してください。'} />
            )}
            <Stack sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}>
              <ApImgUpload name="p_uploaded_files.p_applicant_persons__1__K" />
            </Stack>
          </Stack>
        </ApItemGroup>
        <ApSaveDraftButton pageInfo={parseVaildData} />
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} rightLabel={agentSended && '保存'} />
      </ApLayout>
    </FormikProvider>
  );
};
