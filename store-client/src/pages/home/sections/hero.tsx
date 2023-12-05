import React from "react";
import { Box, Container, Text, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const token = localStorage.getItem('x-bookstore')

  return (
    <Box h="70vh" display="grid" placeItems={"center"}>
      <Container maxW="container.xl">
        <Text
          textAlign={"center"}
          fontFamily={"Forum"}
          color="#C39061"
          fontSize={{ base: "60px", md: "100px", lg: "150px" }}
        >
          RareBooks
        </Text>
        <Text textAlign={"center"} color="#B0C7CE" fontFamily={'Montserrat'}>
          Unvieling literary rarity, one page at a time
        </Text>
        <Center>
          <Link to={!token ? "/login" : "/books"}>
            <Button
              borderRadius={"0"}
              mt="24px"
              bg="#C39061"
              color="#342218"
              _hover={{ background: "#C39061" }}
            >
              Explore Catalogue
            </Button>
          </Link>
        </Center>
      </Container>
    </Box>
  );
};

export default Hero;
