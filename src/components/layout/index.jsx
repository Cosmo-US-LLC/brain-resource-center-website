import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Layout() {
  const location = useLocation();
  const hideNavFooter = location.pathname === "/booking";
  return (
    <>
      {!hideNavFooter && <Header />}
      <Outlet />
      {!hideNavFooter && <Footer />}
    </>
  );
}

export default Layout;

