import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useFaceRecognition } from '../Context';

function PrivateRoute() {
    const { faceRecognized } = useFaceRecognition();
    return (
        <>
            {faceRecognized ? <Outlet /> : <Navigate to="/FaceRec" />};
        </>

    )
}

export default PrivateRoute;
