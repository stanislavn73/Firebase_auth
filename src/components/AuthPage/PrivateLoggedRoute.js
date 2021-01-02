import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Auth";
import Home from "../Home";
import Profile from "../Profile/Profile";
import RecipesApp from "../Recipes/RecipesApp";
import TodosComponent from "../Todos/TodosComponent";

const PrivateRoute = ({ component: RouteComponent, redirect }) => {
  const { user } = useAuth()
  const [pageFounded, setPageFounded] = useState(false)
  const pages = [
    {
      pagePath: '/recipes',
      component: RecipesApp
    },
    {
      pagePath: '/profile',
      component: Profile
    },
    {
      pagePath: '/todos',
      component: TodosComponent
    },
  ]

  return (
    <>
      {/* {user && pages.map((page,index) => {
        debugger
        if (document.location.pathname === page.pagePath) {
          debugger
          setPageFounded(true)
          return <Route key={index} path={page.pagePath} component={page.component} />
        }
      })} */}
      {/* {!user && setPageFounded(true) && <Redirect to={redirect} />} */}
      {/* {user && !pageFounded && <Redirect to='/404' />} */}
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
                  routeProps.location.pathname === '/login' || routeProps.location.pathname === '/' ? <Redirect to='/login' /> :
                    routeProps.location.pathname === '/signup' ? <Redirect to='/signup' /> :
                      <Redirect to='/404' />)
        }
      />
    </>
  );
};


export default PrivateRoute