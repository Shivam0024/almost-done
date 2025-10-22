import React from 'react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '../contexts/KeycloakProvider';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { authenticated } = useKeycloak();
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
