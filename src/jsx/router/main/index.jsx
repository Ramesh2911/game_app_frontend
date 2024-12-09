import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

/// Css
import '../../index.css';
import '../../chart.css';
import '../../step.css';

import { ThemeContext } from "../../../context/ThemeContext";

///Scroll To Top
import ScrollToTop from '../../layouts/ScrollToTop';

/// Layout
import Nav from '../../layouts/nav';
import Footer from '../../layouts/Footer';

/// All Routes
import AllRoutes from "./routes";

/// Error Pages
import Error400 from '../../pages/Error400';
import Error403 from '../../pages/Error403';
import Error404 from '../../pages/Error404';
import Error500 from '../../pages/Error500';
import Error503 from '../../pages/Error503';

const MainRoutes = (props) => {
  const routes = AllRoutes(props);

  const NotFound = () => {
    const url = routes.map((route) => route.url);
    let path = window.location.pathname;
    path = path.split('/');
    path = path[path.length - 1];

    if (url.indexOf(path) <= 0) {
      return <Error404 />;
    }
  };

  return (
    <>
      <Routes>
        <Route path='/page-error-400' element={<Error400 />} />
        <Route path='/page-error-403' element={<Error403 />} />
        <Route path='/page-error-404' element={<Error404 />} />
        <Route path='/page-error-500' element={<Error500 />} />
        <Route path='/page-error-503' element={<Error503 />} />
        <Route element={<MainLayout {...props} />} >
          {routes.map((data, i) => (
            <Route
              key={i}
              exact
              path={`${data.url}`}
              element={data.component}
            />
          ))}
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </>
  );
};

const MainLayout = (props) => {
  const { sidebariconHover } = useContext(ThemeContext);

  return (
    <>
      <div id="main-wrapper" className={`show  ${sidebariconHover ? "iconhover-toggle" : ""}`}>
        <Nav {...props} />
        <div className="content-body" >
          <div className="container-fluid" style={{ minHeight: window.screen.height - 45 }}>
            <Outlet />
          </div>
        </div>
        <Footer {...props} />
      </div>
    </>
  );
};

export default MainRoutes;