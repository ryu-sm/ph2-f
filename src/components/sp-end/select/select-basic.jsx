import { useEffect } from 'react';
import { useField } from 'formik';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { SpSelectDownIcon } from '@/assets/svgs';

export default function SpSelect({ options, placeholder, error, unit, width, menuWidth, align, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelect = (value) => {
    setValue(value);
    onClose();
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (isOpen) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isOpen]);
  return (
    <Stack>
      <HStack spacing={'5px'}>
        <Menu isOpen={isOpen} {...field} {...props} matchWidth={true}>
          <MenuButton
            as={Button}
            rightIcon={
              <Box pos={'absolute'} right={'18px'} bottom={'18px'} w={'6px'} h={'16px'}>
                <SpSelectDownIcon />
              </Box>
            }
            sx={{
              h: '48px',
              w: width || '100%',
              p: '6px',
              color: meta.value ? 'sp.text.main' : 'sp.placeholder',
              border: '1px solid',
              borderColor: 'sp.primary.40',
              borderRadius: '4px',
              textAlign: align || 'center',
              boxShadow: '0px 4px 6px 0px rgba(44, 54, 156, 0.10) inset',
              backgroundColor: 'white',
              letterSpacing: '0.6px',
              fontFamily: 'Hiragino Sans',
              fontStyle: 'normal',
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: '100%',
              ...(meta.value !== '' && {
                border: '1px solid',
                backgroundColor: 'sp.gray.100',
                boxShadow: 'none',
              }),
              ...(error && {
                borderColor: 'sp.secondary.100',
                backgroundColor: meta.value === '' ? 'white' : 'sp.secondary.20',
              }),
            }}
            _active={{
              backgroundColor: 'sp.focus',
              border: '1px solid',
              borderColor: 'sp.primary.100',
            }}
            _hover={{
              border: '1px solid',
              borderColor: 'sp.primary.40',
              boxShadow: '0px 4px 6px 0px rgba(44, 54, 156, 0.10) inset',
              backgroundColor: 'white',
            }}
            onClick={onOpen}
          >
            {meta.value === '' ? placeholder : options.find((item) => item.value === meta.value).label}
          </MenuButton>
          <MenuList
            bg={'white'}
            minW={'0px'}
            maxH={'50dvh'}
            overflowY={'auto'}
            w={menuWidth}
            zIndex={999 + 2}
            color={'sp.text.main'}
            fontSize={'24px'}
            fontWeight={600}
            fontStyle={'normal'}
            letterSpacing={'0.4px'}
            fontFamily={'Hiragino Sans'}
          >
            {options.map((item) => (
              <MenuItem
                className={item.className}
                key={item.value}
                onClick={() => handleSelect(item.value)}
                bg={item.value === meta.value ? 'sp.primary.20' : ''}
                _hover={{ bg: 'sp.gray.100' }}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        {isOpen && (
          <Portal>
            <Box
              zIndex={999 + 1}
              width="100%"
              height="100%"
              bg="sp.primary.80"
              opacity={0.6}
              position="fixed"
              top={0}
              left={0}
              onClick={onClose}
            ></Box>
          </Portal>
        )}
        {unit && <Text variant={'sp_16_100'}>{unit}</Text>}
      </HStack>
      {/* <Text variant={'sp_12_130_blod'} color={'sp.secondary.100'}>
        ※{meta.error}
      </Text> */}
    </Stack>
  );
}
