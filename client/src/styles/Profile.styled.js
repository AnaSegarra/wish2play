import styled from 'styled-components';
import { GridListTile } from '@material-ui/core';
import { StyledPaper } from './Home.styled';
import { Link } from 'react-router-dom';

export const UserDetailsContainer = styled(StyledPaper)`
  padding: 2em;
  .img-container {
    display: flex;
    justify-content: center;
  }
  .name {
    font-size: 1.1rem;
    margin-bottom: 0;
  }
  .username {
    color: ${({ theme }) => theme.nav.hover};
    margin-top: 0.4em;
  }
  .bio {
    font-size: 0.8rem;
  }
  .data {
    margin-top: 1em;
    padding: 1em;
    border: 0.1em solid ${({ theme }) => theme.main.secondary};
    border-radius: 0.5em;
    div {
      text-align: right;
    }
    .edit {
      color: #1a8a77;
      &:hover {
        color: #33cc33;
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
  }
  #upload-form {
    margin: 0.5em 0;
  }
  .btn-container {
    display: flex;
    justify-content: space-between;
  }
  button {
    font-size: 0.8rem;
  }
  svg {
    cursor: pointer;
  }
  .remove-friend {
    color: #b33300;
  }
  .add-friend {
    color: #1a8a77;
  }
`;

export const PeopleContainer = styled.div`
  font-size: 0.9rem;
  margin-top: 1em;
  padding: 1em;
  border: 0.1em solid ${({ theme }) => theme.main.secondary};
  border-radius: 0.5em;

  .friends {
    color: ${({ theme }) => theme.main.tertiary};
    font-weight: 500;
    font-size: 1rem;
    margin-top: 0;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1em;
  }
`;

export const UsersContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 0;
  p {
    margin: 0 0.5em;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.main.tertiary};
    }
  }
`;

export const UserInteraction = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;
  div {
    display: inline-flex;
    align-items: center;
    border: 0.1em solid ${({ theme }) => theme.main.secondary};
    border-radius: 1em;
    padding: 0.5em 1em;
    cursor: pointer;
    box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14),
      0px 1px 8px 0px rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.2s, transform 0.3s;
    &:hover {
      background-color: rgb(206, 206, 206);
      box-shadow: none;
      transform: translate(0.1em, 0.1em);
    }
  }
  p {
    margin: 0;
    margin-left: 1em;
  }
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.main.tertiary};
  font-weight: 500;
  text-decoration: none;
`;

export const StyledGridListTile = styled(GridListTile)`
  background-color: ${({ theme }) => theme.main.secondary};
  color: ${({ theme }) => theme.main.tertiary};
  font-weight: 500;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    color: ${({ theme }) => theme.main.tertiary};
  }
`;

export const ListPlaceholder = styled.div`
  text-align: center;
  padding-bottom: 1em;
  a {
    color: ${({ theme }) => theme.main.tertiary};
    font-weight: 500;
    text-decoration: none;
  }
`;

export const PanelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2em;
  padding-right: 0.5em;
  a {
    color: ${({ theme }) => theme.main.tertiary};
    text-decoration: none;
    font-weight: 500;
  }
  a,
  p {
    flex-grow: 1;
  }
  .completed {
    color: #33cc33;
  }
  .pending {
    color: #ff9933;
  }
  .rejected {
    color: #cc0000;
  }
`;
