import styled from 'styled-components';
import { StyledPaper } from '../styledComponents/Home.styled';

export const GameFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  padding: 2em 2em 1em;
  label,
  button {
    margin-top: 1em;
  }
  input {
    margin: 0;
  }
`;

export const RequestContent = styled(StyledPaper)`
  .paper-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .paper-content {
    padding: 2em;
  }
  svg {
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.main.tertiary};
    }
  }
  .no-img {
    height: 200px;
    width: 200px;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;
