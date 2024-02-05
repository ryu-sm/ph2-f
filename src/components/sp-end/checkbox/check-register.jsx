import { useCheckbox, chakra, Flex } from '@chakra-ui/react';
import { SpCheckConfirmCheckedIcon, SpCheckConfirmIcon } from '@/assets/svgs';

export default function SpCheckRegister(props) {
  const { state, getCheckboxProps, getInputProps, htmlProps } = useCheckbox(props);
  return (
    <chakra.label
      maxH={'24px'}
      maxW={'24px'}
      display="flex"
      cursor="pointer"
      alignItems="center"
      flexDirection="row"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex alignItems="center" justifyContent="center" {...getCheckboxProps()}>
        {state.isChecked ? <SpCheckConfirmCheckedIcon /> : <SpCheckConfirmIcon />}
      </Flex>
    </chakra.label>
  );
}
