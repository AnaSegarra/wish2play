import styled from 'styled-components';

export const StyledForm = styled.form`
  padding: 2em 2em 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    margin-bottom: 0.5em;
  }
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.input.color};
  font-size: 1rem;
  padding: 0.5em 1em;
  margin-bottom: 2em;
  border: 0.1em solid ${({ theme }) => theme.main.secondary};
  border-radius: 0.5em;
  outline: none;

  &:focus {
    border: 0.1em solid ${({ theme }) => theme.input.focus};
    box-shadow: 0 0 0.2em 0.1em ${({ theme }) => theme.input.shadow};
  }
`;

export const Button = styled.button`
  font-size: 1rem;
  color: #fffffe;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  border: 0.1em solid ${({ theme }) => theme.button.border};
  background: ${({ theme }) => theme.button.bg};
  outline: none;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.button.hover};
  }
  &:focus {
    box-shadow: ${({ theme }) => theme.button.focus};
  }
`;

export const CancelBtn = styled(Button)`
  background: linear-gradient(-180deg, #990000, #cc0000 90%);
  border: 0.1em solid #992600;
  &:hover {
    background: linear-gradient(-180deg, #992600, #b30000 90%);
  }
  &:focus {
    box-shadow: 0 0 0.3em 0.2em #cc0000;
  }
`;
