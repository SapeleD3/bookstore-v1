import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  Image,
  Button,
  Tag,
} from "@chakra-ui/react";
import api from "../../service/dataService";
import toast from "react-hot-toast";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const request: any = await api.get(`/api/orders`);
        const requestData = request.data;
        const response = requestData.data;
        setOrders(response);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrders = async (payload: string) => {
    try {
      const request: any = await api.put(`/api/orders?id=${payload}`);
      const requestData = request.data;
      const response = requestData;
      toast.success(response.message)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Box py="50px">
        <Container maxW="container.xl">
          <Text fontSize="25px" fontFamily={"Forum"} color="#C39061">
            Orders
          </Text>

          <Box mt="32px">
            {orders.length <= 0 ? (
              <Box h="60vh" display={"grid"} placeItems={"center"}>
                <Text
                  textAlign={"center"}
                  mb="20px"
                  color="#B0C7CE"
                  fontSize={20}
                  fontFamily={"Forum"}
                >
                  No Orders Yet!!
                </Text>
              </Box>
            ) : (
              <Box>
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  gap="16px"
                >
                  {orders.map((order: any) => (
                    <GridItem key={order.id}>
                      <Box
                        boxShadow={"xl"}
                        border="0.5px solid #C39061"
                        borderRadius={"10px"}
                      >
                        <Box
                          display={"flex"}
                          flexDir={"column"}
                          gap="16px"
                          borderBottom={"0.5px solid #C39061"}
                          py="10px"
                          px="10px"
                        >
                          {order?.details?.map((detail: any) => (
                            <Box key={detail.id} display="flex" gap="16px">
                              <Image
                                src={detail?.image}
                                h="100px"
                                objectFit={"contain"}
                              />
                              <Box>
                                <Text
                                  fontFamily={"Forum"}
                                  color="#C39061"
                                  fontSize={18}
                                >
                                  {detail?.title}
                                </Text>
                                <Text color="#B0C7CE" fontSize={16}>
                                  {detail?.writer}
                                </Text>
                                <Text color="#B0C7CE" fontSize={12}>
                                  {detail?.quantity} QTY
                                </Text>
                                <Text color="#B0C7CE" fontSize={12}>
                                  {detail?.price}P
                                </Text>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                        <Box
                          px="10px"
                          py="10px"
                          display="flex"
                          justifyContent={"space-between"}
                          w="full"
                          alignItems={"center"}
                        >
                          {order.status === "SUCCESS" ? (
                            <Tag colorScheme="cyan"> Success</Tag>
                          ) : (
                            <Tag colorScheme="red">Cancelled</Tag>
                          )}

                          <Box display="flex" gap="10px" alignItems={"center"}>
                            <Text color={"#B0C7CE"}>{order.totalPoint}P</Text>
                            <Button
                              fontSize={10}
                              bg="#C39061"
                              onClick={() => cancelOrders(order.id)}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Orders;
