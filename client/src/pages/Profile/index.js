import React from 'react';
import { withProtectedRoute } from '../../helpers/withProtectedRoute';

const Profile = () => <div>El perfil del usuario</div>;

export const ProtectedProfile = withProtectedRoute(Profile);
