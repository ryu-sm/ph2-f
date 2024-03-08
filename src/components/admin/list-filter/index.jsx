import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Modal, Stack, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Applicant } from './applicant';
import { CheckboxDropdown } from './checkbox-dropdown';
import { DateSelect } from './date-select';
import { FilterItem } from './filter-item';

export const ListFilter = ({ open, onClose, type }) => {
  const title = useMemo(() => {
    return type === 'underReview' ? '仮審査中の案件の絞り込み' : '過去の案件の絞り込み';
  }, [type]);
  const theme = useTheme();

  const mockBankOptions = [
    {
      value: '0038',
      label: '住信ＳＢＩネット銀行',
    },
    {
      value: '6670',
      label: 'MCJ（日本住宅ローン）',
    },
  ];

  const mockOfficeOptions = [
    {
      value: 'tokyo_nishi_office',
      label: '東京西営業所',
    },
    {
      value: 'tokyo_higashi_office',
      label: '東京東営業所',
    },
    {
      value: 'test_office',
      label: 'テスト営業所',
    },
  ];
  const mockBranchOptions = [
    {
      value: 'tokyo_branch',
      label: '東京支店',
    },
    {
      value: 'kanagawa_branch',
      label: '神奈川支店',
    },
    {
      value: 'test_branch',
      label: 'テスト＿支店',
    },
  ];

  const mockExhibitionHallOptions = [
    {
      value: 1,
      label: '展示場 １',
    },
    {
      value: 2,
      label: '展示場 ２',
    },
    {
      value: 3,
      label: '展示場 ３',
    },
    {
      value: 4,
      label: '展示場 ４',
    },
    {
      value: 5,
      label: '展示場 5',
    },
    {
      value: 6,
      label: '展示場 6',
    },
    {
      value: 'test_1',
      label: 'テスト展示場 1',
    },
    {
      value: 'test_2',
      label: 'テスト展示場 2',
    },
  ];

  const mockSalePersonOptions = [
    {
      value: 1,
      label: '担当者　C3-001名前',
    },
    {
      value: 2,
      label: '担当者　C3-002名前',
    },
    {
      value: 3,
      label: '担当者　C3-003名前',
    },
  ];
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiBackdrop-root': {
          backgroundColor: alpha(theme.palette.primary[60], 0.7),
        },
      }}
    >
      <Stack
        sx={{
          width: 485,
          height: 680,
          backgroundColor: 'gray.20',
          boxShadow:
            'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
          height={50}
          bgcolor={'white'}
          borderBottom={'1px solid'}
          borderColor={'gray.70'}
          px={2}
        >
          <Typography variant="filter_clear_button">すべてクリア</Typography>
          <Typography variant="ad_modal_title">{title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack px={'20px'} pt={'20px'} flexGrow={1} overflow={'auto'} spacing={'2px'}>
          <FilterItem
            label="申込銀行"
            dropDownItem={<CheckboxDropdown options={mockBankOptions} name={'master_bank_codes'} />}
          />
          <FilterItem
            label="営業所"
            dropDownItem={<CheckboxDropdown options={mockOfficeOptions} name={'office_names'} />}
          />
          <FilterItem
            label="支店"
            dropDownItem={<CheckboxDropdown options={mockBranchOptions} name={'branch_names'} />}
          />
          <FilterItem
            label="展示場"
            dropDownItem={<CheckboxDropdown options={mockExhibitionHallOptions} name={'exhibition_hall_names'} />}
          />
          <FilterItem
            label="営業担当者"
            dropDownItem={<CheckboxDropdown options={mockSalePersonOptions} name={'sale_person_names'} />}
          />
          <Applicant />
          <FilterItem label="申込日時" dropDownItem={<DateSelect />} />
        </Stack>
        <Stack height={100} marginTop={'20px'} alignItems={'center'}>
          <Button
            sx={{
              width: 200,
              bgcolor: 'white',
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'primary.main',
              borderRadius: '2px',

              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'white',
                color: 'primary.main',
              },
            }}
          >
            <Typography variant="filter_search_button">検索</Typography>
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

ListFilter.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  type: PropTypes.string,
};
