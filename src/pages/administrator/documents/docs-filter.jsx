import { Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useIsManager } from '@/hooks';
import { CheckboxDropdown, FilterInput, FilterItem } from '@/components/administrator';
import { DateSelect } from '@/components/administrator/select/date-select';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { adGetSalesCompanyOptionsCategory, adGetSalesPersonOptionsAll } from '@/services';

export const DocsFilter = ({ open, onClose, onCleare, handleSearch, errors }) => {
  const isManager = useIsManager();

  const [salesCompanyOptionsC, setSalesCompanyOptionsC] = useState([]);
  const [salesPersonOptionsAll, setSalesPersonOptionsAll] = useState([]);

  const fetchData = async () => {
    try {
      const res01 = await adGetSalesCompanyOptionsCategory('C');
      setSalesCompanyOptionsC(res01.data);
      const res02 = await adGetSalesPersonOptionsAll();
      setSalesPersonOptionsAll(res02.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fileTypeOptions = [
    {
      label: 'pdf',
      value: '.pdf',
    },
    {
      label: 'png',
      value: '.png',
    },
    {
      label: 'jpg',
      value: '.jpg',
    },
    {
      label: 'jpeg',
      value: '.jpeg',
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      disableAutoFocus
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
          <Typography variant="filter_clear_button" sx={{ cursor: 'pointer' }} onClick={onCleare}>
            すべてクリア
          </Typography>
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
            <FilterInput placeholder="入力してください" name="file_names" />
          </Stack>
          <FilterItem
            label="登録日"
            dropDownItem={
              <Stack>
                <DateSelect name="created_at_from" endPrefix={'から'} />
                <DateSelect name="created_at_to" endPrefix={'まで'} />
              </Stack>
            }
          />
          {isManager && (
            <>
              <FilterItem
                label="提携先"
                dropDownItem={<CheckboxDropdown options={salesCompanyOptionsC} name="org_id" />}
              />
              <FilterItem
                label="担当者"
                dropDownItem={<CheckboxDropdown options={salesPersonOptionsAll} name="s_sales_person_id" hasFilter />}
              />
            </>
          )}
          <FilterItem label="拡張子" dropDownItem={<CheckboxDropdown options={fileTypeOptions} name="file_types" />} />
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
            onClick={() => {
              if (Object.keys(errors).length > 0) return;
              handleSearch();
              onClose();
            }}
          >
            <Typography variant="filter_search_button">検索</Typography>
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};
