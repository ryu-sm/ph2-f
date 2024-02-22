import { FormikProvider, useFormik } from 'formik';
import {
  ApErrorScroll,
  ApImgUpload,
  ApItemGroup,
  ApPageTitle,
  ApRadioColumnGroupUpload,
  ApSaveDraftButton,
  ApStarHelp,
} from '@/components';
import { ApLayout, ApStepFooter } from '@/containers';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apNextStepIdSelector, apPreStepIdSelector, applicationAtom } from '@/store';

import { validationSchema } from './validationSchema';
import { useNavigate } from 'react-router-dom';
import { routeNames } from '@/router/settings';
import { Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { Icons } from '@/assets';

export const ApStep11Page = () => {
  const navigate = useNavigate();
  const apNextStepId = useRecoilValue(apNextStepIdSelector);
  const apPreStepId = useRecoilValue(apPreStepIdSelector);
  const setApplicationInfo = useSetRecoilState(applicationAtom);

  const {
    p_applicant_persons__1__identity_verification_type,
    p_applicant_persons__1__A__01__a,
    p_applicant_persons__1__A__01__b,
    p_applicant_persons__1__A__02,
    p_applicant_persons__1__A__03__a,
    p_applicant_persons__1__A__03__b,
    p_applicant_persons__1__B__a,
    p_applicant_persons__1__B__b,
    p_applicant_persons__1__C__01,
    p_applicant_persons__1__C__02,
    p_applicant_persons__1__C__03,
    p_applicant_persons__1__C__04,
    p_applicant_persons__1__C__05,
    p_applicant_persons__1__D__01,
    p_applicant_persons__1__D__02,
    p_applicant_persons__1__D__03,
    p_applicant_persons__1__E,
    p_applicant_persons__1__F__01,
    p_applicant_persons__1__F__02,
    p_applicant_persons__1__F__03,
    p_applicant_persons__1__K,
    //
    p_applicant_persons__1__tax_return,
    p_applicant_persons__1__tax_return_reasons,
    p_applicant_persons__1__office_occupation,
    p_applicant_persons__1__income_sources,
  } = useRecoilValue(applicationAtom);

  const formik = useFormik({
    initialValues: {
      p_applicant_persons__1__A__01__a,
      p_applicant_persons__1__A__01__b,
      p_applicant_persons__1__A__02,
      p_applicant_persons__1__A__03__a,
      p_applicant_persons__1__A__03__b,
      p_applicant_persons__1__B__a,
      p_applicant_persons__1__B__b,
      p_applicant_persons__1__C__01,
      p_applicant_persons__1__C__02,
      p_applicant_persons__1__C__03,
      p_applicant_persons__1__C__04,
      p_applicant_persons__1__C__05,
      p_applicant_persons__1__D__01,
      p_applicant_persons__1__D__02,
      p_applicant_persons__1__D__03,
      p_applicant_persons__1__E,
      p_applicant_persons__1__F__01,
      p_applicant_persons__1__F__02,
      p_applicant_persons__1__F__03,
      p_applicant_persons__1__K,
      p_applicant_persons__1__identity_verification_type,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setApplicationInfo((pre) => {
        return { ...pre, ...values };
      });
      navigate(`/step-id-${apNextStepId}`);
    },
  });

  const parseVaildData = useMemo(() => {
    return {
      p_applicant_persons__1__A__01__a: formik.values.p_applicant_persons__1__A__01__a,
      p_applicant_persons__1__A__01__b: formik.values.p_applicant_persons__1__A__01__b,
      p_applicant_persons__1__A__02: formik.values.p_applicant_persons__1__A__02,
      p_applicant_persons__1__A__03__a: formik.values.p_applicant_persons__1__A__03__a,
      p_applicant_persons__1__A__03__b: formik.values.p_applicant_persons__1__A__03__b,
      p_applicant_persons__1__B__a: formik.values.p_applicant_persons__1__B__a,
      p_applicant_persons__1__B__b: formik.values.p_applicant_persons__1__B__b,
      p_applicant_persons__1__C__01: formik.values.p_applicant_persons__1__C__01,
      p_applicant_persons__1__C__02: formik.values.p_applicant_persons__1__C__02,
      p_applicant_persons__1__C__03: formik.values.p_applicant_persons__1__C__03,
      p_applicant_persons__1__C__04: formik.values.p_applicant_persons__1__C__04,
      p_applicant_persons__1__C__05: formik.values.p_applicant_persons__1__C__05,
      p_applicant_persons__1__D__01: formik.values.p_applicant_persons__1__D__01,
      p_applicant_persons__1__D__02: formik.values.p_applicant_persons__1__D__02,
      p_applicant_persons__1__D__03: formik.values.p_applicant_persons__1__D__03,
      p_applicant_persons__1__E: formik.values.p_applicant_persons__1__E,
      p_applicant_persons__1__F__01: formik.values.p_applicant_persons__1__F__01,
      p_applicant_persons__1__F__02: formik.values.p_applicant_persons__1__F__02,
      p_applicant_persons__1__F__03: formik.values.p_applicant_persons__1__F__03,
      p_applicant_persons__1__K: formik.values.p_applicant_persons__1__K,
      p_applicant_persons__1__identity_verification_type:
        formik.values.p_applicant_persons__1__identity_verification_type,
    };
  }, [formik.values]);
  const handelLeft = () => {
    navigate(`/step-id-${apPreStepId}`);
  };

  const plan = useMemo(() => {
    if (
      p_applicant_persons__1__tax_return === '1' &&
      (p_applicant_persons__1__tax_return_reasons.includes('1') ||
        p_applicant_persons__1__tax_return_reasons.includes('2') ||
        p_applicant_persons__1__tax_return_reasons.includes('3') ||
        p_applicant_persons__1__tax_return_reasons.includes('6') ||
        p_applicant_persons__1__tax_return_reasons.includes('99'))
    ) {
      return 'B';
    } else {
      return 'A';
    }
  }, [p_applicant_persons__1__tax_return, p_applicant_persons__1__tax_return_reasons]);

  const identityVerificationOption = [
    {
      value: '1',
      label: '運転免許証',
      touched: formik.touched.p_applicant_persons__1__A__01__a && formik.touched.p_applicant_persons__1__A__01__b,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_applicant_persons__1__A__01__a" singleFile />
          </Stack>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈裏面〉
            </Typography>
            <ApImgUpload name="p_applicant_persons__1__A__01__b" singleFile />
          </Stack>
        </Stack>
      ),
    },
    {
      value: '2',
      label: 'マイナンバーカード',
      touched: formik.touched.p_applicant_persons__1__A__02,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_applicant_persons__1__A__02" singleFile />
          </Stack>
        </Stack>
      ),
    },
    {
      value: '3',
      label: '住民基本台帳カード',
      touched: formik.touched.p_applicant_persons__1__A__03__a && formik.touched.p_applicant_persons__1__A__03__b,
      imgUpload: (
        <Stack spacing={3} direction={'row'} alignItems={'start'} sx={{ width: 1, bgcolor: 'white', px: 3 }}>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈表面〉
            </Typography>
            <ApImgUpload name="p_applicant_persons__1__A__03__a" singleFile />
          </Stack>
          <Stack spacing={'6px'}>
            <Typography variant="label" color={'text.main'}>
              〈裏面〉
            </Typography>
            <ApImgUpload name="p_applicant_persons__1__A__03__b" singleFile />
          </Stack>
        </Stack>
      ),
    },
  ];

  return (
    <FormikProvider value={formik}>
      <ApErrorScroll />
      <ApLayout hasMenu hasStepBar pb={18}>
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
            name="p_applicant_persons__1__identity_verification_type"
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
                <ApImgUpload name="p_applicant_persons__1__B__a" singleFile />
              </Stack>
              <Stack spacing={'6px'}>
                <Typography variant="label" color={'text.main'}>
                  〈裏面〉
                </Typography>
                <ApImgUpload name="p_applicant_persons__1__B__b" singleFile />
              </Stack>
            </Stack>
          </Stack>
        </ApItemGroup>
        {plan === 'A' && p_applicant_persons__1__office_occupation === '1' && (
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
                  <ApImgUpload name="p_applicant_persons__1__C__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    源泉徴収票（前々年度分）
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__1__C__02" />
                </Stack>
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={`非上場企業の役員の方は\n下記の書類も添付してください。`}>
              <Stack spacing={3}>
                <ApStarHelp
                  label={'枚数が多い場合はPDFファイルをssnbmbk_info@ssnbagent.netbk.co.jp へメール送付してください。'}
                />
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（1期前）
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__1__D__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（2期前）
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__1__D__02" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    会社の決算報告書（3期前）
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__1__D__03" />
                </Stack>
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'A' && ['6', '7', '8'].includes(p_applicant_persons__1__office_occupation) && (
          <Stack>
            <ApItemGroup label={'収入に関する書類'}>
              <Stack
                spacing={'6px'}
                sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
              >
                <Typography variant="label" color={'text.main'}>
                  源泉徴収票（前年度分）
                </Typography>
                <ApImgUpload name="p_applicant_persons__1__C__01" />
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
                <ApImgUpload name="p_applicant_persons__1__E" />
              </Stack>
            </ApItemGroup>
          </Stack>
        )}

        {plan === 'A' && !['1', '6', '7', '8'].includes(p_applicant_persons__1__office_occupation) && (
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
                  <ApImgUpload name="p_applicant_persons__1__C__01" />
                </Stack>
                {(p_applicant_persons__1__income_sources.includes('2') ||
                  p_applicant_persons__1__income_sources.includes('3')) && (
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      源泉徴収票（前々年度分）
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__1__C__02" />
                  </Stack>
                )}
              </Stack>
            </ApItemGroup>
            <ApItemGroup label={`親族経営の会社等にご勤務の方は\n下記の書類も添付してください。`}>
              <Stack spacing={3}>
                <ApStarHelp
                  label={'枚数が多い場合はPDFファイルをssnbmbk_info@ssnbagent.netbk.co.jp へメール送付してください。'}
                />
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（1期前）`}
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__1__F__01" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（2期前）`}
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__1__F__02" />
                </Stack>
                <Stack
                  spacing={'6px'}
                  sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                >
                  <Typography variant="label" color={'text.main'}>
                    {`会社の決算報告書\nまたは経営する親族の確定申告書（3期前）`}
                  </Typography>
                  <ApImgUpload name="p_applicant_persons__1__F__03" />
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
                  <ApImgUpload name="p_applicant_persons__1__C__03" />
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
                  <ApImgUpload name="p_applicant_persons__1__C__04" />
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
                  <ApImgUpload name="p_applicant_persons__1__C__05" />
                </Stack>
              </Stack>
            </ApItemGroup>
            {p_applicant_persons__1__office_occupation === '1' && (
              <ApItemGroup label={`非上場企業の役員の方は\n下記の書類も添付してください。`}>
                <Stack spacing={3}>
                  <ApStarHelp
                    label={'枚数が多い場合はPDFファイルをssnbmbk_info@ssnbagent.netbk.co.jp へメール送付してください。'}
                  />
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（1期前）
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__1__D__01" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（2期前）
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__1__D__02" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      会社の決算報告書（3期前）
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__1__D__03" />
                  </Stack>
                </Stack>
              </ApItemGroup>
            )}

            {!['1', '5', '10'].includes(p_applicant_persons__1__office_occupation) && (
              <ApItemGroup label={`親族経営の会社等にご勤務の方は\n下記の書類も添付してください。`}>
                <Stack spacing={3}>
                  <ApStarHelp
                    label={'枚数が多い場合はPDFファイルをssnbmbk_info@ssnbagent.netbk.co.jp へメール送付してください。'}
                  />
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（1期前）`}
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__1__F__01" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（2期前）`}
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__1__F__02" />
                  </Stack>
                  <Stack
                    spacing={'6px'}
                    sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}
                  >
                    <Typography variant="label" color={'text.main'}>
                      {`会社の決算報告書\nまたは経営する親族の確定申告書（3期前）`}
                    </Typography>
                    <ApImgUpload name="p_applicant_persons__1__F__03" />
                  </Stack>
                </Stack>
              </ApItemGroup>
            )}
          </Stack>
        )}

        <ApItemGroup optional label={'その他の書類'}>
          <Stack sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)' }}>
            <ApImgUpload name="p_applicant_persons__1__K" />
          </Stack>
        </ApItemGroup>
        <ApSaveDraftButton pageInfo={parseVaildData} />
        <ApStepFooter left={handelLeft} right={formik.handleSubmit} />
      </ApLayout>
    </FormikProvider>
  );
};
