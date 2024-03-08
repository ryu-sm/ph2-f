import checkboxIcon from '@/assets/images/checkbox-icon.png';
import unCheckIcon from '@/assets/images/uncheck-icon.png';
import { useTheme } from '@emotion/react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { FilterInput } from './filter-input';
export const CheckboxDropdown = ({ options, name }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const theme = useTheme();
  const handleClick = (selectedOption) => {
    setSelectedValues((prevValues) => {
      const foundItem = prevValues.find((item) => item.value === selectedOption.value);
      if (foundItem) {
        return prevValues.filter((item) => item.value !== selectedOption.value);
      } else {
        return [...prevValues, selectedOption];
      }
    });
  };

  const hasInput = useMemo(() => {
    return name === 'sale_person_names';
  }, [name]);

  const payloadData = useMemo(() => {
    return {
      [name]: selectedValues.map((val) => val.value),
    };
  }, [selectedValues]);

  // mock输入input的时候，没有模糊过滤到选项的情况
  const [showOptions, setShowOptions] = useState(true);
  const handleHideOptions = () => setShowOptions(false);

  return (
    <Stack bgcolor={'gray.20'} width={'100%'} py={'12px'} spacing={3}>
      {hasInput && (
        <Stack alignItems={'center'} spacing={3}>
          <Box
            sx={{
              px: '68px',
              width: '100%',
            }}
          >
            <FilterInput placeholder="キーワードを入力" handleHideOptions={handleHideOptions} />
          </Box>
          <Divider sx={{ width: '90%' }} />
        </Stack>
      )}
      <Stack minHeight={120} maxHeight={125} overflow={'auto'} spacing={3}>
        {showOptions &&
          options.map((option) => (
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
                  handleClick(option);
                }}
              >
                <img
                  src={selectedValues.some((val) => val.value === option.value) ? checkboxIcon : unCheckIcon}
                  alt=""
                  height={7}
                  width={9}
                />
              </Stack>
              <Typography variant="filter_drop_down">{option.label}</Typography>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

CheckboxDropdown.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
};
