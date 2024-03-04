import { Button, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const InfoTitleTab = ({ isIncomeAccountant }) => {
  const normalOptions = [
    { id: 'expected_loan', label: 'お借入のご希望' },
    {
      id: 'personal_info',
      label: 'あなたの情報',
    },
    {
      id: 'career_info',
      label: 'ご職業',
    },
    ...(isIncomeAccountant
      ? [
          {
            id: 'security_provider',
            label: '担保提供者',
          },
        ]
      : []),
    {
      id: 'address_info',
      label: 'お住まい',
    },
    {
      id: 'current_loan_info',
      label: '現在の借入状況',
    },
    {
      id: 'financial_plan',
      label: '資金計画',
    },
    {
      id: 'guarantor_info',
      label: '担当者情報',
    },
    {
      id: 'documents',
      label: '書類アップロード',
    },
    {
      id: 'review_result',
      label: '審査結果',
    },
  ];

  const incomeAccountantOptions = [
    {
      id: 'income_accountant_info',
      label: '収入合算者の情報',
    },
    {
      id: 'income_accountant_career',
      label: '収入合算者の職業',
    },
    { id: 'documents', label: '書類アップロード' },
  ];

  const [activeButton, setActiveButton] = useState('expected_loan');
  const handleClickButton = (e) => {
    setActiveButton(e.currentTarget.id);
  };

  const renderItems = useMemo(() => {
    return isIncomeAccountant ? incomeAccountantOptions : normalOptions;
  }, [isIncomeAccountant]);

  return (
    <Stack direction={'row'} alignItems={'center'} bgcolor={'gray.60'} padding={'6px'} spacing={'6px'}>
      {renderItems.map((item) => (
        <Button
          key={item.id}
          sx={{
            color: item.id === activeButton ? 'white' : 'primary.main',
            bgcolor: item.id === activeButton ? 'primary.main' : 'white',
            fontFamily: 'Hiragino Sans',
            fontWeight: item.id === activeButton ? 600 : 300,
            fontSize: 12,
            boxShadow: 'none',
            py: '10px',
            px: '12px',
            borderRadius: '2px',
            '&:hover': {
              bgcolor: item.id === activeButton ? 'primary.main' : 'white',
              boxShadow: 'none',
            },
          }}
          onClick={handleClickButton}
          id={item.id}
        >
          <Typography variant="edit_content_title">{item.label}</Typography>
        </Button>
      ))}
    </Stack>
  );
};

InfoTitleTab.propTypes = {
  isIncomeAccountant: PropTypes.bool,
};
