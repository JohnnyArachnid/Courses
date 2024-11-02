import { Heading, HStack, Image, Text, VStack, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <Box
      backgroundColor="white"
      textColor="black"
      rounded="2xl"
      p={4}>
      <VStack alignItems="flex-start" spacing={3}>
        <Image src={imageSrc} alt={title} rounded="3xl" borderRadius={10}/>
        <Heading paddingY={3} size="md">{title}</Heading>
        <Text>{description}</Text>
        <HStack alignItems="flex-start" spacing={3}>
          <Text fontWeight="bold">See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Card;
