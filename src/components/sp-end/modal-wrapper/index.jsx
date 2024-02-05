import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

export default function SpModalWrapper({ children, isOpen }) {
  return (
    <Modal isCentered isOpen={isOpen} colorScheme={'whiteAlpha'}>
      <ModalOverlay bg="rgba(151, 156, 207,0.6)" />
      <ModalContent w={'344px'} p={'32px'}>
        {children}
      </ModalContent>
    </Modal>
  );
}
