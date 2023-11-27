import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  // [NextJS Reset]
  html {
    display: flex;
    min-height: 100%;
    flex-direction: column;
    height: 100%;
  }
  body {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
  }
  #__next {
    width: 100%;
    overflow: scroll;
    display: flex;
    flex: 1;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    flex-shrink: 0;
    position: relative;
  }
  // [Reset Styles]
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: unset;
  }
`;

export default GlobalStyle;
