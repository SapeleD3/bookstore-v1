import { Box, Container, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box position={"absolute"} w="full" bg="#B1CCD7" bottom={0}>
      <Container
        maxW="container.xl"
        py={{ base: "10px", md: "10px", lg: "10px" }}
        display={"flex"}
        flexDir={{base:'column', md: 'row', lg: 'row'}}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text
          fontFamily={"Forum"}
          fontSize="20px"
          color="#C39061"
          textAlign={{ base: "center", md: "left", lg: "left" }}
        >
          Rarebooks
        </Text>

        <Text fontFamily={"Forum"} fontSize="14px" textAlign="center">
          Copyright © 2023 Rarebooks| All Rights Reserved
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
