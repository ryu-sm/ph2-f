import { useTheme } from '@emotion/react';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
export const FilterItem = ({ label, dropDownItem }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };
  return (
    <Accordion
      expanded={expanded}
      disableGutters
      sx={{
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px',
        '&:before': { display: 'none' },
        '& .MuiAccordionDetails-root': {
          padding: 0,
        },
        border: `1px solid ${theme.palette.gray[60]}`,
        bgcolor: 'white',
      }}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          px: '68px',
          minHeight: '56px',
          justifyContent: 'space-between',
          '& .MuiAccordionSummary-content': {
            margin: '8px 0',
          },
          bgcolor: 'white',
        }}
      >
        <Typography variant="filter_item_label">{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>{dropDownItem}</AccordionDetails>
    </Accordion>
  );
};

FilterItem.propTypes = {
  label: PropTypes.string,
  dropDownItem: PropTypes.node,
};
