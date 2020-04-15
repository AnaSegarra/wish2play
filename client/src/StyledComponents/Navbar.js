import styled from 'styled-components';

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.main.button};
  padding: 1em;
  box-shadow: ${({ theme }) => theme.nav.shadow};

  div {
    display: flex;
    align-items: center;
  }

  svg {
    margin-left: 1em;
    cursor: pointer;
    color: #fffffe;
  }
  a {
    text-decoration: none;
    color: #fffffe;
  }
  a.selected {
    font-weight: 700;
    border-bottom: 0.1em solid #d1d1e9;
  }
`;

export const SubBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.5em 1em;
  visibility: ${props => (!props.user ? 'hidden' : 'visible')};
  color: ${({ theme }) => theme.main.paragraph};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.main.paragraph};
    &:hover {
      color: ${({ theme }) => theme.nav.hover};
    }
  }
  svg,
  span {
    margin: 0;
    cursor: pointer;
    margin-left: 1em;
    transform: scaleX(-1);
    &:hover {
      color: ${({ theme }) => theme.nav.hover};
    }
  }
`;
