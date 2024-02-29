import { AdSlashIcon } from '@/assets/icons/ad-slash';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { Fragment, useMemo } from 'react';
import { SectionDivider } from '../common/Divider';
import { PopoverSelect } from './popover-select';
import { ProgressStatus } from './progress-status';
import PropTypes from 'prop-types';

export const SpCase = ({ item }) => {
  const isPairLoan = useMemo(() => {
    return item.loan_type === '2' && item.pair_loan_id !== '';
  }, [item]);

  const pairLoanData = useMemo(() => {
    const data = [];
    if (isPairLoan) {
      data.push({ ...item, pair_loan_data: '' }, { ...item.pair_loan_data });
    }
    return data;
  }, [isPairLoan, item]);

  const caseEditItems = [
    { name: 'edit_case', label: '申込内容の修正・確認' },
    {
      name: 'message_confirm',
      label: 'メッセージ確認',
    },
    {
      name: 'memo',
      label: 'メモ表示',
    },
    {
      name: 'pair_loan',
      label: isPairLoan ? 'ペアローン解除' : 'ペアローン紐付',
    },
  ];

  const caseStatusList = [
    { label: '仮審査否決', code: 0, enable: false, active: false },
    { label: '本審査', code: 1, enable: false, active: true },
    { label: '本審査否決', code: 2, enable: false, active: false },
    { label: '融資実行済み', code: 3, enable: false, active: false },
    { label: '他行借入', code: 4, enable: false, active: false },
    { label: '自宅購入取止め', code: 5, enable: false, active: false },
  ];

  const PROVISIONAL_RESULT = ['承認', '条件付き承認', '否決'];

  const managerOptions = [
    { value: 0, label: 'manager-0' },
    { value: 1, label: 'manager-1' },
    { value: 2, label: 'manager-2' },
  ];

  const CaseItem = ({ width, fontSize, value, isText, isLast }) => {
    return (
      <Stack
        flexShrink={0}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        width={width}
        position={'relative'}
      >
        {isText ? (
          <Typography variant="case_content_title" fontSize={fontSize}>
            {value}
          </Typography>
        ) : (
          value
        )}
        {!isLast && <SectionDivider orientation="vertical" height="70%" top="20%" />}
      </Stack>
    );
  };

  CaseItem.propTypes = {
    width: PropTypes.number,
    fontSize: PropTypes.number,
    value: PropTypes.any,
    isText: PropTypes.bool,
    isLast: PropTypes.bool,
  };

  const Case = ({ item, index }) => {
    return (
      <Stack
        p={2}
        minWidth={'max-content'}
        sx={{
          bgcolor: isPairLoan ? (theme) => theme.palette.green[60] : 'white',
          borderRadius: '2px',
          borderBottom: (theme) =>
            isPairLoan && index !== pairLoanData.length - 1 ? `6px solid ${theme.palette.green[100]}` : 'none',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
        }}
      >
        <Stack direction={'row'} py={'10px'}>
          <CaseItem width={160} fontSize={17} value={item.apply_no} isText={true} />
          <CaseItem width={180} fontSize={15} value={item.bank_name} isText={true} />
          <CaseItem
            width={180}
            fontSize={15}
            value={`${item.last_name_kanji} ${item.first_name_kanji}`}
            isText={true}
          />
          <CaseItem width={130} fontSize={15} value={item.created_at} isText={true} />
          <CaseItem width={130} fontSize={15} value={item.desired_borrowing_date} isText={true} />
          <CaseItem
            width={130}
            fontSize={15}
            value={
              <Box lineHeight={'25px'}>
                {item.desired_loan_amount}
                <Typography variant="case_content_text" fontSize={7} fontFamily={'Noto Sans JP'}>
                  （万円）
                </Typography>
              </Box>
            }
            isText={true}
          />
          <CaseItem width={200} value={<ProgressStatus code={item.pre_examination_status} />} isText={false} />
          <CaseItem
            width={140}
            fontSize={15}
            value={item.provisional_result !== null ? PROVISIONAL_RESULT[Number(item.provisional_result)] : 'ー'}
            isText={true}
          />
          <CaseItem
            width={160}
            fontSize={15}
            value={<PopoverSelect value={item.sales_area_id} options={managerOptions} />}
            isText={false}
          />
          <CaseItem
            width={160}
            value={<PopoverSelect value={item.s_sales_person_id} options={managerOptions} />}
            isText={false}
          />
          <CaseItem
            width={160}
            value={<PopoverSelect value={item.s_manager_id} options={managerOptions} />}
            isText={false}
            isLast={true}
          />
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Stack direction={'row'} justifyContent={'space-between'} p={1}>
          <Stack direction={'row'} spacing={'10px'} alignItems={'center'}>
            {caseEditItems.map((item, index) => (
              <Fragment key={item.name}>
                <Button
                  variant="text"
                  sx={{
                    mr: '10px',
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: 'white',
                      opacity: 1,
                      textDecoration: 'underline',
                    },
                  }}
                >
                  <Typography
                    variant="case_content_text_edit"
                    color={'primary.main'}
                    sx={{
                      '&.MuiTypography-root:hover': {
                        color: 'blue.100',
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Button>
                {index !== caseEditItems.length - 1 && <AdSlashIcon sx={{ color: 'gray.60', width: 12, height: 12 }} />}
              </Fragment>
            ))}
          </Stack>

          <Stack direction={'row'} alignItems={'center'}>
            {caseStatusList.map((status) => (
              <Button
                key={status.label}
                variant="text"
                disabled={!status.enable}
                sx={{
                  ml: 10,
                  mr: 2,
                  bgcolor: status.active ? 'primary.main' : 'none',
                  '&.MuiButtonBase-root:hover': {
                    bgcolor: 'button_hover',
                    opacity: 1,
                  },
                }}
              >
                <Typography variant="case_content_text_edit" color={`${status.active ? 'white' : 'primary.main'}`}>
                  {status.label}
                </Typography>
              </Button>
            ))}
          </Stack>
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      {isPairLoan ? (
        <Stack>
          {pairLoanData.map((pairLoanItem, index) => (
            <Case key={pairLoanItem.id} item={pairLoanItem} index={index} />
          ))}
        </Stack>
      ) : (
        <Case item={item} />
      )}
    </>
  );
};

SpCase.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
};
