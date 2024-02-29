import { AdSlashIcon } from '@/assets/icons/ad-slash';
import { formatApplyTime } from '@/utils';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Fragment, useMemo } from 'react';
import { FieldItem } from './field-item';
import { PopoverSelect } from './popover-select';
import { ProgressStatus } from './progress-status';

export const AdCaseItem = ({ item }) => {
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
  ];

  const caseStatusList = [
    { label: '仮審査否決', code: 0, enable: false, active: false },
    { label: '本審査', code: 1, enable: false, active: true },
    { label: '本審査否決', code: 2, enable: false, active: false },
    { label: '融資実行済み', code: 3, enable: false, active: false },
    { label: '他行借入', code: 4, enable: false, active: false },
    { label: '自宅購入取止め', code: 5, enable: false, active: false },
  ];

  const reviewProgress = [
    { name: 'under_document_review', title: 'みらいバンク支店', label: '書類確認中', width: 200 },
    {
      name: 'rectifying_incomplete_documents',
      title: '申込人',
      label: '書類不備対応中',
    },
    {
      name: 'under_preliminary_review',
      title: '住信SBIネット銀行',
      label: '仮審査中',
    },
    {
      name: 'publish_preliminary_results',
      title: 'みらいバンク支店',
      label: '提携会社へ仮審査結果公開',
    },
  ];

  const PROVISIONAL_RESULT = ['承認', '条件付き承認', '否決'];

  const managerOptions = [
    { value: 0, label: 'manager-0' },
    { value: 1, label: 'manager-1' },
    { value: 2, label: 'manager-2' },
  ];

  const checkClipPath = (index) => {
    const space = '16px';
    if (!index)
      return `polygon(calc(100% - ${space}) 0%, 100% 50%, calc(100% - ${space}) 100%, 0% 100%, 0% 50%, 0% 0%)`;

    return `polygon(calc(100% - ${space}) 0%, 100% 50%, calc(100% - ${space}) 100%, 0% 100%, ${space} 50%, 0% 0%)`;
  };

  const reviewProgressStep = [0, 1, 2, 3, 4];
  const CaseItem = ({ item, index }) => {
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
          <FieldItem width={160} textStyle={'case_content_title'} value={item.apply_no} isText={true} />
          <FieldItem width={180} textStyle={'case_content_text'} value={item.bank_name} isText={true} />
          <FieldItem
            width={140}
            textStyle={'case_content_text'}
            value={`${item.last_name_kanji} ${item.first_name_kanji}`}
            isText={true}
          />
          <FieldItem
            width={130}
            textStyle={'case_content_text'}
            fontFamily="Barlow"
            value={formatApplyTime(item.created_at)}
            isText={true}
          />
          <FieldItem width={130} textStyle={'case_content_text'} value={item.desired_borrowing_date} isText={true} />
          <FieldItem
            width={130}
            textStyle={'case_content_text'}
            fontFamily="Barlow"
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
          <FieldItem width={200} value={<ProgressStatus code={item.pre_examination_status} />} isText={false} />
          <FieldItem
            width={140}
            textStyle="case_content_text"
            value={item.provisional_result !== null ? PROVISIONAL_RESULT[Number(item.provisional_result)] : 'ー'}
            isText={true}
          />
          <FieldItem
            width={160}
            fontSize={15}
            value={<PopoverSelect value={item.sales_area_id} options={managerOptions} />}
            isText={false}
          />
          <FieldItem
            width={160}
            value={<PopoverSelect value={item.s_sales_person_id} options={managerOptions} />}
            isText={false}
          />
          <FieldItem
            width={160}
            value={<PopoverSelect value={item.s_manager_id} options={managerOptions} />}
            isText={false}
            isLast={true}
          />
        </Stack>

        <Divider sx={{ mt: 1 }} />
        {/* 进度条 */}
        <Stack direction={'row'} px={2} mb={2}>
          {reviewProgress.map((item, index) => (
            <Stack key={item.name} flex={item.name === 'under_preliminary_review' ? 1.5 : 1}>
              <Typography variant="manager_progress_item_title" width={'100%'} textAlign={'center'}>
                {item.title}
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  minHeight: 38,
                  bgcolor: 'gray.80',
                  mr: '-12px',
                  clipPath: checkClipPath(index),
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '1px',
                    left: '2px',
                    right: '1px',
                    bottom: '1px',
                    bgcolor: 'gray.20',
                    clipPath: checkClipPath(index),
                  }}
                >
                  <Typography variant="manager_progress_item">{item.label}</Typography>
                </Box>
              </Box>
              {item.name === 'under_preliminary_review' && (
                <Stack direction={'row'} spacing={2} mt={2} justifyContent={'center'}>
                  {reviewProgressStep.map((item) => (
                    <Box key={item} height={6} width={'65px'} bgcolor={'gray.80'} />
                  ))}
                </Stack>
              )}
            </Stack>
          ))}
        </Stack>

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

  CaseItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
  };

  return (
    <>
      {isPairLoan ? (
        <Stack>
          {pairLoanData.map((pairLoanItem, index) => (
            <CaseItem key={pairLoanItem.id} item={pairLoanItem} index={index} />
          ))}
        </Stack>
      ) : (
        <CaseItem item={item} />
      )}
    </>
  );
};

AdCaseItem.propTypes = {
  item: PropTypes.object,
};
