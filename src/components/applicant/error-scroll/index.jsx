import { useFormikContext, getIn } from 'formik';
import { useEffect } from 'react';

export const ApErrorScroll = () => {
  const { isSubmitting, isValidating, errors, touched } = useFormikContext();
  useEffect(() => {
    if (isSubmitting && !isValidating) {
      const errorNames = Object.keys(errors).reduce((prev, key) => {
        if (getIn(errors, key)) {
          prev.push(key);
        }
        return prev;
      }, []);

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
