import { Stack, Typography } from '@mui/material';

export const FieldItem = ({ minWidth, maxWidth, value, isText, textStyle, fontFamily }) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      width={1}
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      {isText ? (
        <Typography variant={textStyle} fontFamily={fontFamily}>
          {value}
        </Typography>
      ) : (
        value
      )}
    </Stack>
  );
};
