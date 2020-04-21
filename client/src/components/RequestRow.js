import React, { useState } from 'react';
import { BadgeCheck } from 'styled-icons/boxicons-solid';
import { CircleWithCross } from 'styled-icons/entypo';
import { TrashAlt, EditAlt } from '@styled-icons/boxicons-solid';

import { GameEditForm } from './GameEdit';
import { updateRequestStatus } from '../services/requestsService';
import { sortByStatus } from '../helpers/listsHelpers';
import { ConfirmationDelete } from './AlertMsg';

export const Request = ({ request, updateRequest, allRequests }) => {
  const [editForm, setEditForm] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showEditForm = () => setEditForm(true);
  const closeEditForm = () => setEditForm(false);

  const rejectRequest = async id => {
    const response = await updateRequestStatus(id, 'Rejected');
    const updatedRequests = allRequests.filter(request => request._id !== id);
    const newRequestsList = sortByStatus([...updatedRequests, response]);

    updateRequest(newRequestsList);
  };

  return (
    <>
      <p>{request.status}</p>
      <p>{request.content.name}</p>
      <p>{request.requestedBy.username}</p>

      <div>
        {request.status === 'Approved' ? (
          <BadgeCheck size="25" className="approved" />
        ) : request.status === 'Rejected' ? (
          <CircleWithCross size="25" className="rejected" />
        ) : (
          <>
            <EditAlt size="25" onClick={showEditForm} className="edit" />
            <GameEditForm
              open={editForm}
              closeEditForm={closeEditForm}
              game={request.content}
              request={true}
              requestID={request._id}
              isEditing={false}
              allRequests={allRequests}
              updateRequest={updateRequest}
            />
            <TrashAlt size="25" className="delete" onClick={handleOpen} />
            <ConfirmationDelete
              open={open}
              handleClose={handleClose}
              handleDelete={() => rejectRequest(request._id)}
            />
          </>
        )}
      </div>
    </>
  );
};
