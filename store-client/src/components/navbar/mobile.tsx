import React from "react";
import {
  Drawer,
  DrawerBody,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface MobileProps {
  isOpen: boolean;
  onClose: () => void;
}

const Mobile: React.FC<MobileProps> = ({ isOpen, onClose }) => {
  const token = localStorage.getItem("x-bookstore");

  const routes = [
    {
      name: "home",
      to: "/",
    },
    {
      name: "books",
      to: "/books",
    },
    {
      name: "orders",
      to: "/orders",
    },
  ];

  const filteredRoutes = token
    ? routes
    : routes.filter(
        (route) => route.name !== "books" && route.name !== "orders"
      );

  const LogOut = () => {
    localStorage.removeItem("x-bookstore");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
          <Box display="flex" flexDir={"column"} gap="16px" mt="100px">
            {filteredRoutes.map((route, idx) => (
              <Link
                key={idx}
                to={route.to}
                style={{
                  fontSize: 20,
                  fontFamily: "Montserrat",
                  textTransform: "capitalize",
                }}
              >
                {route.name}
              </Link>
            ))}

            <Text
              color="red"
              onClick={LogOut}
              fontSize={20}
              fontFamily={"Montserrat"}
            >
              Log Out
            </Text>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Mobile;
