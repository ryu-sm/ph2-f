import { Icons } from '@/assets';
import { ApPrimaryButton } from '@/components';
import { Link, Stack, Typography } from '@mui/material';

export const ApStepFooter = ({ left, right, rightDisable, rightLabel, ...props }) => {
  return (
    <Stack
      direction={'row'}
      justifyContent={left && right ? 'space-between' : right ? 'center' : 'start'}
      alignItems={'center'}
      spacing={4}
      zIndex={3}
      sx={{
        position: 'fixed',
        py: 4,
        px: 6,
        bottom: 0,
        width: 1,
        maxWidth: 480,
        bgcolor: 'white',
        boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      {left && (
        <Stack
          component={Link}
          spacing={2}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          sx={{ textDecorationLine: 'none', minWidth: 80 }}
          onClick={left}
        >
          <Icons.ApForwardLeftRadioOutlineIcon />
          <Typography variant="radio_checkbox_button" sx={{ color: (theme) => theme.palette.primary.main }}>
            もどる
          </Typography>
        </Stack>
      )}
      {right && (
        <ApPrimaryButton
          endIcon={<Icons.ApForwardRightWhiteIcon />}
          width={1}
          height={40}
          onClick={right}
          disabled={rightDisable}
        >
          {rightLabel || '次へ'}
        </ApPrimaryButton>
      )}
    </Stack>
  );
};
