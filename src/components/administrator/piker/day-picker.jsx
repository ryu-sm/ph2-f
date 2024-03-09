import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import { usePopoverPositionByClick } from '@/hooks/update-popover-position';
import { apGetPublicHolidays } from '@/services';
import { formatJapanDate } from '@/utils';
import { useField } from 'formik';
import { useTheme } from '@emotion/react';
import { Button, Popover, Stack, Typography } from '@mui/material';
import { LocalizationProvider, PickersDay, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { dayjs } from '@/libs';
import 'dayjs/locale/ja';

import { useEffect, useState } from 'react';

export const DayPicker = ({ content, maxDate, minDate, isBirthday, ...props }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const [currentYear, setCurrentYear] = useState(dayjs(meta.value).year());
  const [holidays, setHolidays] = useState([]);

  const { anchorOrigin, transformOrigin, updatePopoverPosition } = usePopoverPositionByClick();

  useEffect(() => {
    const fetchHolidays = async () => {
      const res = await apGetPublicHolidays(currentYear);
      const temp = localStorage.getItem('publicHolidays');
      if (!!temp) {
        localStorage.setItem('publicHolidays', JSON.stringify({ ...JSON.parse(temp), [currentYear]: res.data }));
      } else {
        localStorage.setItem('publicHolidays', JSON.stringify({ [currentYear]: res.data }));
      }
      res.data && setHolidays(res.data);
    };
    try {
      if (currentYear) fetchHolidays();
    } catch (error) {
      console.log(111);
    }
  }, [currentYear]);

  const handleChange = (newVal) => {
    setValue(newVal.format('YYYY/MM/DD'));
    handlePopoverClose();
  };

  const CustomizeRenderDay = (props) => {
    const { day } = props;
    const dateString = day.format('YYYY-MM-DD');

    const isHoliday = holidays.some((holiday) => holiday.date === dateString);
    const isWeekend = day.day() === 0 || day.day() === 6;
    return (
      <PickersDay
        {...props}
        disableMargin
        sx={{
          ...(isWeekend && {
            backgroundColor: theme.palette.gray[60],
          }),
          ...(isHoliday &&
            !isBirthday && {
              backgroundColor: theme.palette.secondary[60],
              color: 'white !important',
            }),
          '&:hover': {
            backgroundColor: isHoliday && !isBirthday ? theme.palette.secondary[60] : theme.palette.gray[20],
          },
        }}
      />
    );
  };

  const dayPickerStyles = {
    '& .MuiPickersDay-root': {
      width: '20px',
      height: '20px',
      borderRadius: 0,
    },
    '& .MuiPickersSlideTransition-root': {
      minHeight: '130px',
    },

    '& .MuiDateCalendar-root': {
      height: 'auto',
      '& .MuiPickersCalendarHeader-label ': {
        width: '36px',
        fontSize: '12px',
      },
      '& .MuiDayCalendar-weekDayLabel': {
        width: '20px',
        height: '20px',
        '&:nth-of-type(1), &:nth-of-type(7)': {
          backgroundColor: theme.palette.gray[60],
        },
      },
    },

    '& .MuiTypography-root.MuiDayCalendar-weekDayLabel': {
      margin: 0,
    },

    '& .MuiDayCalendar-header': {
      marginTop: '10px',
    },
    '& .MuiDayCalendar-weekContainer': {
      marginY: 0,
    },

    '& .MuiPickersCalendarHeader-root': {
      paddingLeft: '8px',
      '& button': {
        padding: 0,
      },
    },
    '& .MuiPickersArrowSwitcher-root': {
      '& button': {
        padding: 1,
        '&:first-of-type': {
          marginRight: '8px',
        },
      },
      '& .MuiSvgIcon-root': {
        width: '14px',
        height: '14px',
      },
    },

    '& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected': {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },

    '& .MuiYearCalendar-root': {
      padding: 0,
      width: '100%',
      flexBasis: '33.3%',
      '& button': {
        width: '46px',
        fontFamily: 'Roboto',
        fontSize: '14px',
        fontWeight: 400,
      },
    },
    '& .MuiPickersYear-yearButton.Mui-selected': {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  };

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
      <Typography variant="edit_content">{formatJapanDate(meta.value, true)}</Typography>

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
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

          <Stack
            sx={{
              px: 1,
              '& > div > div, & > div > div > div, & .MuiPickersLayout-root': {
                width: '100%',
                minWidth: '100%',
              },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
              <StaticDatePicker
                name={field.name}
                sx={{ ...dayPickerStyles }}
                maxDate={maxDate}
                minDate={minDate}
                displayStaticWrapperAs="desktop"
                ToolbarComponent={() => null}
                value={dayjs(meta.value)}
                slots={{
                  day: CustomizeRenderDay,
                }}
                onChange={handleChange}
                onYearChange={(date) => {
                  setCurrentYear(date.year());
                }}
              />
            </LocalizationProvider>
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  );
};
