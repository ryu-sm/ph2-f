import { Stack, Typography } from '@mui/material';
import { SpCase } from '../case-item/sp-case-item';
import { InboxOutlined } from '@mui/icons-material';

export const SpCaseList = () => {
  const caseList = [
    {
      id: '100730412732514552',
      apply_no: 'SET20240228002',
      created_at: '2024/02/28 08:02:36',
      pre_examination_status: '0',
      s_sales_person_id: '',
      s_manager_id: '',
      loan_type: '1',
      pair_loan_id: '',
      pair_loan_data: '',
      sales_area_id: '100713166408778470',
      first_name_kanji: '太郎',
      last_name_kanji: '山田',
      desired_borrowing_date: '',
      desired_loan_amount: '',
      bank_name: '住信ＳＢＩネット銀行',
      provisional_status: '',
      provisional_result: '',
      provisional_after_result: '',
      unviewed: '1',
    },
    {
      id: '100730412732514661',
      apply_no: 'SET20240229001',
      created_at: '2024/02/29 01:02:32',
      pre_examination_status: '1',
      s_sales_person_id: '',
      s_manager_id: '',
      loan_type: '2',
      pair_loan_id: '',
      pair_loan_data: '',
      sales_area_id: '',
      first_name_kanji: '二郎',
      last_name_kanji: '山田',
      desired_borrowing_date: '',
      desired_loan_amount: '',
      bank_name: '住信ＳＢＩネット銀行',
      provisional_status: '',
      provisional_result: '',
      provisional_after_result: '',
      unviewed: '0',
    },
    {
      id: '100730412732514566',
      apply_no: 'SET20240228003',
      created_at: '2024/02/28 09:02:34',
      pre_examination_status: '1',
      s_sales_person_id: '',
      s_manager_id: '',
      loan_type: '2',
      pair_loan_id: '100730412732514584',
      pair_loan_data: {
        id: '100730412732514584',
        apply_no: 'SET20240228005',
        created_at: '2024/02/28 09:02:49',
        pre_examination_status: '2',
        s_sales_person_id: '',
        s_manager_id: '',
        loan_type: 2,
        pair_loan_id: '100730412732514566',
        pair_loan_data: '',
        sales_area_id: '',
        first_name_kanji: '花子',
        last_name_kanji: '山田',
        desired_borrowing_date: '',
        desired_loan_amount: '',
        bank_name: '住信ＳＢＩネット銀行',
        provisional_status: '',
        provisional_result: '',
        provisional_after_result: '',
      },
      sales_area_id: '',
      first_name_kanji: '七郎',
      last_name_kanji: '山田',
      desired_borrowing_date: '',
      desired_loan_amount: '',
      bank_name: '住信ＳＢＩネット銀行',
      provisional_status: '',
      provisional_result: '',
      provisional_after_result: '',
      unviewed: '0',
    },
  ];
  const noSearchResult = (
    <Stack height="calc(100vh - 115px)" width={'100%'} alignItems={'center'} justifyContent={'center'}>
      <InboxOutlined
        sx={{
          width: 80,
          height: 70,
          marginRight: '5px',
          color: '#d8d8d8',
        }}
      />
      <Typography sx={{ color: '#7d7d7d' }}>案件がありません。</Typography>
    </Stack>
  );
  return (
    <Stack p={3} width={'100%'} spacing={3}>
      {caseList.length !== 0 ? caseList.map((item) => <SpCase key={item.id} item={item} />) : noSearchResult}
    </Stack>
  );
};
