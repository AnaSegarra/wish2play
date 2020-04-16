import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Edit } from '@styled-icons/typicons';
import { RequestContent } from '../styledComponents/Admin.styled';
import { Button, Input } from '../styledComponents/Form';

export const Request = ({ request }) => {
  const [isEditing, setIsEditing] = useState(false);
  const showEditForm = () => setIsEditing(!isEditing);

  return (
    <Grid item lg={4}>
      <RequestContent>
        <p className="paper-title">
          Game requested: {request.content.name} <Edit size="25" onClick={showEditForm} />
        </p>
        {isEditing ? (
          <DataEdit request={request} setIsEditing={setIsEditing} />
        ) : (
          <div className="paper-content">
            {request.content.image ? (
              <img height="200" width="auto" src={request.content.image} />
            ) : (
              <div className="no-img">
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
          </div>
        )}
      </RequestContent>
    </Grid>
  );
};
