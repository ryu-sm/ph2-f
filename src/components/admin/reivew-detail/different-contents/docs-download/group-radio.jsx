import { AdPulldownCheckIcon } from '@/assets/icons/ad-pulldown-check';
import { AdPulldownCheckedIcon } from '@/assets/icons/ad-pulldown-checked';
import { docsRadioOptions } from '@/pages/applicant/step-01/options';
import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
export const GroupRadio = ({ value, setValue }) => {
  return (
    <Stack ml={8}>
      <FormControl>
        <RadioGroup name="radio-buttons-group-file-option" value={value} onChange={(e) => setValue(e.target.value)}>
          {docsRadioOptions.map(({ label, value }) => (
            <FormControlLabel
              key={label}
              value={value}
              control={
                <Radio
                  size="small"
                  icon={<AdPulldownCheckIcon sx={{ width: 16, height: 16 }} />}
                  checkedIcon={<AdPulldownCheckedIcon sx={{ width: 16, height: 16 }} />}
                />
              }
              label={<Typography variant="docs_subtitle">{label}</Typography>}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

GroupRadio.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};
