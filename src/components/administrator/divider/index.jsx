import styled from '@emotion/styled';
import { Divider } from '@mui/material';

export const SectionDivider = styled(Divider)(({ theme, height, top }) => ({
  color: theme.palette.gray[80],
  right: 0,
  top: top ? top : '25%',
  position: 'absolute',
  height: height ? height : '50%',
}));
