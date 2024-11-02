import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Pete!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <VStack spacing={3} mb={10}>
      <Avatar size="xl" name="Pete" src='https://i.pravatar.cc/150?img=7' />
      <Heading size="xs">{greeting}</Heading>
    </VStack>
    <VStack spacing={8}>
      <Heading size="2xl">{bio1}</Heading>
      <Heading size="2xl">{bio2}</Heading>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;
