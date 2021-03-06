import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { Slider } from 'infinite-react-carousel/lib';

export const StyledPaper = styled(Paper)`
  border: 0.1em solid ${({ theme }) => theme.main.secondary};
  background: ${({ theme }) => theme.main.background};
  overflow: hidden;
  margin-bottom: 2em;
  div.mb {
    padding: 0 2em;
    p {
      margin-bottom: 0.6em;
    }
  }
  a {
    text-decoration: none;
  }
  p.paper-title {
    font-size: 1.25rem;
    font-weight: 500;
    padding: 1em 1.7em;
    margin: 0;
    background-color: ${({ theme }) => theme.main.button};
    color: #fffffe;
  }
  p.center {
    text-align: center;
  }
  div.fw {
    max-width: fit-content;
  }
`;

export const ModalOpener = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.main.paragraph};
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledSlider = styled(Slider)`
  .carousel-initialized {
    padding: 1em 0 1em 3em !important;
  }
  .carousel-prev,
  .carousel-next {
    color: ${({ theme }) => theme.main.button};
  }
`;
