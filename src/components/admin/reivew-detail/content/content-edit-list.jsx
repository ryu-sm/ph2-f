import { Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { LoanPlan } from '../different-contents/loan-plan';
export const ContentEditList = ({ canBeEdited }) => {
  return (
    <Stack width={'100%'} marginTop={'16px'} height={'480px'}>
      {canBeEdited && (
        <Stack width={'100%'} direction={'row'} justifyContent={'flex-end'}>
          <Button
            sx={{
              width: 200,
              padding: '6px 16px',
              bgcolor: 'secondary.main',
              color: 'white',
              boxShadow: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: 'secondary.main', opacity: 0.8 },
            }}
          >
            保存
          </Button>
        </Stack>
      )}

      {/* edit list */}
      <Stack
        direction={'row'}
        alignItems={'center'}
        width={'100%'}
        borderBottom={'1px solid '}
        borderColor={'gray.100'}
      >
        <Typography
          variant="edit_content_title"
          sx={{ fontWeight: 500, color: 'gray.100', flex: 1, textAlign: 'center' }}
        >
          入力項目
        </Typography>
        <Typography
          variant="edit_content_title"
          sx={{ fontWeight: 500, color: 'gray.100', flex: 2, textAlign: 'center' }}
        >
          入力内容
        </Typography>
      </Stack>
      <LoanPlan />
    </Stack>
  );
};

ContentEditList.propTypes = {
  canBeEdited: PropTypes.bool,
};
