import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const StyledPaper = styled(Paper)`
  border: 0.08em solid #d1d1e9;
  overflow: hidden;

  div {
    padding: 0 2em;
  }

  p.paper-title {
    font-size: 1.25rem;
    padding: 1em 1.7em;
    margin: 0;
    background-color: #6246ea;
    color: #fffffe;
  }
`;

export const ModalOpener = styled.span`
  cursor: pointer;
  color: #6246ea;
  &:hover {
    text-decoration: underline;
  }
`;
