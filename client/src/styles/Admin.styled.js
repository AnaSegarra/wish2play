import styled from 'styled-components';

export const GameFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  padding: 2em 2em 1em;
  label,
  button {
    margin-top: 1em;
  }
  label {
    margin-bottom: 0.5em;
  }
  input {
    margin: 0;
  }
  .img-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      margin-top: 1em;
    }
  }
  .btn-container {
    display: flex;
    justify-content: center;
  }
  .react-select__control {
    border: 0.1em solid ${({ theme }) => theme.main.secondary};
    background: ${({ theme }) => theme.main.background};
    border-radius: 0.5em;
  }
  .react-select__menu {
    background: ${({ theme }) => theme.main.background};
    color: ${({ theme }) => theme.main.tertiary};
  }
`;

export const ImgPlaceholder = styled.div`
  height: 200px;
  width: 200px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  color: #333;
  border-radius: 1em;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2em;
  p {
    width: 20%;
  }
  div {
    width: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .first-row {
    color: ${({ theme }) => theme.main.tertiary};
    font-weight: 500;
    padding-top: 1em;
  }
  .edit,
  .delete {
    cursor: pointer;
  }
  .edit {
    margin-right: 1em;
  }
  .edit:hover,
  .approved {
    color: #33cc33;
  }
  .delete:hover,
  .rejected {
    color: #cc0000;
  }
`;
