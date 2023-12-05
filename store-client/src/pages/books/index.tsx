import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import {
  Box,
  Text,
  Container,
  InputGroup,
  Input,
  Grid,
  Spinner,
} from "@chakra-ui/react";
import Filter from "./components/filter";
import { BookCard } from "../../components/card";
import toast from "react-hot-toast";
import api from "../../service/dataService";
import { BooksPropsArray } from "../../utils/enums";

interface BookCartProps extends BooksPropsArray {
  quantity: number;
}

const Books: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [books, setBooks] = useState<BooksPropsArray[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let searchQuery = ``;
        if (search !== "") searchQuery = `&search=${search}`;
        let tags = ``;
        if (selectedTag.length >= 1) {
          const encodedTags = encodeURIComponent(JSON.stringify(selectedTag));
          tags = `&tag=${encodedTags}`;
        }
        const request: any = await api.get(
          `/api/book?page=${page}&limit=10${searchQuery}${tags}`
        );
        const res = request.data;
        const response = res.data;
        if (selectedTag.length >=1 ) {
          setBooks(response.books)
        } else {
          setBooks((prev) => [...prev, ...response.books]);

        }
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, search, selectedTag]);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
    if (scrollPercentage >= 80) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleTag = (value: string) => {
    setSelectedTag((prev) => [...prev, value]);
  };

  const clearTagFilter = () => {
    setSelectedTag([]);
  };

  const addItemToCart = (doc: BooksPropsArray) => {
    const storedData = localStorage.getItem("bookCart");
    const cartItems: BookCartProps[] = storedData ? JSON.parse(storedData) : [];
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === doc.id
    );

    if (existingProductIndex !== -1) {
      cartItems[existingProductIndex].quantity += 1;
      toast.success("Updated!!!");
    } else {
      const newItem: BookCartProps = { ...doc, quantity: 1 };
      toast.success("New Item Added!!!");
      cartItems.push(newItem);
    }

    localStorage.setItem("bookCart", JSON.stringify(cartItems));
    return cartItems;
  };
  return (
    <Layout>
      <Container maxW="container.xl" py="50px">
        <Box
          display="flex"
          justifyContent={"space-between"}
          flexDir={{ base: "column", md: "row", lg: "row" }}
          alignItems={{ base: "none", md: "center", lg: "center" }}
          gap="16px"
          w="full"
        >
          <Text fontSize="25px" fontFamily={"Forum"} color="#C39061">
            All Books
          </Text>
          <InputGroup w="auto">
            <Input
              type="text"
              w={{ base: "full", md: "300px", lg: "300px" }}
              onChange={(e) => setSearch(e.target.value)}
              focusBorderColor="#C39061"
              border="0.5px solid #B0C7CE"
              color="#B0C7CE"
              placeholder="Search by book title or Author..."
              _placeholder={{
                color: "#B0C7CE",
                fontSize: 14,
              }}
            />
          </InputGroup>
        </Box>

        <Box
          mt="32px"
          display="flex"
          flexDir={{ base: "column", md: "row", lg: "row" }}
          gap="30px"
        >
          <Box w={{ base: "auto", md: "300px", lg: "300px" }}>
            <Filter
              selectedTag={selectedTag}
              handleTag={handleTag}
              clearTagFilter={clearTagFilter}
            />
          </Box>

          {loading ? (
            <Box
              display={"grid"}
              placeItems={"center"}
              w={{ base: "auto", md: "full", lg: "full" }}
            >
              <Spinner size={"xl"} color="#C39061" />
            </Box>
          ) : (
            <Box>
              {books?.length <= 0 ? (
                <Box h="60vh" display={"grid"} placeItems={"center"}>
                  <Text
                    textAlign={"center"}
                    mb="20px"
                    color="#B0C7CE"
                    fontSize={20}
                    fontFamily={"Forum"}
                  >
                    No  Book Yet!!
                  </Text>
                </Box>
              ) : (
                <Box w={{ base: "auto", md: "full", lg: "full" }} pb="100px">
                  <Grid
                    templateColumns={{
                      base: "repeat(2,1fr)",
                      md: "repeat(4, 1fr)",
                      lg: "repeat(4, 1fr)",
                    }}
                    gap="24px"
                  >
                    {books.map((data, idx) => (
                      <BookCard
                        key={idx}
                        addItemToCart={() => addItemToCart(data)}
                        title={data.title}
                        author={data.writer}
                        image={data.image}
                        points={data.price}
                        tags={data.tag}
                      />
                    ))}
                  </Grid>
                  <Box>{loading && "Loading..."}</Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default Books;
