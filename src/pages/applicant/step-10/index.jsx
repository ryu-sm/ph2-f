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

import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom, localApplication } from '@/store';

import { validationSchema } from './validationSchema';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Icons } from '@/assets';
import { useApplicationContext, useBoolean, useIsSalesPerson } from '@/hooks';
import { routeNames } from '@/router/settings';
import { diffObj } from '@/utils';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { apGetPapplicantPersonsFiles } from '@/services';

export const ApStep10Page = () => {
  const { updateSendedInfo } = useApplicationContext();
  const navigate = useNavigate();
  const isSalesPerson = useIsSalesPerson();
  const { agentSended, user } = useRecoilValue(authAtom);
  const updateModal = useBoolean(false);
  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const { apNextStepId, apPreStepId, p_applicant_persons__0 } = localApplicationInfo;

  const setLocalData = (values) => {
    setLocalApplicationInfo((pre) => {
      return {
        ...pre,
        p_applicant_persons__0: {
          ...pre.p_applicant_persons__0,
          identity_verification_type: values.p_applicant_persons__0.identity_verification_type,
          A__01__a: values.p_applicant_persons__0.A__01__a,
          A__01__b: values.p_applicant_persons__0.A__01__b,
          A__02: values.p_applicant_persons__0.A__02,
          A__03__a: values.p_applicant_persons__0.A__03__a,
          A__03__b: values.p_applicant_persons__0.A__03__b,
          B__a: values.p_applicant_persons__0.B__a,
          B__b: values.p_applicant_persons__0.B__b,
          C__01: values.p_applicant_persons__0.C__01,
          C__02: values.p_applicant_persons__0.C__02,
          C__03: values.p_applicant_persons__0.C__03,
          C__04: values.p_applicant_persons__0.C__04,
          C__05: values.p_applicant_persons__0.C__05,
          D__01: values.p_applicant_persons__0.D__01,
          D__02: values.p_applicant_persons__0.D__02,
          D__03: values.p_applicant_persons__0.D__03,
          E: values.p_applicant_persons__0.E,
          F__01: values.p_applicant_persons__0.F__01,
          F__02: values.p_applicant_persons__0.F__02,
          F__03: values.p_applicant_persons__0.F__03,
          K: values.p_applicant_persons__0.K,
        },
      };
    });
  };
  const initialValues = {
    p_applicant_persons__0: {
      identity_verification_type: p_applicant_persons__0.identity_verification_type,
      A__01__a: p_applicant_persons__0.A__01__a,
      A__01__b: p_applicant_persons__0.A__01__b,
      A__02: p_applicant_persons__0.A__02,
      A__03__a: p_applicant_persons__0.A__03__a,
      A__03__b: p_applicant_persons__0.A__03__b,
      B__a: p_applicant_persons__0.B__a,
      B__b: p_applicant_persons__0.B__b,
      C__01: p_applicant_persons__0.C__01,
      C__02: p_applicant_persons__0.C__02,
      C__03: p_applicant_persons__0.C__03,
      C__04: p_applicant_persons__0.C__04,
      C__05: p_applicant_persons__0.C__05,
      D__01: p_applicant_persons__0.D__01,
      D__02: p_applicant_persons__0.D__02,
      D__03: p_applicant_persons__0.D__03,
      E: p_applicant_persons__0.E,
      F__01: p_applicant_persons__0.F__01,
      F__02: p_applicant_persons__0.F__02,
      F__03: p_applicant_persons__0.F__03,
      K: p_applicant_persons__0.K,
    },
  };

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
      try {
        if (agentSended) {
          await updateSendedInfo(setUpdateData(values));
          updateModal.onTrue();
        } else {
          setLocalData(values);
          navigate(`${isSalesPerson ? '/sales-person' : ''}/step-id-${apNextStepId}`);
        }
      } catch (error) {
        toast.error(API_500_ERROR);
      }
    },
  });

  const parseVaildData = useMemo(() => {
    const dataCopy = {
      p_applicant_persons__0: {
        ...formik.values.p_applicant_persons__0,
      },
    };
    return dataCopy;
  }, [formik.values]);

  const handelLeft = () => {
    if (agentSended) {
      navigate(routeNames.apTopPage.path);
    } else {
      setLocalData(formik.values);
      navigate(`${isSalesPerson ? '/sales-person' : ''}/step-id-${apPreStepId}`);
    }
  };

  const plan = useMemo(() => {
    if (
      p_applicant_persons__0.tax_return === '1' &&
      (p_applicant_persons__0.tax_return_reasons.includes('1') ||
        p_applicant_persons__0.tax_return_reasons.includes('2') ||
        p_applicant_persons__0.tax_return_reasons.includes('3') ||
        p_applicant_persons__0.tax_return_reasons.includes('6') ||
        p_applicant_persons__0.tax_return_reasons.includes('99'))
    ) {
      return 'B';
    } else {
      return 'A';
    }
  }, [p_applicant_persons__0.tax_return, p_applicant_persons__0.tax_return_reasons]);

  const fetchPapplicantPersonsFiles = async () => {
    try {
      const res = await apGetPapplicantPersonsFiles(user.id, 0);
      formik.setFieldValue('p_applicant_persons__0.A__01__a', res.data?.A__01__a);
      formik.setFieldValue('p_applicant_persons__0.A__01__b', res.data?.A__01__b);
      formik.setFieldValue('p_applicant_persons__0.A__02', res.data?.A__02);
      formik.setFieldValue('p_applicant_persons__0.A__03__a', res.data?.A__03__a);
      formik.setFieldValue('p_applicant_persons__0.A__03__b', res.data?.A__03__b);
      formik.setFieldValue('p_applicant_persons__0.B__a', res.data?.B__a);
      formik.setFieldValue('p_applicant_persons__0.B__b', res.data?.B__b);
      formik.setFieldValue('p_applicant_persons__0.C__01', res.data?.C__01);
      formik.setFieldValue('p_applicant_persons__0.C__02', res.data?.C__02);
      formik.setFieldValue('p_applicant_persons__0.C__03', res.data?.C__03);
      formik.setFieldValue('p_applicant_persons__0.C__04', res.data?.C__04);
      formik.setFieldValue('p_applicant_persons__0.C__05', res.data?.C__05);
      formik.setFieldValue('p_applicant_persons__0.D__01', res.data?.D__01);
      formik.setFieldValue('p_applicant_persons__0.D__02', res.data?.D__02);
      formik.setFieldValue('p_applicant_persons__0.D__03', res.data?.D__03);
      formik.setFieldValue('p_applicant_persons__0.E', res.data?.E);
      formik.setFieldValue('p_applicant_persons__0.F__01', res.data?.F__01);
      formik.setFieldValue('p_applicant_persons__0.F__02', res.data?.F__02);
      formik.setFieldValue('p_applicant_persons__0.F__03', res.data?.F__03);
      formik.setFieldValue('p_applicant_persons__0.K', res.data?.K);
      console.log(res.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    if (agentSended) {
      fetchPapplicantPersonsFiles();
    }
  }, []);

  const { refreshsendedApllication } = useApplicationContext();

  useEffect(() => {
    if (agentSended) {
      refreshsendedApllication();
    }
  }, []);
  useEffect(() => {
    if (agentSended) {
      formik.setValues(initialValues);
    }
  }, [localApplicationInfo]);

  const identityVerificationOption = [
    {
      value: '1',
      label: '運転免許証',
      touched: formik.touched.p_applicant_persons__0?.A__01__a && formik.touched.p_applicant_persons__0?.A__01__b,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_applicant_persons__0.A__01__a" singleFile />
          </Stack>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈裏面〉
            </Typography>
            <ApImgUpload name="p_applicant_persons__0.A__01__b" singleFile />
          </Stack>
        </Stack>
      ),
    },
    {
      value: '2',
      label: 'マイナンバーカード',
      touched: formik.touched.p_applicant_persons__0?.A__02,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_applicant_persons__0.A__02" singleFile />
          </Stack>
        </Stack>
      ),
    },
    {
      value: '3',
      label: '住民基本台帳カード（顔写真付き）',
      touched: formik.touched.p_applicant_persons__0?.A__03__a && formik.touched.p_applicant_persons__0?.A__03__b,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_applicant_persons__0.A__03__a" singleFile />
          </Stack>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈裏面〉
            </Typography>
            <ApImgUpload name="p_applicant_persons__0.A__03__b" singleFile />
          </Stack>
        </Stack>
      ),
    },
  ];

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout
        hasMenu
        hasStepBar
        bottomContent={
          <>
            <ApSaveDraftButton pageInfo={parseVaildData} />
            <ApStepFooter
              left={handelLeft}
              right={formik.handleSubmit}
              rightLabel={agentSended && '保存'}
              rightDisable={formik.isSubmitting}
            />
          </>
        }
      >
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
            name="p_applicant_persons__0.identity_verification_type"
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
                <ApImgUpload name="p_applicant_persons__0.B__a" singleFile />
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  〈裏面〉
                </Typography>
                <ApImgUpload name="p_applicant_persons__0.B__b" singleFile />
              </Stack>
            </Stack>
          </Stack>
        </ApItemGroup>
        {plan === 'A' && p_applicant_persons__0.office_occupation === '1' && (
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
                  <ApImgUpload name="p_applicant_persons__0.C__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    源泉徴収票（前々年度分）
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__0.C__02" />
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
                  <ApImgUpload name="p_applicant_persons__0.D__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（2期前）
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__0.D__02" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（3期前）
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__0.D__03" />
                </Stack>
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'A' && ['6', '7', '8'].includes(p_applicant_persons__0.office_occupation) && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
              <Stack
                spacing={'6px'}
                sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
              >
                <Typography variant="label" color={'text.main'}>
                  源泉徴収票（前年度分）
                </Typography>
                <ApImgUpload name="p_applicant_persons__0.C__01" />
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
                <ApImgUpload name="p_applicant_persons__0.E" />
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'A' && !['1', '6', '7', '8'].includes(p_applicant_persons__0.office_occupation) && (
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
                  <ApImgUpload name="p_applicant_persons__0.C__01" />
                </Stack>
                {(p_applicant_persons__0.income_sources.includes('2') ||
                  p_applicant_persons__0.income_sources.includes('3')) && (
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      源泉徴収票（前々年度分）
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__0.C__02" />
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
                  <ApImgUpload name="p_applicant_persons__0.F__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（2期前）`}
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__0.F__02" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（3期前）`}
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__0.F__03" />
                </Stack>
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'B' && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
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
                <ApStarHelp label={'3期分無い場合は、直近のみで結構です。'} />
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
                  <ApImgUpload name="p_applicant_persons__0.C__03" />
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
                  <ApImgUpload name="p_applicant_persons__0.C__04" />
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
                  <ApImgUpload name="p_applicant_persons__0.C__05" />
                </Stack>
              </Stack>
            </ApItemGroup>
            {p_applicant_persons__0.office_occupation === '1' && (
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
                    <ApImgUpload name="p_applicant_persons__0.D__01" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（2期前）
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__0.D__02" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（3期前）
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__0.D__03" />
                  </Stack>
                </Stack>
              </ApItemGroup>
            )}

            {!['1', '5', '10'].includes(p_applicant_persons__0.office_occupation) && (
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
                    <ApImgUpload name="p_applicant_persons__0.F__01" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（2期前）`}
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__0.F__02" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（3期前）`}
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__0.F__03" />
                  </Stack>
                </Stack>
              </ApItemGroup>
            )}
          </Stack>
        )}

        <ApItemGroup optional label={'その他の書類'}>
          <Stack spacing={3}>
            {plan === 'B' && !['1', '5', '10'].includes(p_applicant_persons__0.office_occupation) && (
              <ApStarHelp label={'契約社員・派遣社員・嘱託の方は雇用契約書を添付してください。'} />
            )}
            {plan === 'A' && !['1', '6', '7', '8'].includes(p_applicant_persons__0.office_occupation) && (
              <ApStarHelp label={'昨年または今年転職された方は雇用契約書を添付してください。'} />
            )}
            <Stack sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}>
              <ApImgUpload name="p_applicant_persons__0.K" />
            </Stack>
          </Stack>
        </ApItemGroup>
      </ApLayout>
    </FormikProvider>
  );
};
