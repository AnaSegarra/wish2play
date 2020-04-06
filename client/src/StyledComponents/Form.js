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
  color: #172c66;
  font-size: 1rem;
  padding: 0.5em 1em;
  margin-bottom: 2em;
  border: 0.1em solid #d1d1e9;
  border-radius: 0.5em;
  outline: none;

  &:focus {
    color: #6246ea;
    border: 0.1em solid #6246ea;
    box-shadow: 0 0 0.2em 0.1em rgba(98, 70, 234, 0.5);
  }
`;

export const Button = styled.button`
  color: #fffffe;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  background: linear-gradient(-180deg, #7016ea, #6246ea 90%);
  &:hover {
    background: linear-gradient(-180deg, #6314d2, #4f30e8 90%);
  }
`;
