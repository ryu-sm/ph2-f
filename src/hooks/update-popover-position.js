import { useState } from 'react';

export const usePopoverPositionByClick = () => {
  const [transformOrigin, setTransformOrigin] = useState({
    vertical: 'top',
    horizontal: 'left',
  });

  const [anchorOrigin, setAnchorOrigin] = useState({
    vertical: 'top',
    horizontal: 'left',
  });

  const updatePopoverPosition = (event) => {
    const { clientY } = event;
    const distanceToBottom = window.innerHeight - clientY;
    if (distanceToBottom < 200) {
      setTransformOrigin({
        vertical: 'bottom',
        horizontal: 'left',
      });
      setAnchorOrigin({
        vertical: 'bottom',
        horizontal: 'left',
      });
    }
  };

  return { anchorOrigin, transformOrigin, updatePopoverPosition };
};
