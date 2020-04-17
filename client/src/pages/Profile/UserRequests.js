import React, { useEffect, useState } from 'react';
import { fetchRequests } from '../../services/requestsService';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export const UserRequests = () => {
  const [requests, setRequests] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    (async () => {
      const response = await fetchRequests();
      console.log(response);
      setRequests(response);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <>Cargando</>;

  return (
    <div>
      {requests.length === 0 ? (
        <p>You haven't made any requests yet</p>
      ) : (
        <>
          <p>Check the status of your latest requests</p>
          {requests.map((request, i) => (
            <ExpansionPanel
              key={i}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <p>Game: {request.content.name}</p>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>Request status: {request.status}</p>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </>
      )}
    </div>
  );
};
