import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Auth";

const PrivateRoute = ({ component: RouteComponent, path, redirect }) => {

  const { user } = useAuth()
  return (
    <Route
      render={routeProps =>
        user ?
          (routeProps.location.pathname === path ? <RouteComponent {...routeProps} /> : <Redirect to={path} />)
          : (routeProps.location.pathname === path && <Redirect to={redirect} />
          )
      }
    />
  );
};


export default PrivateRoute