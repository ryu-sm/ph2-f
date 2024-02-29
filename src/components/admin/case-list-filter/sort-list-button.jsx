import { AdListSortAscIcon } from '@/assets/icons/ad-list-sort-asc';
import { AdListSortDefaultIcon } from '@/assets/icons/ad-list-sort-default';
import { AdListSortDescIcon } from '@/assets/icons/ad-list-sort-desc';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
export const SortListButton = ({ direction, onClick }) => {
  return (
    <IconButton sx={{ p: '2px' }}>
      <AdListSortDefaultIcon
        sx={{
          width: 16,
          height: 13,
          color: 'gray.80',
        }}
      />
      {direction === 'desc' && (
        <AdListSortDescIcon
          sx={{
            width: 16,
            height: 13,
            color: 'primary.main',
          }}
          stroke="gray.80"
          onClick={onClick}
        />
      )}
      {direction === 'asc' && (
        <AdListSortAscIcon
          sx={{
            width: 16,
            height: 13,
            color: 'primary.main',
          }}
          onClick={onClick}
        />
      )}
    </IconButton>
  );
};

SortListButton.propTypes = {
  direction: PropTypes.string,
  onClick: PropTypes.func,
};
