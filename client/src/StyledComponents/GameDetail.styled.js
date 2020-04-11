import styled from 'styled-components';

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
