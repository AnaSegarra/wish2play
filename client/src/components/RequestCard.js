// dependencies
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Edit } from '@styled-icons/typicons';
import { BadgeCheck } from 'styled-icons/boxicons-solid';
import { CircleWithCross } from 'styled-icons/entypo';

// local modules
import { GameForm } from '../components/GameForm';

// styled components
import { RequestContent, ImgPlaceholder } from '../styles/Admin.styled';

export const Request = ({ request, updatePending, updateApproved, pending, approved }) => {
  const [isEditing, setIsEditing] = useState(false);
  const showEditForm = () => setIsEditing(!isEditing);

  return (
    <Grid item lg={4}>
      <RequestContent>
        <p className="paper-title">
          Game requested: {request.content.name}
          {request.status === 'Pending' ? (
            <Edit size="25" onClick={showEditForm} />
          ) : request.status === 'Approved' ? (
            <BadgeCheck size="25" />
          ) : (
            <CircleWithCross />
          )}
        </p>
        {isEditing ? (
          <GameForm
            request={request}
            setIsEditing={setIsEditing}
            updatePending={updatePending}
            updateApproved={updateApproved}
            pending={pending}
            approved={approved}
          />
        ) : (
          <div className="paper-content">
            {request.content.image ? (
              <div className="img-container">
                <img height="200" width="auto" src={request.content.image} />
              </div>
            ) : (
              <ImgPlaceholder>
                <p>No image provided</p>
              </ImgPlaceholder>
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
              <span>Developed by:</span> {request.content.company}
            </p>
            <p>
              <span>ESRB rated as:</span> {request.content.ESRB}
            </p>
            <p>
              <span>Playable on: </span>
              {request.content.platforms.join(', ')}
            </p>
            <p>
              <span>Genres: </span>
              {request.content.genres.join(', ')}
            </p>
            <>
              <span>Available: </span>
              {request.content.linkToBuy ? (
                <a target="blank" href={request.content.linkToBuy}>
                  here
                </a>
              ) : (
                <p>No link provided</p>
              )}
            </>
            <p>Status: {request.status}</p>
          </div>
        )}
      </RequestContent>
    </Grid>
  );
};
