import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';

export const NumberFormatInput = forwardRef(function NumberFormatInput(props, ref) {
  const { onChange, ...otherProps } = props;

  const handleChange = (values) => {
    onChange({
      target: {
        value: values.value,
      },
    });
  };

  return <NumericFormat {...otherProps} getInputRef={ref} onValueChange={handleChange} thousandSeparator />;
});
