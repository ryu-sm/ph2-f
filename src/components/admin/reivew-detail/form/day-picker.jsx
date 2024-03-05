import { AdArrowDown } from '@/assets/icons/ad-arrow-down';
import { AdArrowUp } from '@/assets/icons/ad-arrow-up';
import { Button, Popover, Stack, Typography } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const DayPicker = ({ content }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (e) => setAnchorEl(e.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

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
                height: 190,
                minWidth: '100%',
                minHeight: 190,
              },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
              <StaticDatePicker
                sx={{
                  '& .MuiPickersDay-root': {
                    width: '20px',
                    height: '20px',
                    borderRadius: 0,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                    },
                  },

                  '& .MuiDateCalendar-root': {
                    '& .MuiPickersCalendarHeader-label ': {
                      width: '36px',
                      fontSize: '12px',
                    },
                    '& .MuiDayCalendar-weekDayLabel': {
                      width: '20px',
                      height: '20px',
                      '&:nth-child(1), &:nth-child(7)': {
                        backgroundColor: 'gray.80',
                      },
                    },
                  },

                  '& .MuiPickersCalendarHeader-root': {
                    paddingLeft: '8px',
                    position: 'fixed',
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

                  '& .MuiDateCalendar-viewTransitionContainer': {
                    marginTop: '55px',
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

                  '& .MuiPickersYear-root': {
                    '& .Mui-selected': {
                      backgroundColor: 'primary.main',
                    },
                  },
                }}
                displayStaticWrapperAs="desktop"
                ToolbarComponent={() => null}
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
};
