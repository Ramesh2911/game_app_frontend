import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const SignUp = lazy(() => import('../../pages/Registration'));
const Login = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('../../pages/Login')), 500);
    });
});

const AuthRoutes = (props) => (
    <Routes>
        <Route path="/" element={<Login {...props} />} />
        <Route path="/register" element={<SignUp {...props} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

export default AuthRoutes;
