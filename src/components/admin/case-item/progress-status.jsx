import { AdStatusResultIcon } from '@/assets/icons/ad-status-result';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
export const ProgressStatus = ({ code }) => {
  const statusRenderList = [
    {
      code: '0',
      label: '書類確認中',
      fillColor: '#D5D2FF',
      strokeColor: '#C5D5FF',
    },
    {
      code: '1',
      label: '書類不備対応中',
      fillColor: '#D5D2FF',
      strokeColor: '#C5D5FF',
    },
    {
      code: '2',
      label: '仮審査中',
      fillColor: '#FFC9A9',
      strokeColor: '#FFAD7C',
    },
    {
      code: '3',
      label: '提携会社へ審査結果公開',
      fillColor: '#D5F5D5',
      strokeColor: '#ACEAB1',
    },
    {
      code: '4',
      label: '申込人へ審査結果公開',
      fillColor: '#D5F5D5',
      strokeColor: '#ACEAB1',
    },
  ];

  const currentStatusItem = statusRenderList.find((item) => item.code === code);
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={'2px'}>
      <AdStatusResultIcon fill={currentStatusItem.fillColor} stroke={currentStatusItem.strokeColor} />
      <Typography variant="case_content_text" color={'gray.100'}>
        {currentStatusItem.label}
      </Typography>
    </Stack>
  );
};

ProgressStatus.propTypes = {
  code: PropTypes.string,
};
