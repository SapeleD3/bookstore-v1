import React from "react";
import Layout from "../../layout";
import Hero from "./sections/hero";
import { Box } from "@chakra-ui/react";

const Home:React.FC = () => {
  return (
    <Layout>
      <Box pb="100px">
        <Hero />
      </Box>
    </Layout>
  );
};

export default Home;
