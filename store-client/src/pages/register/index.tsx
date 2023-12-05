import React, {useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Button,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import Layout from "../../layout";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../service/dataService";

interface MyFormValues {
  email: string;
  password: string;
}

const Register:React.FC = () => {
  const [show, setShow] = useState(false);
  const [ loading, setLoading ] = useState(false)

  let initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (doc: MyFormValues) => {
    try {
      setLoading(true)
      const request = await api.post('/api/user/register', doc)
      const response = request.data
      localStorage.setItem("x-bookstore", response.data.token);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch(error: any) {
      toast.error(error)
    } finally {
      setLoading(false)
    }
  };
  return (
    <Layout>
      <Box>
        <Container
          maxW="container.xl"
          h="70vh"
          display={"grid"}
          placeItems={"center"}
        >
          <Box w={{ base: "full", md: "350px", lg: "350px" }}>
            <Text fontFamily={"Forum"} color="#C39061" mb="40px" fontSize={40}>
              Sign Up
            </Text>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, handleChange, dirty }) => (
                <Form>
                  <Box display="flex" flexDir="column" gap="24px">
                    <FormControl isRequired>
                      <FormLabel fontSize={12} color="#C39061">
                        Email
                      </FormLabel>
                      <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={values.email}
                        focusBorderColor="#C39061"
                        border="0.5px solid #B0C7CE"
                        color="#B0C7CE"
                        _placeholder={{
                          color: "#B0C7CE",
                        }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontSize={12} color="#C39061">
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={show ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          value={values.password}
                          focusBorderColor="#C39061"
                          border="0.5px solid #B0C7CE"
                          color="#B0C7CE"
                          _placeholder={{
                            color: "#B0C7CE",
                          }}
                        />
                        <InputRightElement>
                          {show ? (
                            <IconButton
                              aria-label="password"
                              icon={<IoEyeOffOutline />}
                              color="#B0C7CE"
                              bg="transparent"
                              _hover={{ bg: "transparent" }}
                              onClick={() => setShow(!show)}
                            />
                          ) : (
                            <IconButton
                              aria-label="password"
                              icon={<IoEyeOutline />}
                              bg="transparent"
                              color="#B0C7CE"
                              _hover={{ bg: "transparent" }}
                              onClick={() => setShow(!show)}
                            />
                          )}
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <Button
                      borderRadius={"0"}
                      isDisabled={!dirty}
                      type="submit"
                      mt="24px"
                      bg="#C39061"
                      color="#342218"
                      isLoading={loading}
                      _hover={{ background: "#C39061" }}
                    >
                      Sign Up
                    </Button>

                    <Text mt="24px" color="#B0C7CE" textAlign={"center"}>
                      Already have an account?{" "}
                      <Link to="/login" style={{ color: "#C39061" }}>
                        Sign In
                      </Link>
                    </Text>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Register;
