import checkboxIcon from '@/assets/images/checkbox-icon.png';
import unCheckIcon from '@/assets/images/uncheck-icon.png';
import { useTheme } from '@emotion/react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { FilterInput } from '@/components/administrator/input';
import { FormikProvider, useField, useFormik } from 'formik';

export const CheckboxDropdown = ({ options, hasFilter, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue, setError } = helpers;
  const theme = useTheme();
  const handleClick = (selectedValue) => {
    const foundItem = meta.value.includes(selectedValue);

    if (foundItem) {
      setValue(meta.value.filter((item) => item !== selectedValue));
    } else {
      setValue([...meta.value, selectedValue]);
    }
  };

  const [inputValue, setInputValue] = useState('');

  const formik = useFormik({
    initialValues: {
      filterValue: '',
    },
  });
  const filteredOptions = useMemo(() => {
    return formik.values.filterValue
      ? options.filter((option) => option.label.toLowerCase().includes(formik.values.filterValue.toLowerCase()))
      : options;
  }, [formik.values, options]);

  return (
    <Stack bgcolor={'gray.20'} width={'100%'} py={4} spacing={3}>
      {hasFilter && (
        <Stack alignItems={'center'} spacing={3}>
          <Box
            sx={{
              px: '68px',
              width: '100%',
            }}
          >
            <FormikProvider value={formik}>
              <FilterInput placeholder="キーワードを入力" name="filterValue" />
            </FormikProvider>
          </Box>
          <Divider sx={{ width: '90%' }} />
        </Stack>
      )}
      <Stack maxHeight={125} minHeight={hasFilter ? 120 : 0} overflow={'auto'} spacing={3}>
        {filteredOptions.map((option) => (
          <Stack key={option.value} direction={'row'} alignItems={'center'} spacing={1} px={'68px'}>
            <Stack
              direction={'row'}
              justifyContent="center"
              alignItems="center"
              bgcolor="main_white"
              height={15}
              width={15}
              border={`1px solid ${theme.palette.primary.main}`}
              borderRadius={1}
              onClick={() => {
                handleClick(option.value);
              }}
            >
              <img src={meta.value.includes(option.value) ? checkboxIcon : unCheckIcon} alt="" height={7} width={9} />
            </Stack>
            <Typography variant="filter_drop_down">{option.label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
