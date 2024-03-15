import { FormikProvider, useFormik } from 'formik';

import { usePreliminaryContext } from '@/hooks/use-preliminary-context';
import { ContentEditGroup } from '../../common/content-edit-group';
import { useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { ResultUploadItem } from '../../common/result-upload-item';
import { ResultPreviewPDF } from '../../common/examination-result-preview';

export const Item10 = () => {
  const {
    preliminaryInfo: { p_uploaded_files, p_result },
    setPreliminarySnap,
    handleSave,
    isEditable,
  } = usePreliminaryContext();

  const initialValues = {
    p_uploaded_files: {
      R: p_uploaded_files.R,
    },
  };

  const setUpdateData = (values) => {
    const diffData = {
      p_uploaded_files: {
        ...values.p_uploaded_files,
      },
    };
    return diffData;
  };

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
  });

  useEffect(() => {
    setPreliminarySnap((pre) => {
      return {
        ...pre,
        p_uploaded_files: {
          ...pre.p_uploaded_files,
          ...formik.values.p_uploaded_files,
        },
      };
    });
  }, [formik.values]);

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors]);

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  return (
    <FormikProvider value={formik}>
      <ContentEditGroup hiddenTitle hiddenLine>
        <Stack spacing={4} alignItems={'center'} overflow={'auto'} sx={{ py: 8 }}>
          {formik.values.p_uploaded_files.R.length > 0 ? (
            <ResultPreviewPDF
              file={formik.values.p_uploaded_files.R}
              onRemove={() => formik.setFieldValue('p_uploaded_files.R', [])}
            />
          ) : (
            <Stack flex={1} justifyContent={'center'} minHeight={550}>
              <ResultUploadItem name="p_uploaded_files.R" isDisabled={p_result.pre_examination_status !== '4'} />
            </Stack>
          )}
        </Stack>
      </ContentEditGroup>
    </FormikProvider>
  );
};
