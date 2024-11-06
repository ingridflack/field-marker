import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
  }
`;

export default GlobalStyle;