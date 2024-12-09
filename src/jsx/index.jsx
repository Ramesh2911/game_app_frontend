import React, { useContext } from "react";

/// React router dom
import { Routes, Route, Outlet } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";

/// Dashboard
import Home from "./components/Dashboard/Home";

//Apps
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";

// Svg Icon
import SvgIcon from "./pages/SvgIcon";

/// Pages
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";

import { ThemeContext } from "../context/ThemeContext";

const Markup = () => {
  const allroutes = [
    { url: "dashboard", component: <Home /> },

    //Apps
    { url: "app-profile", component: <AppProfile /> },

    // Svg Icon
    { url: "svg-icons", component: <SvgIcon /> },


  ];


  function NotFound() {
    const url = allroutes.map((route) => route.url);
    let path = window.location.pathname;
    path = path.split('/');
    path = path[path.length - 1];

    if (url.indexOf(path) <= 0) {
      return <Error404 />;
    }
  }

  return (
    <>
      <Routes>
        <Route path='/page-error-400' element={<Error400 />} />
        <Route path='/page-error-403' element={<Error403 />} />
        <Route path='/page-error-404' element={<Error404 />} />
        <Route path='/page-error-500' element={<Error500 />} />
        <Route path='/page-error-503' element={<Error503 />} />
        <Route element={<MainLayout />} >
          {allroutes.map((data, i) => (
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


function MainLayout() {
  const { menuToggle, sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${menuToggle ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height - 45 }}>
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};



export default Markup;
