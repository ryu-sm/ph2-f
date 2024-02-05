import { Yup } from '@/libs';
import { HStack, Input, Stack, Text } from '@chakra-ui/react';
import { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { FormikProvider, useField, useFormik, useFormikContext } from 'formik';

export default function SpInputPhone({ label, note, handleInputZipcode, handleFocusZipCode, ...props }) {
  const [field, meta] = useField(props);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const initialValues = useMemo(() => {
    const [phoneOne = '', phoneTwo = '', phoneThree = ''] = field.value ? field.value.split('-') : ['', '', ''];
    return { phoneOne, phoneTwo, phoneThree };
  }, [field.value]);

  const refOne = useRef('');
  const refTwo = useRef('');
  const refThree = useRef('');

  const currentIndex = useRef(0);

  const [firstTouchField, setFirstTouchField] = useState(false);

  const phoneInputs = useMemo(
    () => [
      {
        name: 'phoneOne',
        ref: refOne,
        maxLength: 4,
        placeholder: '0000',
        w: '65px',
      },
      {
        name: 'phoneTwo',
        ref: refTwo,
        maxLength: 4,
        placeholder: '0000',
        w: '76px',
      },
      {
        name: 'phoneThree',
        ref: refThree,
        maxLength: 4,
        placeholder: '0000',
        w: '76px',
      },
    ],
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({ phoneOne: Yup.string(), phoneTwo: Yup.string(), phoneThree: Yup.string() }),
    enableReinitialize: true,
    onSubmit() {},
  });
  const handleBackInput = useCallback(() => {
    const prevIndex = currentIndex.current - 1;

    if (prevIndex !== -1) {
      const prevInput = phoneInputs?.[prevIndex]?.ref.current;
      prevInput?.focus();

      currentIndex.current = prevIndex;
    }
  }, [phoneInputs]);

  const handleNextInput = useCallback(() => {
    const nextIndex = currentIndex.current + 1;

    if (nextIndex === phoneInputs.length) {
      return phoneInputs?.[currentIndex.current]?.ref.current?.blur();
    }
    const nextInput = phoneInputs?.[nextIndex]?.ref.current;
    nextInput?.focus();

    currentIndex.current = nextIndex;
  }, [phoneInputs]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.target.value.length === 4) handleNextInput();

      if (e.target.value.length === 0) handleBackInput();

      if (refOne.current.value || refTwo.current.value || refThree.current.value) {
        return setFieldValue(field.name, `${refOne.current.value}-${refTwo.current.value}-${refThree.current.value}`);
      }
      return setFieldValue(field.name, '');
    },
    [field.name, handleBackInput, handleNextInput, setFieldValue]
  );

  const handleBlur = useCallback(() => {
    if (refOne.current && refTwo.current && refThree.current) {
      let subPhoneNumber = [refOne.current.value, refTwo.current.value, refThree.current.value];

      if (subPhoneNumber.length) {
        phoneInputs?.forEach((input, index) => formik.setFieldValue(input.name, subPhoneNumber?.[index]));

        if (!subPhoneNumber.every((sub) => !sub)) {
          setFieldValue(field.name, subPhoneNumber.map((sub) => sub).join('-'));
        }
      }
    }
    setFirstTouchField(false);
  }, [setFieldValue, field.name, formik, phoneInputs]);

  const handleFocusInput = useCallback(
    (e, name) => {
      if (e.key !== 'Backspace') {
        if (
          (name === 'phoneOne' && refOne.current.value.length === 4) ||
          (name === 'phoneTwo' && refTwo.current.value.length === 4)
        )
          handleNextInput();
      }
      if (
        e.key === 'Backspace' &&
        ((refTwo.current.value === '' && currentIndex.current === 1) ||
          (refThree.current.value === '' && currentIndex.current === 2))
      )
        handleBackInput();
    },
    [handleBackInput, handleNextInput, props.type]
  );
  return (
    <FormikProvider value={formik}>
      <HStack>
        {phoneInputs.map((input, index) => (
          <Fragment key={index}>
            <HStack spacing={'6px'}>
              <Input
                sx={{
                  color: 'sp.text.main',
                  border: '1px solid',
                  borderColor: 'sp.primary.40',
                  borderRadius: '4px',
                  boxShadow: '0px 4px 6px 0px rgba(44, 54, 156, 0.10) inset',
                  backgroundColor: 'white',
                  _focus: {
                    backgroundColor: 'sp.focus',
                    border: '1px solid',
                    borderColor: 'sp.primary.100',
                  },
                  _focusVisible: {
                    outline: 'none',
                  },
                  _placeholder: {
                    color: 'sp.placeholder',
                    fontWeight: '300',
                  },
                  ...(!firstTouchField &&
                    !!meta.error &&
                    meta.touched && { color: 'sp.secondary.100', borderColor: 'sp.secondary.100' }),
                  letterSpacing: '0.6px',
                  fontFamily: 'Hiragino Sans',
                  fontStyle: 'normal',
                  fontSize: '16px',
                  fontWeight: 300,
                  lineHeight: '100%',
                }}
                p="0px"
                h={'48px'}
                w={input.w}
                textAlign={'center'}
                ref={input.ref}
                name={input.name}
                onInput={(e) => (e.target.value = e.target.value.replace(/[^\d]+/g, ''))}
                placeholder={input.placeholder}
                onChange={handleKeyPress}
                onKeyDown={(e) => handleFocusInput(e, input.name)}
                onFocus={() => {
                  setFieldTouched(field.name);
                  setFirstTouchField(true);
                  currentIndex.current = index;
                }}
                onBlur={handleBlur}
                maxLength={input.maxLength}
              />
              {index !== phoneInputs.length - 1 && <Text variant={'sp_16_100'}>-</Text>}
            </HStack>
          </Fragment>
        ))}
        {!firstTouchField && !!meta.error && meta.touched && (
          <Text variant={'sp_12_130_blod'} color={'sp.secondary.100'}>
            ※{meta.error}
          </Text>
        )}
      </HStack>
    </FormikProvider>
  );
}
