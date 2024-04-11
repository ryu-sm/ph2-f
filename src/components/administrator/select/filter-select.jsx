import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { formatNumber } from '@/utils';
import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { useCallback, useMemo, useRef } from 'react';

export const FilterSelect = ({ options, unit, width, hasError, isFormatMonet, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const currentValueRef = useRef('');

  const handleChange = useCallback(
    async (e, child) => {
      currentValueRef.current = e.target.value;
      field.onChange(e);
      props.onChange && props.onChange(e, child);
      await setValue(e.target.value);
    },
    [field, props, setValue]
  );

  const renderIconComponent = () => (
    <AdArrowDown
      sx={{
        width: 10,
        height: 10,
        position: 'absolute',
        right: 3,
        top: 'calc(50% - 4px)',
        pointerEvents: 'none',
      }}
    />
  );

  const renderValue = useMemo(
    () =>
      !!field.value
        ? () => {
            const selectedOption = options.find((option) => option.value === field.value);
            return isFormatMonet ? (
              <Typography variant="filter_select_render_value">{formatNumber(selectedOption?.value, '')}</Typography>
            ) : (
              <Typography variant="filter_select_render_value">
                {unit.includes('日') ? selectedOption?.label : selectedOption?.value}
              </Typography>
            );
          }
        : () => <Typography variant="filter_select_placeHolder">ー</Typography>,
    [field.value]
  );

  return (
    <Stack direction={'row'} alignItems={'flex-end'} spacing={'2px'}>
      <Select
        {...props}
        {...field}
        variant="standard"
        displayEmpty
        onChange={handleChange}
        sx={{
          height: 30,
          width: width || 100,
          '& .MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input': {
            paddingRight: 0,
            bgcolor: hasError ? 'secondary.20' : 'none',
          },
        }}
        error={hasError}
        IconComponent={renderIconComponent}
        renderValue={renderValue}
        onClose={() => {
          props?.onClose && props.onClose(currentValueRef.current);
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Typography
              sx={{
                fontFamily: 'Hiragino Sans',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: 0.4,
                color: 'text.normal',
              }}
            >
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
      <Typography variant="fliter_select">{unit}</Typography>
    </Stack>
  );
};
