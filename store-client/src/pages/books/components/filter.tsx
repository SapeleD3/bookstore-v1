import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { tags } from "../../../utils/enums";
import { IoCheckmarkOutline } from "react-icons/io5";

interface FilterProps {
  selectedTag: string[];
  handleTag: (value: string) => void;
  clearTagFilter: () => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedTag,
  handleTag,
  clearTagFilter,
}) => {
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb="16px"
      >
        <Text
          color="#B0C7CE"
          fontSize="18px"
          fontWeight={500}
          fontFamily={"Montserrat"}
        >
          Tags
        </Text>

        {selectedTag.length >= 1 && (
          <Text
            fontSize={12}
            color="red"
            cursor={"pointer"}
            onClick={clearTagFilter}
          >
            Clear all
          </Text>
        )}
      </Box>

      <Box display={"flex"} flexDir="column" gap="16px">
        {tags.map((tag, idx) => (
          <Box
            key={idx}
            display={"flex"}
            gap="16px"
            alignItems={"center"}
            cursor={"pointer"}
            onClick={() => handleTag(tag.value)}
          >
            <Box
              border={
                selectedTag.includes(tag.value) ? "none" : "1px solid #B0C7CE"
              }
              bg={selectedTag.includes(tag.value) ? "#C39061" : "transparent"}
              w="20px"
              h="20px"
              borderRadius={"5px"}
              display={"grid"}
              placeItems={"center"}
            >
              {selectedTag.includes(tag.value) && <IoCheckmarkOutline />}
            </Box>
            <Text color="#B0C7CE" fontFamily={"Montserrat"} fontSize={14}>
              {tag.name}
            </Text>
          </Box>
        ))}
      </Box>

     
  
    </Box>
  );
};

export default Filter;
