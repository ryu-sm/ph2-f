import { useTheme } from '@emotion/react';
import { Button, IconButton, Modal, Stack, Typography, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { FilterInput } from '@/components/admin/list-filter/filter-input';
import { useState } from 'react';
import { FilterItem } from '@/components/admin/list-filter/filter-item';
import { CheckboxDropdown } from '@/components/admin/list-filter/checkbox-dropdown';
import { DateSelect } from '@/components/admin/list-filter/date-select';

export const DocsFilter = ({ open, onClose, isManager }) => {
  const theme = useTheme();
  const initialValue = {
    file_name: '',
    created_at: '',
    size: '',
    note: '',
    ...(isManager ? { company_name: '', name_kanji: '' } : {}),
  };

  const [searchData, setSearchData] = useState(initialValue);
  const mockCompanyOptions = [
    {
      label: '北海道セキスイハイム株式会社',
      value: 0,
    },
    {
      value: 1,
      label: 'セキスイハイム東北株式会社',
    },
    {
      value: 2,
      label: '東京セキスイハイム株式会社',
    },
    {
      value: 3,
      label: '茨城セキスイハイム株式会社',
    },
  ];

  const mockTypeOptions = [
    {
      label: 'pdf',
      value: 'pdf',
    },
    {
      label: 'png',
      value: 'png',
    },
    {
      label: 'jpg',
      value: 'jpg',
    },
    {
      label: 'jpeg',
      value: 'jpeg',
    },
  ];

  const mockPersonOptions = [
    {
      label: '担当者　C3-001名前',
      value: 0,
    },
    {
      label: '担当者　C3-002名前',
      value: 1,
    },
    {
      label: '担当者　B1-001名前',
      value: 2,
    },
    {
      label: '担当者　B1-002名前',
      value: 3,
    },
  ];

  const handleSearch = () => {
    // TODO 调用搜索的接口
    console.log(searchData);
  };

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
          height: 480,
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
          <Typography variant="ad_modal_title">アップロード書類検索</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack px={'20px'} pt={'20px'} flexGrow={1} overflow={'auto'} spacing={'2px'}>
          <Stack
            px={'68px'}
            bgcolor={'white'}
            spacing={3}
            sx={{
              justifyContent: 'space-around',
              py: '16px',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px',
            }}
          >
            <Typography variant="filter_item_label">ファイル名</Typography>
            <FilterInput
              placeholder="入力してください"
              value={searchData.file_name}
              setValue={(value) => setSearchData({ ...searchData, file_name: value })}
            />
          </Stack>
          <FilterItem label="登録日" dropDownItem={<DateSelect />} />
          {isManager && (
            <>
              <FilterItem
                label="提携先"
                dropDownItem={<CheckboxDropdown options={mockCompanyOptions} name={'sale_agent_names'} />}
              />
              <FilterItem
                label="担当者"
                dropDownItem={<CheckboxDropdown options={mockPersonOptions} name={'sale_person_names'} />}
              />
            </>
          )}
          <FilterItem
            label="拡張子"
            dropDownItem={<CheckboxDropdown options={mockTypeOptions} name={'office_names'} />}
          />
        </Stack>

        <Stack minHeight={isManager ? '100px' : '150px'} justifyContent={'center'} alignItems={'center'}>
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
            onClick={handleSearch}
          >
            <Typography variant="filter_search_button">検索</Typography>
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

DocsFilter.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  isManager: PropTypes.bool,
};
