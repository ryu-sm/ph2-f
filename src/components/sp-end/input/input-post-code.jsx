import { Yup } from '@/libs';
import { HStack, Input, Stack, Text } from '@chakra-ui/react';
import { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { FormikProvider, useField, useFormik, useFormikContext } from 'formik';

export default function SpInputPostCode({ label, note, handleInputZipcode, handleFocusZipCode, ...props }) {
  const [field, meta] = useField(props);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const initialValues = useMemo(() => {
    const [firstCode = '', secondCode = ''] = field.value ? field.value.split('-') : ['', ''];
    return { firstCode, secondCode };
  }, [field.value]);

  const refOne = useRef('');
  const refTwo = useRef('');
  const currentIndex = useRef(0);

  const [firstTouchField, setFirstTouchField] = useState(false);

  const zipCodeInputs = useMemo(
    () => [
      {
        name: 'firstCode',
        ref: refOne,
        maxLength: 3,
        placeholder: '000',
        w: '65px',
      },
      {
        name: 'secondCode',
        ref: refTwo,
        maxLength: 4,
        placeholder: '0000',
        w: '76px',
      },
    ],
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({ firstCode: Yup.string(), secondCode: Yup.string() }),
    enableReinitialize: true,
    onSubmit() {},
  });

  const handleBackInput = useCallback(() => {
    const prevIndex = currentIndex.current - 1;

    if (prevIndex !== -1) {
      const prevInput = zipCodeInputs?.[prevIndex]?.ref.current;
      prevInput.focus();

      currentIndex.current = prevIndex;
    }
  }, [zipCodeInputs]);

  const handleNextInput = useCallback(() => {
    const nextIndex = currentIndex.current + 1;

    if (nextIndex === zipCodeInputs.length) {
      return zipCodeInputs?.[currentIndex.current]?.ref.current.blur();
    }
    const nextInput = zipCodeInputs?.[nextIndex]?.ref.current;
    nextInput?.focus();

    currentIndex.current = nextIndex;
  }, [zipCodeInputs]);

  const handleKeyPress = useCallback(
    (e) => {
      if ((e.target.value.length === 3 && e.target.name === 'firstCode') || e.target.value.length === 4)
        handleNextInput();
      if (e.target.value.length === 0) handleBackInput();

      if (refOne.current.value || refTwo.current.value) {
        return setFieldValue(field.name, `${refOne.current.value}-${refTwo.current.value}`);
      }

      return setFieldValue(field.name, '');
    },
    [field.name, handleBackInput, handleNextInput, setFieldValue]
  );

  const handleBlur = useCallback(() => {
    if (!!refOne.current && !!refTwo.current) {
      if (!!refOne.current.value || !!refTwo.current.value) {
        setFieldValue(field.name, `${refOne.current.value}-${refTwo.current.value}`);
        if (handleInputZipcode) {
          handleInputZipcode(`${refOne.current.value}-${refTwo.current.value}`);
        }
      }
    }
    setFirstTouchField(false);
  }, [field.name, handleInputZipcode, setFieldValue]);

  const handleFocusInput = useCallback(
    (e, name) => {
      if (e.key !== 'Backspace' && name === 'firstCode' && refOne.current?.value.length === 3) {
        handleNextInput();
      }
      if (handleFocusZipCode) {
        handleFocusZipCode();
      }
      if (e.key === 'Backspace' && refTwo.current?.value === '') handleBackInput();
    },
    [handleBackInput, handleFocusZipCode, handleNextInput]
  );
  return (
    <FormikProvider value={formik}>
      <HStack>
        {zipCodeInputs.map((input, index) => (
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
              {index !== zipCodeInputs.length - 1 && <Text variant={'sp_16_100'}>-</Text>}
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
