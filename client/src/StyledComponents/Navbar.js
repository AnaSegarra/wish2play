import styled from 'styled-components';

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6246ea;
  padding: 1em;
  box-shadow: 0em 0.2em 0.2em #333;
  color: #fffffe;
`;

export const SubBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.5em 1em;
  visibility: ${(props) => (!props.user ? 'hidden' : 'visible')};

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
