import React, { Fragment } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

// here components means routes and ...rest means anything extra like exact, etc
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state)=> state.user);

  return (
    <Fragment>
        {!loading && (
            <Route 
                {...rest}
                render={(props)=>{
                    if(!isAuthenticated){
                        return (<Redirect to="/login/" />)
                    }       

                    return <Component {...props} />
                }}
             />
        )}
    </Fragment>
  )
}

export default ProtectedRoute