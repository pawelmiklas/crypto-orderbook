import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "pages/Home/Home";

const App = () => (
  <ChakraProvider resetCSS>
    <Home />
  </ChakraProvider>
);

export default App;
