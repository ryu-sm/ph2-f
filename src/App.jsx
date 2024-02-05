import Router from '@/routers';
import { ChakraProvider, ChakraBaseProvider } from '@chakra-ui/react';
import { theme } from '@/theme';
function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Router />
    </ChakraBaseProvider>
  );
}

export default App;
