import { SvgIcon } from '@mui/material';

export const ApArrowDownIcon = ({ sx, ...props }) => {
  return (
    <SvgIcon sx={{ ...sx }} viewBox="0 0 20 16" {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 10L12 15L6.99999 10" stroke="#6B70F0" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </SvgIcon>
  );
};
