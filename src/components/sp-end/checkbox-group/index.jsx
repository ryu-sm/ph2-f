import { SpCheckboxItemCheckedIcon, SpCheckboxItemIcon } from '@/assets/svgs';
import { Box, HStack, Stack, Text, chakra, useCheckbox, useCheckboxGroup } from '@chakra-ui/react';
import { useField } from 'formik';

export default function SpCheckboxGroup({ options, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { value, getCheckboxProps } = useCheckboxGroup(props);
  return (
    <Stack spacing={'6px'}>
      {!!meta.error && (
        <Text variant={'sp_12_130_blod'} color={'sp.secondary.100'}>
          ※{meta.error}
        </Text>
      )}
      <Box
        px={'8px'}
        py={'12px'}
        bg={'white'}
        border={'1px solid'}
        borderColor={!!meta.error ? 'sp.secondary.100' : value.length > 0 ? 'sp.primary.100' : 'sp.primary.40'}
        borderRadius={'14px'}
        boxShadow={'0px 0px 15px 0px rgba(60, 72, 196, 0.10)'}
      >
        <Stack spacing={'12px'}>
          {options.map((item) => (
            <CustomCheckbox key={item.value} {...getCheckboxProps({ ...item, ...props })} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

function CustomCheckbox(props) {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(props);

  return (
    <chakra.label
      name={props.name}
      display="flex"
      flexDirection="row"
      alignItems="center"
      cursor="pointer"
      {...htmlProps}
    >
      <input id={props.name} {...getInputProps()} hidden />
      <Box>
        <HStack minH={'30px'} {...getCheckboxProps()}>
          {state.isChecked ? <SpCheckboxItemCheckedIcon /> : <SpCheckboxItemIcon />}
          <Text variant={'sp_16_100_bold'} color={'sp.primary.100'} {...getLabelProps()}>
            {props.label}
          </Text>
        </HStack>
      </Box>
    </chakra.label>
  );
}
