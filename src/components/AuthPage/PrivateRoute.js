
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Auth";

const PrivateRoute = ({ component: RouteComponent }) => {
  const { user } = useAuth()
  return (
    <>
      <Route
        render={routeProps =>
          user && routeProps.location.pathname !== '/login' ?
            <RouteComponent {...routeProps} />
            : <Redirect to="/login" />
        }
      />
    </>
  );
};


export default PrivateRoute