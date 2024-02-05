import { SpRadioItemCheckedIcon, SpRadioItemIcon } from '@/assets/svgs';
import { Box, HStack, Stack, Text, chakra, useRadio, useRadioGroup } from '@chakra-ui/react';
import { useField } from 'formik';

export default function SpRadioGroup({ options, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { getRadioProps, getRootProps } = useRadioGroup({
    ...props,
    onChange: (value) => {
      helpers.setValue(parseInt(value));
      helpers.setError(null);
    },
  });

  return (
    <Stack spacing={'6px'}>
      {!!meta.error && (
        <Text variant={'sp_12_130_blod'} color={'sp.secondary.100'}>
          ※{meta.error}
        </Text>
      )}
      <Stack {...getRootProps()} spacing={'12px'}>
        {options.map((item) => {
          return <CustomRadio key={item.value} hasError={!!meta.error} {...getRadioProps(item)} />;
        })}
      </Stack>
    </Stack>
  );
}

function CustomRadio({ hasError, ...props }) {
  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } = useRadio(props);

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({})} hidden />
      <Box
        h={'48px'}
        p={'8px'}
        border={'1px solid'}
        borderColor={hasError ? 'sp.secondary.100' : state.isChecked ? 'sp.primary.100' : 'sp.primary.40'}
        borderRadius={'14px'}
        bg={state.isChecked ? 'sp.primary.40' : 'white'}
        boxShadow={'box-shadow: 0px 0px 15px 0px rgba(60, 72, 196, 0.10)'}
        {...getRadioProps()}
      >
        <HStack h={'32px'} spacing={'10px'} alignItems={'center'}>
          {state.isChecked ? <SpRadioItemCheckedIcon /> : <SpRadioItemIcon />}
          <Text variant={'sp_16_100_bold'} color={'sp.primary.100'} {...getLabelProps()}>
            {props.label}
          </Text>
        </HStack>
      </Box>
    </chakra.label>
  );
}
