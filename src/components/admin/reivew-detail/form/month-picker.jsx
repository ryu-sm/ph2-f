import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Button, IconButton, Popover, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const MonthPicker = ({ content }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const [currentMonth, setCurrentMonth] = useState('4月');
  const [currentYear, setCurrentYear] = useState('2022');
  const [toggleExpand, setToggleExpand] = useState(false);

  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const years = ['2024', '2025', '2026', '2027', '2028'];
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={3}>
      <Button
        sx={{
          width: 20,
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
        onClick={handlePopoverOpen}
      >
        <AdArrowDown sx={{ width: 8, height: 8, color: 'gray.80' }} />
      </Button>
      <Typography variant="edit_content">{content}</Typography>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        sx={{
          top: '0',
          left: -130,
          '.MuiPopover-paper': {
            overflow: 'visible',
            boxShadow: 'none',
            borderRadius: '2px',
          },
        }}
      >
        <Stack
          width={'150px'}
          overflow={'hidden'}
          sx={{
            border: '1px solid',
            borderColor: 'gray.80',
            width: 150,
            borderRadius: '2px',
          }}
        >
          <Stack
            width={'100%'}
            height={20}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            borderBottom={'1px solid'}
            borderColor={'gray.80'}
            bgcolor={'white'}
            px={2}
          >
            <AdArrowUp sx={{ width: 8, height: 8, color: 'gray.80', cursor: 'pointer' }} onClick={handlePopoverClose} />
          </Stack>

          <Stack pt={2} pb={4} width={'100%'}>
            <Stack bgcolor={'white'} direction={'row'} spacing={5} mx={2}>
              <Stack>
                <Typography variant="edit_month">{currentMonth}</Typography>
                <Typography variant="edit_month">{currentYear}</Typography>
              </Stack>
              <IconButton onClick={() => setToggleExpand(!toggleExpand)}>
                {toggleExpand ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              </IconButton>
            </Stack>

            <Stack
              width={'100%'}
              direction={'row'}
              alignItems={'center'}
              flexWrap={'wrap'}
              justifyContent={'flex-start'}
              px={1}
              mt={3}
            >
              {toggleExpand
                ? months.map((month) => {
                    return (
                      <IconButton
                        key={month}
                        sx={{
                          flex: '1 1 30%',
                          px: '2px',
                          mt: 2,
                          fontSize: 16,
                          bgcolor: month === currentMonth ? 'primary.main' : 'white',
                          color: month === currentMonth ? 'white' : 'gray.100',
                          borderRadius: '18px',
                          '&:hover': { bgcolor: month === currentMonth ? 'primary.main' : 'gray.40' },
                        }}
                        onClick={() => {
                          setCurrentMonth(month);
                          handlePopoverClose();
                        }}
                      >
                        {month}
                      </IconButton>
                    );
                  })
                : years.map((year) => {
                    return (
                      <IconButton
                        key={year}
                        sx={{
                          width: '46px',
                          py: '10px',
                          fontSize: 14,
                          bgcolor: year === currentYear ? 'primary.main' : 'white',
                          color: year === currentYear ? 'white' : 'gray.100',
                          borderRadius: '18px',
                          '&:hover': { bgcolor: year === currentYear ? 'primary.main' : 'gray.40' },
                        }}
                        onClick={() => {
                          setCurrentYear(year);
                          handlePopoverClose();
                        }}
                      >
                        {year}
                      </IconButton>
                    );
                  })}
            </Stack>
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  );
};

MonthPicker.propTypes = {
  content: PropTypes.string,
};
