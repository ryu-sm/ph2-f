import { useDisclosure } from '@chakra-ui/react';
import SpWrapper from './containers/wrapper';
import SpPaper from './containers/paper';
import Header from './header';
import MenuDrawer from './menu';

export default function SpLayout({
  pageBg,
  hasChat,
  children,
  hasHeader,
  hasFooter,
  hasStepHeader,
  hasHeaderMenu,
  hasFooterContact,
}) {
  const menu = useDisclosure();
  return (
    <SpWrapper>
      <MenuDrawer menu={menu} />
      {hasHeader && <Header hasMenu={hasHeaderMenu} menu={menu} />}
      <SpPaper
        menuIsOpen={menu.isOpen}
        pageBg={pageBg}
        hasFooter={hasFooter}
        hasChat={hasChat}
        hasFooterContact={hasFooterContact}
        hasStepHeader={hasStepHeader}
      >
        {children}
      </SpPaper>
    </SpWrapper>
  );
}
