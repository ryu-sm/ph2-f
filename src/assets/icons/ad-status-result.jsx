import { SvgIcon } from '@mui/material';
import { useId } from 'react';

export const AdStatusResultIcon = (props) => {
  const randomId = useId();
  return (
    <SvgIcon viewBox="0 0 25 23" {...props}>
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="filter0_d_4001_212314">
          <rect x="8" y="6" width="11" height="11" rx="2" fill={props.fill} />
          <rect x="8.5" y="6.5" width="10" height="10" rx="1.5" stroke={props.stroke} />
        </g>
        <defs>
          <filter
            id={randomId}
            x="0"
            y="0"
            width="27"
            height="27"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4001_212314" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4001_212314" result="shape" />
          </filter>
        </defs>
      </svg>
    </SvgIcon>
  );
};
