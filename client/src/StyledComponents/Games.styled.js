import styled from 'styled-components';

export const TopCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
`;

export const BottomCard = styled.div`
  padding: 2em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${({ theme }) => theme.main.tertiary};
    text-decoration: none;
  }
`;
