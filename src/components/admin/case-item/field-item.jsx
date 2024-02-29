import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { SectionDivider } from '../common/Divider';
export const FieldItem = ({ width, value, isText, isLast, textStyle, fontFamily }) => {
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
        <Typography variant={textStyle} fontFamily={fontFamily}>
          {value}
        </Typography>
      ) : (
        value
      )}
      {!isLast && <SectionDivider orientation="vertical" height="70%" top="20%" />}
    </Stack>
  );
};

FieldItem.propTypes = {
  width: PropTypes.number,
  fontSize: PropTypes.number,
  value: PropTypes.any,
  isText: PropTypes.bool,
  isLast: PropTypes.bool,
  fontFamily: PropTypes.string,
  textStyle: PropTypes.string,
};
