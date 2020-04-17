import styled from 'styled-components';
import { GridListTile } from '@material-ui/core';

export const UsersContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 0;
  p {
    margin: 0 0.5em;
  }
`;

export const StyledGridListTile = styled(GridListTile)`
  background-color: ${({ theme }) => theme.main.secondary};
  color: ${({ theme }) => theme.main.tertiary};
  font-weight: bold;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    color: ${({ theme }) => theme.main.tertiary};
  }
`;
