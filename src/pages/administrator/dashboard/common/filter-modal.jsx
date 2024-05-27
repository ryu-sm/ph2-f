import { Box, Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useIsManager } from '@/hooks';
import { CheckboxDropdown, FilterItem } from '@/components/administrator';
import { DateSelect } from '@/components/administrator/select/date-select';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API_500_ERROR } from '@/constant';
import { adGetSalesCompanyOptionsCategory, adGetSalesPersonOptionsAll } from '@/services';
import { useRecoilValue } from 'recoil';
import { dashboardTabStatusAtom } from '@/store';
import { useBankMaster } from '@/hooks/use-bank-master';
import { FilterSelect } from '@/components/administrator/select/filter-select';
import { dayjs } from '@/libs';
import { format } from 'kanjidate';
import Draggable from 'react-draggable';

export const AdListFilterModal = ({ open, onClose, onCleare, handleSearch, errors }) => {
  const isManager = useIsManager();
  const dashboardTabStatus = useRecoilValue(dashboardTabStatusAtom);

  const [salesCompanyOptionsB, setSalesCompanyOptionsB] = useState([]);
  const [salesCompanyOptionsE, setSalesCompanyOptionsE] = useState([]);
  const [salesPersonOptionsAll, setSalesPersonOptionsAll] = useState([]);

  const fetchData = async () => {
    try {
      const res01 = await adGetSalesCompanyOptionsCategory('B');
      setSalesCompanyOptionsB(res01.data);
      const res02 = await adGetSalesPersonOptionsAll();
      setSalesPersonOptionsAll(res02.data);
      const res03 = await adGetSalesCompanyOptionsCategory('E');
      setSalesCompanyOptionsE(res03.data);
    } catch (error) {
      toast.error(API_500_ERROR);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const bankMaster = useBankMaster();

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      disableAutoFocus
    >
      <Box>
        <Draggable>
          <Stack
            sx={{
              cursor: 'move',
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
              py={3}
            >
              <Typography variant="filter_clear_button" sx={{ cursor: 'pointer' }} onClick={onCleare}>
                すべてクリア
              </Typography>
              <Typography variant="ad_modal_title">
                {dashboardTabStatus === 1 ? '仮審査中の案件の絞り込み' : '過去の案件の絞り込み'}
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Stack px={'20px'} pt={'20px'} flexGrow={1} overflow={'auto'} spacing={'2px'}>
              <FilterItem label="申込銀行" dropDownItem={<CheckboxDropdown options={bankMaster} name="s_bank_id" />} />
              <FilterItem
                label="申込日時"
                dropDownItem={
                  <Stack>
                    <DateSelect
                      name="created_at_from"
                      yearOptions={yearCurrentOptionsFromApplicant}
                      endPrefix={'から'}
                    />
                    <DateSelect name="created_at_to" yearOptions={yearCurrentOptionsToApplicant} endPrefix={'まで'} />
                  </Stack>
                }
              />
              <FilterItem
                label="実行予定日"
                dropDownItem={
                  <Stack>
                    <DateSelect
                      name="desired_borrowing_date_from"
                      yearOptions={yearCurrentOptions}
                      endPrefix={'から'}
                    />
                    <DateSelect name="desired_borrowing_date_to" yearOptions={yearPastOptions} endPrefix={'まで'} />
                  </Stack>
                }
              />
              {!isManager && (
                <FilterItem
                  label="仮審査結果"
                  dropDownItem={<CheckboxDropdown options={provisionalResultOptions} name="provisional_result" />}
                />
              )}
              {isManager && (
                <FilterItem
                  label="申込金額"
                  dropDownItem={
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                      sx={{ py: 3, px: 16 }}
                      spacing={1}
                    >
                      <FilterSelect
                        name="desired_loan_amount_from"
                        options={amountOptions}
                        unit={'万円から'}
                        isFormatMonet
                      />
                      <FilterSelect
                        name="desired_loan_amount_to"
                        options={amountOptions}
                        unit={'万円まで'}
                        isFormatMonet
                      />
                    </Stack>
                  }
                />
              )}

              <FilterItem
                label="支店"
                dropDownItem={<CheckboxDropdown options={salesCompanyOptionsB} name="sales_area_id" />}
              />
              <FilterItem
                label="展示場"
                dropDownItem={<CheckboxDropdown options={salesCompanyOptionsE} name="sales_exhibition_hall_id" />}
              />
              <FilterItem
                label="営業担当者"
                dropDownItem={<CheckboxDropdown options={salesPersonOptionsAll} name="s_sales_person_id" hasFilter />}
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
        </Draggable>
      </Box>
    </Modal>
  );
};

const calcAmountLabel = (number) => {
  const formatter = new Intl.NumberFormat('ja-JP', {
    maximumFractionDigits: 0,
  });

  if (number >= 10000) {
    const billionsPart = Math.floor(number / 10000);
    const remainder = number % 10000;
    return `${formatter.format(billionsPart)}億${remainder !== 0 ? `${formatter.format(remainder)}` : ''}`;
  }
  return formatter.format(number);
};

// 申込日時 - current - from
const yearCurrentOptionsFromApplicant = [{ value: '', label: '西暦' }].concat(
  Array.from(Array(5), (_, index) => {
    const year = String(dayjs().year() - 4 + index).padStart(2, '0');
    const kanjiDateG2 = format('{G:2}', +year, 1, 1);
    const kanjiDateN = format('{N}', +year, 1, 1);
    return {
      value: `${year}`,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);

// 申込日時 - current - to
const yearCurrentOptionsToApplicant = [{ value: '', label: '西暦' }].concat(
  Array.from(Array(9), (_, index) => {
    const year = String(dayjs().year() - 4 + index).padStart(2, '0');
    const kanjiDateG2 = format('{G:2}', +year, 1, 1);
    const kanjiDateN = format('{N}', +year, 1, 1);
    return {
      value: `${year}`,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);

// 実行予定日
const yearCurrentOptions = [{ value: '', label: '西暦' }].concat(
  Array.from(Array(5), (_, index) => {
    const year = String(dayjs().year() + index).padStart(2, '0');
    const kanjiDateG2 = format('{G:2}', +year, 1, 1);
    const kanjiDateN = format('{N}', +year, 1, 1);
    return {
      value: `${year}`,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);

const yearPastOptions = [{ value: '', label: '西暦' }].concat(
  Array.from(Array(9), (_, index) => {
    const year = String(dayjs().year() - 4 + index).padStart(2, '0');
    const kanjiDateG2 = format('{G:2}', +year, 1, 1);
    const kanjiDateN = format('{N}', +year, 1, 1);
    return {
      value: `${year}`,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);

const amountOptions = Array.from(Array(40), (_, index) => ({
  value: String((index + 1) * 500),
  label: calcAmountLabel((index + 1) * 500),
}));

const provisionalResultOptions = [
  { value: '0', label: '承認実行' },
  { value: '1', label: '否決' },
  { value: '2', label: '承認取消' },
];
