import React, { useEffect, useState } from "react";
import { Box, Container, Text, IconButton, Avatar } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import api from "../../service/dataService";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import Mobile from "./mobile";

interface CartProps {
  title: string;
  image?: string;
  points: number;
  author: string;
  id: number;
  quantity?: number;
}

const Navbar: React.FC = () => {
  const storeData = localStorage.getItem("bookCart");
  const cart: CartProps[] = storeData ? JSON.parse(storeData) : [];
  const token = localStorage.getItem("x-bookstore");
  const [user, setUser] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const navRoutes = [
    {
      name: "home",
      to: "/",
    },
    {
      name: "books",
      to: "/books",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const request: any = await api.get("/api/user");
          const response = request.data;
          setUser(response.data.id);
          setPoints(response.data.balance);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [token]);

  const filteredRoutes = token
    ? navRoutes
    : navRoutes.filter((route) => route.name !== "books");

  const LogOut = () => {
    localStorage.removeItem("x-bookstore");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };
  return (
    <Box py="10px" borderBottom={"0.5px solid #C39061"}>
      <Mobile isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontFamily={"Forum"} color="#C39061" fontSize="20px">
          RareBooks
        </Text>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            display={{ base: "none", md: "flex", lg: "flex" }}
            gap="50px"
            alignItems={"center"}
          >
            {filteredRoutes.map((data, idx) => (
              <NavLink
                key={idx * 2}
                to={data.to}
                className={({ isActive }) =>
                  isActive ? styles.nav_active : styles.nav
                }
              >
                {data.name}
              </NavLink>
            ))}
          </Box>

          {token && (
            <Link to="/cart">
              <Box
                position={"relative"}
                ml="50px"
                display={{ base: "none", md: "block", lg: "block" }}
              >
                {cart.length > 0 && (
                  <Box
                    position={"absolute"}
                    top="0"
                    bg="#fff"
                    boxShadow={"sm"}
                    w="15px"
                    h="15px"
                    right="0"
                    borderRadius={"full"}
                    display={"grid"}
                    placeItems={"center"}
                    zIndex={1}
                    color="#342218"
                    fontSize={10}
                    fontWeight={700}
                  >
                    {cart.length}
                  </Box>
                )}

                <IconButton
                  icon={<RiShoppingBasket2Line color="#C39061" size={20} />}
                  aria-label="search"
                  bg="transparent"
                  _hover={{ background: "transparent" }}
                />
              </Box>
            </Link>
          )}

          {token && user && (
            <Box
              ml="32px"
              display={{ base: "none", md: "flex", lg: "flex" }}
              alignItems={"center"}
              gap="5px"
            >
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FiChevronDown color="#fff" />}
                  bg="transparent"
                  _hover={{
                    bg: "transparent",
                  }}
                  _active={{
                    bg: "transparent",
                  }}
                >
                  <Avatar src={`https://robohash.org/${user}`} size="sm" />
                </MenuButton>
                <MenuList>
                  <Link to="/orders">
                    <MenuItem>Orders</MenuItem>
                  </Link>
                  <MenuItem onClick={LogOut} color="red">
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>

              <Text color="#B0C7CE" fontFamily={"Montserrat"}>
                {points}P
              </Text>
            </Box>
          )}

          <IconButton
            aria-label="menu"
            display={{ base: "flex", md: "none", lg: "none" }}
            icon={<HiMenuAlt3 size={20} />}
            onClick={() => setIsOpen(!isOpen)}
            color="#fff"
            bg="transparent"
            _hover={{
              bg: "transparent",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
