import styled from 'styled-components';

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.main.button};
  padding: 1em;
  box-shadow: ${({ theme }) => theme.shadows.nav};
  color: #fffffe;

  div {
    display: flex;
    align-items: center;
  }

  svg {
    margin-left: 1em;
    cursor: pointer;
  }
`;

export const SubBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.5em 1em;
  visibility: ${props => (!props.user ? 'hidden' : 'visible')};

  p,
  svg {
    margin: 0;
    cursor: pointer;
    margin-left: 1em;
  }
  svg {
    transform: scaleX(-1);
    &:hover {
      color: #6246ea;
    }
  }
`;
