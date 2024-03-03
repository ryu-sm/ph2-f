import { useMemo } from 'react';

export const AdCircleNotice = () => {
  const id = useMemo(() => Math.round(Math.random() * 10000000).toString(), []);
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath={`url(#${id})`}>
        <path
          d="M8 0a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8Zm0 14.5A6.507 6.507 0 0 1 1.5 8c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5Zm0-5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 0-1.5 0v4c0 .416.338.75.75.75Zm0 1.034A.983.983 0 1 0 8 12.5a.983.983 0 0 0 0-1.966Z"
          fill="#E54E75"
        />
      </g>
      <defs>
        <clipPath id={id}>
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
