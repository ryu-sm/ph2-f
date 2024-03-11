import { Icons } from '@/assets';
import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import { usePopoverPositionByClick } from '@/hooks/update-popover-position';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';

import { useCallback, useEffect, useMemo, useState } from 'react';

export const PlannedResidentSelect = ({ arrayHelpers, ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const formik = useFormikContext();
  const [field, meta, helpers] = useField(props);
  const { setValue, setError } = helpers;
  const handleChange = useCallback(
    async (value) => {
      const temp = meta.value.includes(value) ? meta.value.filter((item) => item !== value) : [...meta.value, value];
      props.onChange && props.onChange(temp);
      await setValue(temp);
    },
    [meta, setValue]
  );
  const handlePopoverOpen = (e) => {
    setAnchorEl(e.currentTarget);
    setError('');
  };
  const handlePopoverClose = () => setAnchorEl(null);

  const { anchorOrigin, transformOrigin, updatePopoverPosition } = usePopoverPositionByClick();

  const conter = useMemo(() => {
    const conter = [];
    if (meta.value.spouse_umu) conter.push(`配偶者`);
    if (meta.value.children_umu) conter.push(`子ども（${meta.value.children}人）`);
    if (meta.value.father_umu) conter.push(`父`);
    if (meta.value.mother_umu) conter.push(`母`);
    if (meta.value.brothers_sisters_umu) conter.push(`兄弟姉妹（${meta.value.brothers_sisters}人）`);
    if (meta.value.fiance_umu) conter.push(`婚約者`);
    if (meta.value.others_umu) conter.push(`その他（${meta.value.others}人）`);

    return conter.join('・');
  }, [meta.value]);

  const sun = useMemo(() => {
    return (
      Number(meta.value.spouse) +
      Number(meta.value.children) +
      Number(meta.value.father) +
      Number(meta.value.mother) +
      Number(meta.value.brothers_sisters) +
      Number(meta.value.fiance) +
      Number(meta.value.others)
    );
  }, [meta.value]);

  const basic = {
    id: '',
    one_roof: '',
    last_name_kanji: '',
    first_name_kanji: '',
    last_name_kana: '',
    first_name_kana: '',
    gender: '',
    rel_to_applicant_a: '',
    rel_to_applicant_a_other: '',
    birthday: '',
  };
  useEffect(() => {
    console.log(meta.value);
  }, []);
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
      <Button
        sx={{
          width: open ? 150 : 20,
          height: 20,
          minWidth: 0,
          padding: 0,
          boxShadow: 'none',
          border: (theme) => `1px solid ${theme.palette.gray[80]}`,
          bgcolor: 'white',
          color: 'gray.80',
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
        onClick={(e) => {
          handlePopoverOpen(e);
          updatePopoverPosition(e);
        }}
      >
        <AdArrowDown sx={{ width: 8, height: 8, color: 'gray.80' }} />
      </Button>
      <Typography variant="edit_content">{conter}</Typography>

      <Popover
        open={open}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        sx={{
          top: 0,
          left: 0,
          '.MuiPopover-paper': {
            overflow: 'visible',
            boxShadow: 'none',
            borderRadius: '2px',
          },
        }}
      >
        <Stack
          sx={{
            width: 150,
            overflow: 'hidden',
            borderRadius: '2px',
            border: (theme) => `1px solid ${theme.palette.gray[80]}`,
          }}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            sx={{
              px: 2,
              width: 1,
              height: 20,
              bgcolor: 'white',
              cursor: 'pointer',
              borderBottom: (theme) => `1px solid ${theme.palette.gray[80]}`,
            }}
            onClick={handlePopoverClose}
          >
            <AdArrowUp sx={{ width: 8, height: 8, color: 'gray.80' }} />
          </Stack>

          <Stack width={'100%'}>
            {meta.value?.fiance_umu === false && (
              <Stack
                direction={'row'}
                alignItems={'center'}
                p={1}
                spacing={2}
                borderBottom={'1px solid'}
                borderColor={'gray.80'}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: 20,
                    cursor: 'pointer',
                    color: meta.value?.spouse_umu ? 'primary.main' : 'gray.60',
                  }}
                  onClick={() => {
                    if (!meta.value?.spouse_umu) {
                      setValue({
                        ...meta.value,
                        fiance_umu: false,
                        fiance: '',
                      });
                      if (sun < 6) {
                        arrayHelpers.push({ ...basic, rel_to_applicant_a: '1' });
                      }
                    } else {
                      const deleteIndex = formik.values.p_residents.findIndex(
                        (item) => item.rel_to_applicant_a === '1'
                      );
                      arrayHelpers.remove(deleteIndex);
                    }
                    setValue({
                      ...meta.value,
                      spouse_umu: !meta.value?.spouse_umu,
                      spouse: meta.value?.spouse_umu ? '' : '1',
                    });
                  }}
                />
                <Typography variant="select_options" color={'text.normal'}>
                  配偶者
                </Typography>
              </Stack>
            )}
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              borderBottom={'1px solid'}
              borderColor={'gray.80'}
            >
              <Stack direction={'row'} alignItems={'center'} p={1} spacing={2}>
                <CheckCircleIcon
                  sx={{
                    fontSize: 20,
                    cursor: 'pointer',
                    color: meta.value?.children_umu ? 'primary.main' : 'gray.60',
                  }}
                  onClick={() => {
                    if (!meta.value?.children_umu) {
                      if (sun < 6) {
                        arrayHelpers.push({ ...basic, rel_to_applicant_a: '2' });
                      }
                    } else {
                      const deleteIndexList = [];
                      formik.values.p_residents.forEach((item, index) => {
                        if (item.rel_to_applicant_a === '2') {
                          deleteIndexList.push(index);
                        }
                      });
                      deleteIndexList.forEach((deleteIndex) => arrayHelpers.remove(deleteIndex));
                    }
                    setValue({
                      ...meta.value,
                      children_umu: !meta.value?.children_umu,
                      children: meta.value?.children_umu ? '' : '1',
                    });
                  }}
                />
                <Typography variant="select_options" color={'text.normal'}>
                  子ども
                </Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} p={1}>
                <Button
                  sx={{
                    width: 16,
                    height: 16,
                    minWidth: 0,
                    padding: 0,
                    boxShadow: 'none',
                    bgcolor: 'white',
                    color: 'gray.80',
                    '&:hover': {
                      backgroundColor: 'white',
                    },
                  }}
                  disabled={!meta.value?.children_umu}
                  onClick={() => {
                    if (Number(meta.value?.children) > 1) {
                      setValue({
                        ...meta.value,
                        children: `${Number(meta.value?.children) - 1}`,
                      });
                      const deleteIndexList = [];
                      formik.values.p_residents.forEach((item, index) => {
                        if (item.rel_to_applicant_a === '2') {
                          deleteIndexList.push(index);
                        }
                      });
                      arrayHelpers.remove(deleteIndexList[deleteIndexList.length - 1]);
                    }
                  }}
                >
                  <Icons.AdSubtractIcon sx={{ width: 16, height: 16 }} />
                </Button>
                <Stack alignItems={'center'} justifyContent={'center'} sx={{ width: 16, height: 16 }}>
                  <Typography variant="edit_content_title" color={'gray.100'} lineHeight={'100%'} fontWeight={600}>
                    {Number(meta.value?.children)}
                  </Typography>
                </Stack>
                <Button
                  sx={{
                    width: 16,
                    height: 16,
                    minWidth: 0,
                    padding: 0,
                    boxShadow: 'none',
                    bgcolor: 'white',
                    color: 'gray.80',
                    '&:hover': {
                      backgroundColor: 'white',
                    },
                  }}
                  disabled={!meta.value?.children_umu}
                  onClick={() => {
                    if (Number(meta.value?.children) < 9) {
                      setValue({
                        ...meta.value,
                        children: `${Number(meta.value?.children) + 1}`,
                      });
                      if (sun < 6) {
                        arrayHelpers.push({ ...basic, rel_to_applicant_a: '2' });
                      }
                    }
                  }}
                >
                  <Icons.AdAddIcon sx={{ width: 16, height: 16 }} />
                </Button>
              </Stack>
            </Stack>

            <Stack
              direction={'row'}
              alignItems={'center'}
              p={1}
              spacing={2}
              borderBottom={'1px solid'}
              borderColor={'gray.80'}
            >
              <CheckCircleIcon
                sx={{
                  fontSize: 20,
                  cursor: 'pointer',
                  color: meta.value?.father_umu ? 'primary.main' : 'gray.60',
                }}
                onClick={() => {
                  if (!meta.value?.father_umu) {
                    if (sun < 6) {
                      arrayHelpers.push({ ...basic, rel_to_applicant_a: '3' });
                    }
                  } else {
                    const deleteIndexList = [];
                    formik.values.p_residents.forEach((item, index) => {
                      if (item.rel_to_applicant_a === '3') {
                        deleteIndexList.push(index);
                      }
                    });
                    deleteIndexList.forEach((deleteIndex) => arrayHelpers.remove(deleteIndex));
                  }
                  setValue({
                    ...meta.value,
                    father_umu: !meta.value?.father_umu,
                    father: meta.value?.father_umu ? '' : '1',
                  });
                }}
              />
              <Typography variant="select_options" color={'text.normal'}>
                父
              </Typography>
            </Stack>

            <Stack
              direction={'row'}
              alignItems={'center'}
              p={1}
              spacing={2}
              borderBottom={'1px solid'}
              borderColor={'gray.80'}
            >
              <CheckCircleIcon
                sx={{
                  fontSize: 20,
                  cursor: 'pointer',
                  color: meta.value?.mother_umu ? 'primary.main' : 'gray.60',
                }}
                onClick={() => {
                  if (!meta.value?.mother_umu) {
                    if (sun < 6) {
                      arrayHelpers.push({ ...basic, rel_to_applicant_a: '4' });
                    }
                  } else {
                    const deleteIndexList = [];
                    formik.values.p_residents.forEach((item, index) => {
                      if (item.rel_to_applicant_a === '4') {
                        deleteIndexList.push(index);
                      }
                    });
                    deleteIndexList.forEach((deleteIndex) => arrayHelpers.remove(deleteIndex));
                  }
                  setValue({
                    ...meta.value,
                    mother_umu: !meta.value?.mother_umu,
                    mother: meta.value?.mother_umu ? '' : '1',
                  });
                }}
              />
              <Typography variant="select_options" color={'text.normal'}>
                母
              </Typography>
            </Stack>

            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              borderBottom={'1px solid'}
              borderColor={'gray.80'}
            >
              <Stack direction={'row'} alignItems={'center'} p={1} spacing={2}>
                <CheckCircleIcon
                  sx={{
                    fontSize: 20,
                    cursor: 'pointer',
                    color: meta.value?.brothers_sisters_umu ? 'primary.main' : 'gray.60',
                  }}
                  onClick={() => {
                    if (!meta.value?.brothers_sisters_umu) {
                      if (sun < 6) {
                        arrayHelpers.push({ ...basic, rel_to_applicant_a: '5' });
                      }
                    } else {
                      const deleteIndexList = [];
                      formik.values.p_residents.forEach((item, index) => {
                        if (item.rel_to_applicant_a === '5') {
                          deleteIndexList.push(index);
                        }
                      });
                      deleteIndexList.forEach((deleteIndex) => arrayHelpers.remove(deleteIndex));
                    }
                    setValue({
                      ...meta.value,
                      brothers_sisters_umu: !meta.value?.brothers_sisters_umu,
                      brothers_sisters: meta.value?.brothers_sisters_umu ? '' : '1',
                    });
                  }}
                />
                <Typography variant="select_options" color={'text.normal'}>
                  兄弟姉妹
                </Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} p={1}>
                <Button
                  sx={{
                    width: 16,
                    height: 16,
                    minWidth: 0,
                    padding: 0,
                    boxShadow: 'none',
                    bgcolor: 'white',
                    color: 'gray.80',
                    '&:hover': {
                      backgroundColor: 'white',
                    },
                  }}
                  disabled={!meta.value?.brothers_sisters_umu}
                  onClick={() => {
                    if (Number(meta.value?.brothers_sisters) > 1) {
                      setValue({
                        ...meta.value,
                        brothers_sisters: `${Number(meta.value?.brothers_sisters) - 1}`,
                      });
                      const deleteIndexList = [];
                      formik.values.p_residents.forEach((item, index) => {
                        if (item.rel_to_applicant_a === '5') {
                          deleteIndexList.push(index);
                        }
                      });
                      arrayHelpers.remove(deleteIndexList[deleteIndexList.length - 1]);
                    }
                  }}
                >
                  <Icons.AdSubtractIcon sx={{ width: 16, height: 16 }} />
                </Button>
                <Stack alignItems={'center'} justifyContent={'center'} sx={{ width: 16, height: 16 }}>
                  <Typography variant="edit_content_title" color={'gray.100'} lineHeight={'100%'} fontWeight={600}>
                    {Number(meta.value?.brothers_sisters)}
                  </Typography>
                </Stack>
                <Button
                  sx={{
                    width: 16,
                    height: 16,
                    minWidth: 0,
                    padding: 0,
                    boxShadow: 'none',
                    bgcolor: 'white',
                    color: 'gray.80',
                    '&:hover': {
                      backgroundColor: 'white',
                    },
                  }}
                  disabled={!meta.value?.brothers_sisters_umu}
                  onClick={() => {
                    if (Number(meta.value?.brothers_sisters) < 9) {
                      setValue({
                        ...meta.value,
                        brothers_sisters: `${Number(meta.value?.brothers_sisters) + 1}`,
                      });
                      if (sun < 6) {
                        arrayHelpers.push({ ...basic, rel_to_applicant_a: '5' });
                      }
                    }
                  }}
                >
                  <Icons.AdAddIcon sx={{ width: 16, height: 16 }} />
                </Button>
              </Stack>
            </Stack>

            {meta.value?.spouse_umu === false && (
              <Stack
                direction={'row'}
                alignItems={'center'}
                p={1}
                spacing={2}
                borderBottom={'1px solid'}
                borderColor={'gray.80'}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: 20,
                    cursor: 'pointer',
                    color: meta.value?.fiance_umu ? 'primary.main' : 'gray.60',
                  }}
                  onClick={() => {
                    if (!meta.value?.fiance_umu) {
                      setValue({
                        ...meta.value,
                        spouse_umu: false,
                        spouse: '',
                      });
                      if (sun < 6) {
                        arrayHelpers.push({ ...basic, rel_to_applicant_a: '6' });
                      }
                    } else {
                      const deleteIndex = formik.values.p_residents.findIndex(
                        (item) => item.rel_to_applicant_a === '6'
                      );
                      arrayHelpers.remove(deleteIndex);
                    }
                    setValue({
                      ...meta.value,
                      fiance_umu: !meta.value?.fiance_umu,
                      fiance: meta.value?.fiance_umu ? '' : '1',
                    });
                  }}
                />
                <Typography variant="select_options" color={'text.normal'}>
                  婚約者
                </Typography>
              </Stack>
            )}

            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'row'} alignItems={'center'} p={1} spacing={2}>
                <CheckCircleIcon
                  sx={{
                    fontSize: 20,
                    cursor: 'pointer',
                    color: meta.value?.others_umu ? 'primary.main' : 'gray.60',
                  }}
                  onClick={() => {
                    if (!meta.value?.others_umu) {
                      if (sun < 6) {
                        arrayHelpers.push({ ...basic, rel_to_applicant_a: '99' });
                      }
                    } else {
                      const deleteIndexList = [];
                      formik.values.p_residents.forEach((item, index) => {
                        if (item.rel_to_applicant_a === '99') {
                          deleteIndexList.push(index);
                        }
                      });
                      deleteIndexList.forEach((deleteIndex) => arrayHelpers.remove(deleteIndex));
                    }
                    setValue({
                      ...meta.value,
                      others_umu: !meta.value?.others_umu,
                      others: meta.value?.others_umu ? '' : '1',
                    });
                  }}
                />
                <Typography variant="select_options" color={'text.normal'}>
                  その他
                </Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} p={1}>
                <Button
                  sx={{
                    width: 16,
                    height: 16,
                    minWidth: 0,
                    padding: 0,
                    boxShadow: 'none',
                    bgcolor: 'white',
                    color: 'gray.80',
                    '&:hover': {
                      backgroundColor: 'white',
                    },
                  }}
                  disabled={!meta.value?.others_umu}
                  onClick={() => {
                    if (Number(meta.value?.others) > 1) {
                      setValue({
                        ...meta.value,
                        others: `${Number(meta.value?.others) - 1}`,
                      });
                      const deleteIndexList = [];
                      formik.values.p_residents.forEach((item, index) => {
                        if (item.rel_to_applicant_a === '99') {
                          deleteIndexList.push(index);
                        }
                      });
                      arrayHelpers.remove(deleteIndexList[deleteIndexList.length - 1]);
                    }
                  }}
                >
                  <Icons.AdSubtractIcon sx={{ width: 16, height: 16 }} />
                </Button>
                <Stack alignItems={'center'} justifyContent={'center'} sx={{ width: 16, height: 16 }}>
                  <Typography variant="edit_content_title" color={'gray.100'} lineHeight={'100%'} fontWeight={600}>
                    {Number(meta.value?.others)}
                  </Typography>
                </Stack>
                <Button
                  sx={{
                    width: 16,
                    height: 16,
                    minWidth: 0,
                    padding: 0,
                    boxShadow: 'none',
                    bgcolor: 'white',
                    color: 'gray.80',
                    '&:hover': {
                      backgroundColor: 'white',
                    },
                  }}
                  disabled={!meta.value?.others_umu}
                  onClick={() => {
                    if (Number(meta.value?.others) < 9) {
                      setValue({
                        ...meta.value,
                        others: `${Number(meta.value?.others) + 1}`,
                      });
                      if (sun < 6) {
                        arrayHelpers.push({ ...basic, rel_to_applicant_a: '99' });
                      }
                    }
                  }}
                >
                  <Icons.AdAddIcon sx={{ width: 16, height: 16 }} />
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  );
};
