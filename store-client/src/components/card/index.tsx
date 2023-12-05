import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

interface BookCardProps {
  image: string;
  title: string;
  author: string;
  points: number;
  key: number;
  addItemToCart: (value: {}) => void;
  tags: any[];
}

export const BookCard: React.FC<BookCardProps> = ({
  image,
  points,
  title,
  author,
  addItemToCart,
  tags,
}) => {
  return (
    <Box>
      <Box position={"relative"}>
        <Image
          src={image}
          alt="book_cover"
          w="full"
          borderRadius={"10px"}
          objectFit="contain"
          h="250px"
        />
        <Box
          position={"absolute"}
          bottom={1}
          right={1}
          w="30px"
          h="30px"
          borderRadius={"full"}
          bg="#fff"
          boxShadow={"xl"}
          fontSize={20}
          cursor={"pointer"}
          display={"grid"}
          placeItems="center"
          onClick={addItemToCart}
        >
          +
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Text
            fontFamily={"Forum"}
            fontSize="16px"
            color="#C39061"
            mt="10px"
            fontWeight={700}
            textTransform={"capitalize"}
          >
            {title}
          </Text>

          <Text
            color="#B0C7CE"
            fontFamily={"Montserrat"}
            fontSize="12px"
            mt="1px"
            fontWeight={400}
            textTransform={"capitalize"}
          >
            {author}
          </Text>
        </Box>

        <Text color="#B0C7CE" fontFamily={"Montserrat"}>
          {points}P
        </Text>
      </Box>

      <Text
        fontSize="10"
        color="#B0C7CE"
        fontFamily={"Montserrat"}
        textTransform={"capitalize"}
      >
        Tags:{" "}
        {tags.map((tag, idx) => (
          <span key={idx}>
            {tag} {idx < tags.length - 1 && ", "}
          </span>
        ))}{" "}
      </Text>
    </Box>
  );
};
