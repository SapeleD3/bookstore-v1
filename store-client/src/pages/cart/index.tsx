import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import Layout from "../../layout";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import api from "../../service/dataService";
import toast from "react-hot-toast";

interface CartProps {
  title: string;
  image?: string;
  price: number;
  writer: string;
  id: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const storeData = localStorage.getItem("bookCart");
  const cart: CartProps[] = storeData ? JSON.parse(storeData) : [];
  const [cartItems, setCartItems] = useState(cart);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("x-bookstore");
  const [points, setPoints] = useState<number>(0);
  const [loading, setLoading ] = useState<boolean>(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const request: any = await api.get("/api/user");
          const response = request.data;
          setPoints(response.data.balance);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    const result = cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
    setTotal(result);
  }, [cartItems]);

  const removeItemFromCart = (doc: number) => {
    const existingProductIndex = cartItems.findIndex((item) => item.id === doc);

    if (existingProductIndex !== -1) {
      const updateCartItems = [...cartItems];
      updateCartItems.splice(existingProductIndex, 1);
      setCartItems(updateCartItems);
      localStorage.setItem("bookCart", JSON.stringify(updateCartItems));
    }
  };

  const increaseQuantity = (itemId: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("bookCart", JSON.stringify(updatedCartItems));
  };

  const decreaseQuantity = (itemId: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("bookCart", JSON.stringify(updatedCartItems));
  };

  const placeOrder = async () => {
    try {
      setLoading(true)
      const order = cartItems.map((data) => {
        return {
          ...data
        }
      })

      let data = {
        cartItems: order
      }
      const request: any = await api.post('/api/orders', data)
      const response =request.data
      toast.success(response.message)
      localStorage.removeItem('bookCart')
      setTimeout(() => {
        window.location.href='/orders'
      }, 1000)

    } catch (error: any ) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Box pb="100px">
        <Container maxW="container.xl" py="50px">
          {cartItems?.length <= 0 ? (
            <Box h="60vh" display={"grid"} placeItems={"center"}>
              <Box>
                <Text
                  textAlign={"center"}
                  mb="20px"
                  color="#B0C7CE"
                  fontSize={20}
                  fontFamily={"Forum"}
                >
                  No Item in cart!!
                </Text>

                <Link to="/books">
                  <Button
                    borderRadius={0}
                    bg="#C39061"
                    color="#342218"
                    _hover={{ background: "#C39061" }}
                  >
                    Explore Catalogue
                  </Button>
                </Link>
              </Box>
            </Box>
          ) : (
            <>
              <Text fontSize={50} fontFamily={"Forum"} color="#C39061">
                Cart
              </Text>

              <Box mt="32px" minW="100%" overflowX={"scroll"}>
                <Box display="flex" flexDir="column" gap="16px">
                  {cartItems.map((data, idx) => (
                    <Box display={"flex"} gap="24px" key={idx + data.id}>
                      <Image
                        src={data.image}
                        objectFit={"cover"}
                        h="200px"
                      />
                      <Box
                        display="flex"
                        justifyContent={"space-between"}
                        flexDir={{ base: "column", md: "row", lg: "row" }}
                        alignItems={{
                          base: "flex-start",
                          md: "center",
                          lg: "center",
                        }}
                        w="full"
                      >
                        <Box>
                          <Text
                            fontFamily={"Forum"}
                            fontSize={20}
                            color="#C39061"
                          >
                            {data.title}
                          </Text>
                          <Text
                            color="#B0C7CE"
                            fontFamily={"Montserrat"}
                            fontSize={14}
                          >
                            {data.writer}
                          </Text>
                        </Box>

                        <Box display="flex" gap="10px" alignItems={"center"}>
                          <IconButton
                            aria-label="decrease"
                            bg="#C39061"
                            icon={<LuMinus />}
                            onClick={() => decreaseQuantity(data.id)}
                            _hover={{
                              bg: "#C39061",
                            }}
                          />
                          <Text
                            color="#B0C7CE"
                            fontFamily={"Montserrat"}
                            fontSize={16}
                          >
                            {data.quantity}
                          </Text>
                          <IconButton
                            aria-label="increase"
                            onClick={() => increaseQuantity(data.id)}
                            icon={<GoPlus />}
                            bg="#C39061"
                            _hover={{
                              bg: "#C39061",
                            }}
                          />
                        </Box>

                        <Text
                          color="#B0C7CE"
                          fontFamily={"Montserrat"}
                          fontSize={16}
                        >
                          {data.price * data.quantity}P
                        </Text>

                        <IconButton
                          onClick={() => removeItemFromCart(data.id)}
                          color="#C39061"
                          aria-label="delete"
                          icon={<MdOutlineDelete size={30} />}
                          bg="transparent"
                          _hover={{ bg: "transparent" }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                flexDir={{ base: "column", md: "row", lg: "row" }}
                mt="32px"
                gap="24px"
                alignItems={{ base: "flex-start", md: "center", lg: "center" }}
              >
                <Box>
                  <Text color="#B0C7CE" fontFamily={"Montserrat"} fontSize={18}>
                    Total: {total}
                  </Text>
                </Box>

                <Button
                  borderRadius={"0"}
                  bg="#C39061"
                  color="#342218"
                  w={{base: 'full', md: 'auto', lg: 'auto'}}
                  _hover={{ background: "#C39061" }}
                  isDisabled={total > points}
                  onClick={placeOrder}
                  isLoading={loading}
                >
                 {loading ? 'Placing Order...' : 'Checkout'}
                </Button>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export default Cart;
