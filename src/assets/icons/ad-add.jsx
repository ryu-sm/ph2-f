import { SvgIcon } from '@mui/material';

export const AdAddIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 16 16" {...props}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#CCCCCC" />
        <path d="M3 8H13" stroke="black" />
        <path d="M8 3L8 13" stroke="black" />
      </svg>
    </SvgIcon>
  );
};
