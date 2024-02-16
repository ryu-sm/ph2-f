import { Box, Stack, Typography } from '@mui/material';

export const ApItemGroup = ({
  children,
  optional,
  label,
  note,
  helps = [],
  helpsType,
  pb,
  px,
  borderTopRightRadius,
  borderTopLeftRadius,
}) => {
  return (
    <Stack
      sx={{ width: 1, borderTopRightRadius: borderTopRightRadius || 0, borderTopLeftRadius: borderTopLeftRadius || 0 }}
    >
      <Label
        optional={optional}
        label={label}
        helps={helps}
        note={note}
        helpsType={helpsType}
        borderTopRightRadius={borderTopRightRadius}
        borderTopLeftRadius={borderTopLeftRadius}
      />
      <Stack sx={{ pt: 3, pb: pb || 8, px: px || 4 }}>{children}</Stack>
    </Stack>
  );
};

const Label = ({ optional, label, note, helpsType, helps, borderTopRightRadius, borderTopLeftRadius }) => {
  return (
    <Stack
      alignItems={'center'}
      spacing={2}
      sx={{
        pt: '5px',
        pb: '6px',
        px: 4,
        bgcolor: (theme) => theme.palette.primary[40],
        width: 1,
        borderTopRightRadius: borderTopRightRadius || 0,
        borderTopLeftRadius: borderTopLeftRadius || 0,
      }}
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
        <Stack sx={{ width: 1 }}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ width: '100%' }}>
            <Typography
              variant="form_item_label"
              sx={{ color: (theme) => theme.palette.text.main, whiteSpace: helpsType || 'break-spaces' }}
            >
              {label}
            </Typography>

            {helpsType === 'nowrap' && helps.length > 0 && (
              <Stack spacing={2} direction={'row'} alignItems={'center'}>
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
