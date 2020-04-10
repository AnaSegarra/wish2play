import styled from 'styled-components';

export const CardTitle = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

export const BottomCard = styled.div`
  padding: 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${({ theme }) => theme.main.button};
    text-decoration: none;
  }
`;
