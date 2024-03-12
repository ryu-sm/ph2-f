import { DOCS_CATEGORY } from '@/constant/docs-category';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
export const DocsCategoryItem = ({ category, children }) => {
  return (
    <Stack px={5} py={1} border={'1px solid'} borderColor={'gray.60'}>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Typography variant="docs_category">{category}</Typography>
        <Typography variant="docs_category_label">{DOCS_CATEGORY[category]}</Typography>
      </Stack>
      {category === 'A' ? (
        children
      ) : (
        <Stack spacing={3} pb={2}>
          {children}
        </Stack>
      )}
    </Stack>
  );
};

DocsCategoryItem.propTypes = {
  category: PropTypes.string,
  children: PropTypes.node,
};
