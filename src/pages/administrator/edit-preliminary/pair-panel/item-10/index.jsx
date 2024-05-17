import { FormikProvider, useFormik } from 'formik';
import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { Fragment, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { ResultUploadItem } from '../../common/result-upload-item';
import { ResultPreviewPDF } from '../../common/examination-result-preview';
import { useIsManager } from '@/hooks';

export const Item10 = () => {
  const {
    preliminaryInfo: { p_application_headers, p_result },
    setPreliminarySnap,
  } = usePreliminaryContext();
  const isEditable = false;

  const isManager = useIsManager();

  const initialValues = {
    p_application_headers: {
      R: p_application_headers.R,
    },
  };

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
  });

  useEffect(() => {
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_application_headers: {
          ...pre.p_application_headers,
          ...formik.values.p_application_headers,
        },
      };
    });
  }, [formik.values]);

  return (
    <FormikProvider value={formik}>
      <ContentEditGroup hiddenTitle hiddenLine>
        <Stack spacing={4} alignItems={'center'} overflow={'auto'} sx={{ py: 8 }}>
          {isManager ? (
            <Fragment>
              {formik.values.p_application_headers.R.length > 0 ? (
                <ResultPreviewPDF file={formik.values.p_application_headers.R} />
              ) : (
                <Stack flex={1} justifyContent={'center'} minHeight={550}>
                  <ResultUploadItem name="p_application_headers.R" isDisabled={true} />
                </Stack>
              )}
            </Fragment>
          ) : (
            <Fragment>
              {formik.values.p_application_headers.R.length > 0 && Number(p_result.pre_examination_status) >= 5 ? (
                <ResultPreviewPDF file={formik.values.p_application_headers.R} />
              ) : (
                <Stack flex={1} justifyContent={'center'} minHeight={550}>
                  <Typography
                    fontFamily={'Hiragino Sans'}
                    whiteSpace={'break-spaces'}
                    textAlign={'center'}
                    lineHeight={'120%'}
                    fontSize={30}
                    fontWeight={600}
                  >{`現在仮審査中です。\n仮審査結果が出るまでお待ちください。`}</Typography>
                </Stack>
              )}
            </Fragment>
          )}
        </Stack>
      </ContentEditGroup>
    </FormikProvider>
  );
};
