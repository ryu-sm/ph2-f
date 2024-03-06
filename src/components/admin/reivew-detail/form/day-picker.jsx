import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import { usePopoverPositionByClick } from '@/hooks/update-popover-position';
import { apGetPublicHolidays } from '@/services';
import { convertToJanpaneseEra } from '@/utils';
import { useTheme } from '@emotion/react';
import { Button, Popover, Stack, Typography } from '@mui/material';
import { LocalizationProvider, PickersDay, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

export const DayPicker = ({ content, maxDate, minDate, isBirthday }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const [currentDay, setCurrentDay] = useState(dayjs(content));
  const [currentYear, setCurrentYear] = useState(dayjs(content).year());
  const [holidays, setHolidays] = useState([]);

  const { anchorOrigin, transformOrigin, updatePopoverPosition } = usePopoverPositionByClick();

  useEffect(() => {
    const fetchHolidays = async () => {
      const res = await apGetPublicHolidays(currentYear);
      res.data && setHolidays(res.data);
    };
    fetchHolidays();
  }, [currentYear]);

  const showDate = useMemo(() => {
    return convertToJanpaneseEra(content);
  }, [content]);

  const handleChange = (newVal) => {
    setCurrentDay(newVal);
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
  CustomizeRenderDay.propTypes = {
    day: PropTypes.object,
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
        onClick={(e) => {
          handlePopoverOpen(e);
          updatePopoverPosition(e);
        }}
      >
        <AdArrowDown sx={{ width: 8, height: 8, color: 'gray.80' }} />
      </Button>
      <Typography variant="edit_content">{showDate}</Typography>

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
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
                sx={{ ...dayPickerStyles }}
                maxDate={maxDate}
                minDate={minDate}
                displayStaticWrapperAs="desktop"
                ToolbarComponent={() => null}
                value={currentDay}
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

DayPicker.propTypes = {
  content: PropTypes.string,
  maxDate: PropTypes.instanceOf(dayjs),
  minDate: PropTypes.instanceOf(dayjs),
  isBirthday: PropTypes.bool,
};
