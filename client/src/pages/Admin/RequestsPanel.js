import React, { useEffect, useState } from 'react';
import { fetchRequests } from '../../services/requestsService';
import { Container, Grid } from '@material-ui/core';
import { Request } from '../../components/RequestCard';

export const RequestsPanel = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    (async () => {
      console.log('useEffect de las requests');
      const response = await fetchRequests();
      setRequests(response);
    })();
  }, []);

  return (
    <Container>
      <p>Pending requests</p>
      <Grid container spacing={3}>
        {requests.length > 0 && requests.map((request, i) => <Request request={request} key={i} />)}
      </Grid>
    </Container>
  );
};
