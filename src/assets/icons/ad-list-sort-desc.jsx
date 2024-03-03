import { SvgIcon } from '@mui/material';

export const AdListSortDescIcon = ({ stroke, ...props }) => {
  return (
    <SvgIcon viewBox="0 0 9 13" {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
        <path d="M4.5 11.5L4.5 1.5" stroke={stroke} />
        <path d="M6.5 9.5L4.5 11.5L2.5 9.5" stroke={stroke} />
      </svg>
    </SvgIcon>
  );
};
