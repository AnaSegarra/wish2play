import React, { useEffect, useState } from 'react';
import { fetchRequests } from '../../services/requestsService';
import { Container, Grid } from '@material-ui/core';
import { Request } from '../../components/RequestCard';

export const RequestsPanel = () => {
  const [requests, setRequests] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetchRequests();
      setRequests(response);
    })();
  }, []);

  const showEditForm = () => setIsEditing(!isEditing);

  return (
    <Container>
      <p>Pending requests</p>
      <Grid container spacing={3}>
        {requests.length > 0 && requests.map((request, i) => <Request request={request} key={i} />)}
      </Grid>
    </Container>
  );
};
