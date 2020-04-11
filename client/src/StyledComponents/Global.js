import { createGlobalStyle } from 'styled-components';

// resets default user agent's style
export const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        background-color: ${({ theme }) => theme.main.background};
    }
`;
