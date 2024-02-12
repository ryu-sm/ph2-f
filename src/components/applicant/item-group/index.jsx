import { Box, Stack, Typography } from '@mui/material';

export const ApItemGroup = ({ children, optional, label, note, helps = [], helpsType, ...props }) => {
  return (
    <Stack>
      <Label optional={optional} label={label} helps={helps} note={note} helpsType={helpsType} />
      <Stack sx={{ pt: 3, pb: 8, px: 4 }}>{children}</Stack>
    </Stack>
  );
};

const Label = ({ optional, label, note, helpsType, helps }) => {
  return (
    <Stack
      alignItems={'center'}
      spacing={2}
      sx={{ pt: '5px', pb: '6px', px: 4, bgcolor: (theme) => theme.palette.primary[40] }}
    >
      <Stack spacing={2} direction={'row'} alignItems={'center'} sx={{ width: 1 }}>
        {!!optional && (
          <Box
            sx={{
              display: 'flex',
              color: 'white',
              bgcolor: (theme) => theme.palette.gray[250],
              p: '2px 3px',
              borderRadius: 1,
              minWidth: 28,
            }}
          >
            <Typography variant="chip_label" textAlign={'center'}>
              任意
            </Typography>
          </Box>
        )}
        <Stack>
          <Stack spacing={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ width: 1 }}>
            <Typography variant="form_item_label" sx={{ color: (theme) => theme.palette.text.main }}>
              {label}
            </Typography>
            {helpsType === 'nowrap' && helps.length > 0 && (
              <Stack direction={'row'}>
                {helps.map((help, index) => (
                  <Box key={index}>{help}</Box>
                ))}
              </Stack>
            )}
          </Stack>

          {note && (
            <Typography variant="note" sx={{ color: (theme) => theme.palette.text.main }}>
              {note}
            </Typography>
          )}
        </Stack>
      </Stack>
      {helpsType === 'break' && helps.length > 0 && (
        <Stack spacing={2} direction={'row'} justifyContent={'end'} alignItems={'center'} sx={{ width: 1 }}>
          {helps.map((help, index) => (
            <Box display={'flex'} key={index}>
              {help}
            </Box>
          ))}
        </Stack>
      )}
    </Stack>
  );
};
