import styled from 'styled-components';
import { Paper } from '@material-ui/core';

// game content
export const Container = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;

    .bottom {
      margin-top: 1em;
    }
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  padding: 2em;
  width: 100%;
  img {
    border-radius: 2em;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
  @media (max-width: 425px) {
    width: auto;
    img {
      height: 300px;
    }
  }
`;

export const Content = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 0.2em;
  }
  .subtitle {
    font-size: 0.9rem;
    text-align: center;
    margin-top: 0;
  }
  .stats {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    border: 0.1em solid ${({ theme }) => theme.main.secondary};
    background-color: ${({ theme }) => theme.chip.background};
    border-radius: 0.4em;
    p:first-of-type {
      margin-top: 0.1em;
    }
  }
  .data {
    span {
      color: ${({ theme }) => theme.main.tertiary};
      font-weight: bold;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

// buttons
export const ButtonsContainer = styled.div`
  display: flex;
  padding: 2em 2em 0;
  justify-content: space-between;

  svg {
    margin-left: 0.5em;
    color: ${({ theme }) => theme.main.tertiary};
  }
  button {
    color: ${({ theme }) => theme.main.tertiary};
    font-size: 0.8rem;
    background-color: ${({ theme }) => theme.chip.background};
    outline: none;
    border-radius: 1em;
    cursor: pointer;
    &:hover {
      background-color: rgba(206, 206, 206, 0.5);
    }
    &:focus {
      box-shadow: 0 0 0.3em 0.2em ${({ theme }) => theme.main.tertiary};
    }
  }
`;

// reviews
export const ReviewsContainer = styled(Paper)`
  padding: 2em;
  margin: 2em 0;
`;

export const Review = styled.div`
  border: 0.1em solid ${({ theme }) => theme.main.secondary};
  background-color: ${({ theme }) => theme.chip.background};
  border-radius: 0.4em;
  padding: 1em;
  margin-top: 1em;
  .stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
