import { Suspense } from 'react';
import "react-toastify/dist/ReactToastify.css";
import Index from "./jsx/router/main/index";
import { Route, Routes } from 'react-router-dom';
import Common from './helpers/common';
import useAuth from "./hooks/useAuth";
import "./assets/css/style.css";
import 'rsuite/dist/rsuite-no-reset.min.css';
import AuthRoutes from './jsx/router/auth/AuthRoutes';

function App(props) {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={
      <div id="preloader">
        <div className="sk-three-bounce">
          <div className="sk-child sk-bounce1"></div>
          <div className="sk-child sk-bounce2"></div>
          <div className="sk-child sk-bounce3"></div>
        </div>
      </div>
    }>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/*" element={<AuthRoutes {...props} />} />
          </>
        ) : (
          <Route path="/*" element={<Index />} />
        )}
      </Routes>
    </Suspense>
  );
}

export default Common(App);
