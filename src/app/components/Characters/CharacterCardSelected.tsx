import React from "react";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { Character } from "../../types";
import Image from "next/image";
import { useStore } from "../../store/useStore";

type CharacterSelectedProps = {
  number: number;
  character?: Character; // Personaje opcional
};

const CharacterCardSelected: React.FC<CharacterSelectedProps> = ({
  number,
  character, // Personaje opcional
}) => {
  const { firstCharacterSelected, secondCharacterSelected } = useStore();
  const selectedCharacter =
    number === 1 ? firstCharacterSelected : secondCharacterSelected;

  const isLarge = () => {
    if (selectedCharacter) {
      return selectedCharacter.name.length > 15 ? true : false;
    }
    return false;
  };

  return (
    <Card
      width={340}
      padding="2"
      height="250px"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
      }}
    >
      {selectedCharacter ? (
        <Flex gap="3" direction="column" align="center">
          <Heading size={isLarge() ? "md" : "lg"}>{selectedCharacter.name}</Heading>
          <Badge>{selectedCharacter.status}</Badge>
          <Badge>{selectedCharacter.species}</Badge>
          <Box
            width="120px"
            height="120px"
            border="2px solid grey"
            borderRadius="50%"
            overflow="hidden"
          >
            <Image
              src={selectedCharacter.image}
              alt={selectedCharacter.name}
              width={120}
              height={120}
            />
          </Box>
        </Flex>
      ) : (
        <Flex gap="3" direction="column" align="center">
          <Heading size='md'>
            Select a character
          </Heading>
          <Skeleton height="15px" width="100px" />
          <Skeleton height="15px" width="100px" />
          <SkeletonCircle size="32" />
        </Flex>
      )}
    </Card>
  );
};

export default CharacterCardSelected;
