import styled from 'styled-components';

export const CardTitle = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

export const LinkContainer = styled.div`
  text-align: right;
  padding: 2em;

  a {
    color: ${({ theme }) => theme.main.button};
    text-decoration: none;
  }
`;
