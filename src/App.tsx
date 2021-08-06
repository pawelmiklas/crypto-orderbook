import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Home from "pages/Home/Home";

const theme = extendTheme({
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Montserrat, sans-serif",
  },
});

const App = () => (
  <ChakraProvider resetCSS theme={theme}>
    <Home />
  </ChakraProvider>
);

export default App;
