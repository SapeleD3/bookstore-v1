import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box display="flex" flexDir="column" bg="#0C3444" minH="100vh">
      <Navbar/>
      <Box>{children}</Box>
      <Footer/>
    </Box>
  );
};

export default Layout;
