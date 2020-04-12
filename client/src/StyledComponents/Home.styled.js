import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import { Slider } from 'infinite-react-carousel/lib';

export const StyledPaper = styled(Paper)`
  border: 0.08em solid ${({ theme }) => theme.main.secondary};
  overflow: hidden;
  margin-bottom: 2em;
  div.mb {
    padding: 0 2em;
    p {
      margin-bottom: 0.6em;
    }
  }
  p.paper-title {
    font-size: 1.25rem;
    padding: 1em 1.7em;
    margin: 0;
    background-color: ${({ theme }) => theme.main.button};
    color: #fffffe;
  }
`;

export const ModalOpener = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.main.button};
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
    color: #fffffe;
  }
`;
