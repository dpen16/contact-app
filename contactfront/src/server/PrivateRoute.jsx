import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
export const USER_TOKEN = 'user-token';
export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const cookies = new Cookies();
        const token = cookies.get(USER_TOKEN);
        if (!token) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/'}} />
        }
       /** check if token is expired */
       const decodedJWT = JSON.parse(atob(token.split('.')[1]));
       console.log(decodedJWT);
       if(decodedJWT.exp * 1000 < Date.now()){
        /** token is expired so logout */
        console.log('token is expired');
        cookies.remove(USER_TOKEN,{path:'/'});
        return <Redirect to={{ pathname: '/'}} />
       }
        // check if route is restricted by role
        // if (roles && roles.indexOf(currentUser.role) === -1) {
        //     // role not authorised so redirect to home page
        //     return <Redirect to={{ pathname: '/login'}} />
        // }
        // authorised so return component
        return <Component {...props} />
    }} />
)