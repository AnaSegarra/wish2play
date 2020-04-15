import React, { useEffect, useState } from 'react';
import { fetchRequests } from '../../services/requestsService';
import { ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export const RequestsPanel = () => {
  const [requests, setRequests] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);


  const showEditForm = () => setIsEditing(!isEditing);

  const showImgForm = () => {
    setIsChangingImg(!isChangingImg);
    setSelectedFile(null);
  };

  useEffect(() => {
    (async () => {
      const response = await fetchRequests();
      setRequests(response);
    })();
  }, []);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <p>Pending requests</p>
      {requests.length > 0 &&
        requests.map((request, i) => {
          return (
            <div key={i}>
              <ExpansionPanel
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel${i}a-content`}
                  id={`panel${i}a-header`}>
                  <p>Game requested: {request.content.name}</p>
                </ExpansionPanelSummary>
                <div>
                  {request.content.image ? (
                    <img height="200" width="auto" src={request.content.image} />
                  ) : (
                    <div style={{ height: '200px', width: '200px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <p>No image provided</p>
                    </div>
                  )}
                  <p>
                    <span>Name:</span> {request.content.name}
                  </p>
                  <p>
                    <span>Game's synopsis:</span> {request.content.description}
                  </p>
                  <p>
                    <span>Release year:</span> {request.content.releaseYear}
                  </p>
                  <p>
                    <span>ESRB rated as:</span> {request.content.ESRB}
                  </p>
                  <p>
                    <span>Playable on:</span>
                    {request.content.platforms.join(', ')}
                  </p>
                  <p>
                    <span>Genres:</span>
                    {request.content.genres.join(', ')}
                  </p>
                  <p>
                    <span>Available:</span>
                    <a target="blank" href={request.content.linkToBuy}>
                      here
                    </a>
                  </p>
                </div>
              </ExpansionPanel>
            </div>
          );
        })}
    </div>
  );
};
