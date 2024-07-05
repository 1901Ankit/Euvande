import React, { useEffect, useState } from "react";
import Navbar from "./header";
import Footer from "./footer";
import Subheader from "./subHeader";
import { useRouter } from "next/router";
import Header from "./header2";
import { Box, Divider } from "@mui/material";
import SubFooter from "./subFooter";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const pathName = router.pathname;

    if (pathName === "/login" || pathName === "/thankyou") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [router.pathname]);
  return (
    <div>
      {show ? <Subheader /> : <></>}
      {/* {show ? <Navbar /> : <></>} */}
      {show && <Header />}
      {children}
      <Box sx={{ backgroundColor: "#000" }}>
        <Footer />
        <Divider sx={{ backgroundColor: "#fff" }} />
        <SubFooter />
      </Box>
    </div>
  );
};

export default Layout;
