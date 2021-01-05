import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Auth";
import Home from "../Home";
import Profile from "../Profile/Profile";
import RecipesApp from "../Recipes/RecipesApp";

const PrivateRoute = ({ redirect }) => {
  const { user } = useAuth()

  return (
    <>
      <Route
        render={routeProps =>
          user ?
            (routeProps.location.pathname === '/recipes' ? <RecipesApp /> :
              routeProps.location.pathname === '/todos' ? <Home /> :
                routeProps.location.pathname === '/profile' ? <Profile /> :
                  routeProps.location.pathname === '/login' || routeProps.location.pathname === '/' ? <Redirect to='/todos' /> :
                    routeProps.location.pathname === '/signup' ? <Redirect to='/todos' /> :
                      <Redirect to='/404' />)
            : (routeProps.location.pathname === '/recipes' ? <Redirect to={redirect} /> :
              routeProps.location.pathname === '/todos' ? <Redirect to={redirect} /> :
                routeProps.location.pathname === '/profile' ? <Redirect to={redirect} /> :
                  routeProps.location.pathname === '/login' || routeProps.location.pathname === '/' ? <Redirect to={redirect} /> :
                    routeProps.location.pathname === '/signup' ? <Redirect to='/signup' /> :
                      <Redirect to='/404' />)
        }
      />
    </>
  );
};


export default PrivateRoute