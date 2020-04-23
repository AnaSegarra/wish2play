// dependencies
import React, { useEffect, useState } from 'react';
import { BadgeCheck } from 'styled-icons/boxicons-solid';
import { CircleWithCross } from 'styled-icons/entypo';
import { LoaderCircle } from 'styled-icons/boxicons-regular';

// local modules
import { fetchRequests } from '../../services/requestsService';

// styled components
import { StyledPaper } from '../../styles/Home.styled';
import { PanelRow } from '../../styles/Profile.styled';
import { usePaperStyles } from '../../styles/Global';

export const UserRequests = () => {
  const classes = usePaperStyles();
  const [requests, setRequests] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetchRequests();
      setRequests(response);
      setIsLoading(false);
    })();
  }, []);

  return (
    <StyledPaper elevation={3} className={classes.root}>
      {isLoading ? (
        <></>
      ) : requests.length === 0 ? (
        <p className="center">You haven't made any requests yet</p>
      ) : (
        <>
          <p className="paper-title">Your latest requests</p>
          {requests.map((request, i) => {
            return (
              <PanelRow key={i}>
                <p>{request.content.name}</p>
                {request.status === 'Pending' ? (
                  <LoaderCircle size="15" className="pending" />
                ) : request.status === 'Approved' ? (
                  <BadgeCheck size="15" className="completed" />
                ) : (
                  <CircleWithCross size="15" className="rejected" />
                )}
              </PanelRow>
            );
          })}
        </>
      )}
    </StyledPaper>
  );
};
