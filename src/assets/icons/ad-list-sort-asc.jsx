import { SvgIcon } from '@mui/material';

export const AdListSortAscIcon = ({ stroke, ...props }) => {
  return (
    <SvgIcon viewBox="0 0 9 13" {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="9" height="13" viewBox="0 0 9 13" fill="none">
        <path d="M4.5 1.5V11.5" stroke={stroke} />
        <path d="M2.5 3.5L4.5 1.5L6.5 3.5" stroke={stroke} />
      </svg>
    </SvgIcon>
  );
};
