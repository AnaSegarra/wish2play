import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';

export const TopCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
`;

export const BottomCard = styled.div`
  padding: 2em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${({ theme }) => theme.main.tertiary};
    text-decoration: none;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
  .react-select-container {
    width: 30%;
  }
  .search-bar {
    width: 30%;
    margin-bottom: 0;
  }
  .react-select__control {
    border: 0.1em solid ${({ theme }) => theme.main.secondary};
    border-radius: 0.5em;
  }

  fieldset {
    padding-left: 1em;
    border: 0.1em solid ${({ theme }) => theme.main.secondary};
    border-radius: 0.5em;
    background-color: #fffffe;
    color: #7f7f7f;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .search-bar {
      width: 90%;
    }
    .react-select-container {
      width: 100%;
      margin-top: 1em;
    }
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
  div {
    display: flex;
    justify-content: center;
    margin-top: 2em;
  }
  img {
    border-radius: 0.5em;
    box-shadow: 0.2em 0.2em 0.5em #333;
    height: 200px;
  }
  a {
    color: ${({ theme }) => theme.main.tertiary};
    font-weight: 500;
    text-decoration: none;
    font-size: 1.2rem;
  }
  .btn-container {
    text-align: center;
  }
`;

export const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  margin: 2em 0;
`;

export const EmptyList = styled.div`
  margin: 0 auto;
  font-size: 1.3rem;
  div {
    border: 0.1em solid ${({ theme }) => theme.main.secondary};
    border-radius: 0.5em;
    padding: 1em;
    text-align: center;
    background: #fffffe;
    box-shadow: ${({ theme }) => theme.nav.shadow};
  }
  a {
    color: ${({ theme }) => theme.main.tertiary};
    font-weight: 500;
    text-decoration: none;
  }
`;
