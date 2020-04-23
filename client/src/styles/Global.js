import { createGlobalStyle, ThemeContext } from 'styled-components';
import { makeStyles } from '@material-ui/core';
import { useContext } from 'react';

// resets default user agent's style
export const GlobalStyle = createGlobalStyle`
    body {
        padding: 0;
        margin: 0;
        background-color: ${({ theme }) => theme.main.background};
        font-family: 'Roboto', sans-serif;
    }
    input {
        background-color: ${({ theme }) => theme.main.background};
    }
    h2.page-title {
        color:  ${({ theme }) => theme.main.tertiary};
        font-size: 2rem;
        text-align:center;
    }
`;

const paperStyles = makeStyles(theme => ({
  root: theme => ({
    backgroundColor: theme.main.background,
    color: theme.main.color
  })
}));

export const usePaperStyles = () => {
  const theme = useContext(ThemeContext);
  return paperStyles(theme);
};
