// dependencies
import React, { useEffect, useState } from 'react';
import { Container, Grid, Tabs, Tab } from '@material-ui/core';

// local modules
import { fetchRequests } from '../../services/requestsService';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';
import { Request } from '../../components/RequestCard';

const RequestsPanel = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await fetchRequests();
      const pending = response.filter(request => request.status === 'Pending');
      const approved = response.filter(request => request.status === 'Approved');
      setPendingRequests(pending);
      setApprovedRequests(approved);
    })();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example">
        <Tab label="Pending requests" id="simple-tab-1" aria-controls="simple-tabpanel-0" />
        <Tab label="Approved requests" id="simple-tab-2" aria-controls="simple-tabpanel-1" />
      </Tabs>

      <div value={value} index={0} role="tabpanel" hidden={value !== 0} id="wrapped-tabpanel-0">
        <Grid container spacing={3}>
          {pendingRequests.length > 0 &&
            pendingRequests.map((request, i) => (
              <Request
                request={request}
                key={i}
                updatePending={setPendingRequests}
                updateApproved={setApprovedRequests}
                pending={pendingRequests}
                approved={approvedRequests}
              />
            ))}
        </Grid>
      </div>
      <div value={value} index={1} role="tabpanel" hidden={value !== 1} id="wrapped-tabpanel-1">
        <Grid container spacing={3}>
          {approvedRequests.length > 0 &&
            approvedRequests.map((request, i) => <Request request={request} key={i} />)}
        </Grid>
      </div>
    </Container>
  );
};

export const RequestAdminPage = withProtectedRoute(RequestsPanel, true);
