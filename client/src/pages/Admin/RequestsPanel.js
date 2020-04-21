// dependencies
import React, { useEffect, useState, useContext } from 'react';
import { Container } from '@material-ui/core';
import { ThemeContext } from 'styled-components';

// local modules
import { fetchRequests } from '../../services/requestsService';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { Request } from '../../components/RequestRow';

// styled components
import { Row } from '../../styles/Admin.styled';
import { StyledPaper } from '../../styles/Home.styled';

const RequestsPanel = () => {
  const theme = useContext(ThemeContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchRequests();
      setRequests(response);
    })();
  }, []);

  return (
    <Container>
      <StyledPaper>
        <p className="paper-title">Requests from users</p>
        <Row theme={theme}>
          <p className="first-row">Status</p>
          <p className="first-row">Name</p>
          <p className="first-row">Requested by</p>
          <div></div>
        </Row>
        {requests.length > 0 &&
          requests.map((request, i) => {
            return (
              <Row key={i}>
                <Request request={request} updateRequest={setRequests} allRequests={requests} />
              </Row>
            );
          })}
      </StyledPaper>
    </Container>
  );
};

export const RequestAdminPage = withProtectedRoute(RequestsPanel, true);
