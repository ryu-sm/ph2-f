import { useFormikContext } from 'formik';
import { useEffect } from 'react';

export const ApErrorScroll = () => {
  const { isSubmitting, isValidating, errors, touched } = useFormikContext();
  useEffect(() => {
    if (isSubmitting && !isValidating) {
      const errorNames = [];
      const parseErrors = (basePre, errors) => {
        let pre = basePre;
        Object.entries(errors).forEach(([key, value]) => {
          if (typeof value === 'string') {
            if (!!pre) {
              errorNames.push(`${pre}.${key}`);
            } else {
              errorNames.push(key);
            }
          } else {
            if (isNaN(parseInt(key))) {
              parseErrors(`${pre}${key}`, value);
            } else {
              parseErrors(`${pre}[${key}]`, value);
            }
          }
        });
      };

      parseErrors('', errors);
      if (errorNames.length && typeof document !== 'undefined') {
        let errorElement;
        errorNames.forEach((errorKey) => {
          const selector = `[name="${errorKey}"]`;
          if (!errorElement) {
            errorElement = document.querySelector(selector);
            return;
          }
        });
        setTimeout(() => {
          if (errorElement) {
            if (errorElement.type === 'hidden') {
              errorElement.parentElement?.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
              });
            } else {
              errorElement.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
              });
            }
          }
        }, 100);
      }
    }
  }, [isSubmitting, isValidating, errors, touched]);
  return null;
};
