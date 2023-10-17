"use client";
import React from "react";
import Image from "next/image";
import { Character } from "../../types";
import { Badge, Box, Card, Flex, Heading, background } from "@chakra-ui/react";
import { useStore } from "../../store/useStore";

type CharacterCardProps = {
  character: Character;
  sectionNumber: number;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  sectionNumber,
}) => {
  const { setCharacterSelected } = useStore();

  const handleClick = () => {
    setCharacterSelected(character, sectionNumber);
  };
  const isLargeName = () => {
    if (character) {
      return character.name.length > 15 ? true : false;
    }
    return false;
  };

  return (
    <Card
      width={140}
      cursor={"pointer"}
      padding="2"
      height="250px"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        transition: "0.3s ease", // Agregar una transición suave de 0.3 segundos
      }}
      onClick={() => {
        handleClick();
      }}
      _hover={{
        background:
          "linear-gradient(180deg, #73C312 0%, #86ba4678 59%, #548f0c 100%)",
        transform: "scale(1.2)",  
        zIndex: "99",
        color: "white",
      }}
    >
      <Flex gap="3" direction="column" align="center">
        <Heading size={isLargeName() ? "xs" : "sm"} height={'30px'} >{character.name}</Heading>
        <Badge>{character.status}</Badge>

        {/* Para cuando es mythlogical criature, que muestre solo mythological */}
        <Badge>{character.species.length > 15 ? character.species.slice(0,13) :character.species}</Badge>
        <Box
          border="2px solid grey"
          borderRadius="50%"
          overflow="hidden"
        >
          <Image
            src={character.image}
            alt={character.name}
            width={120}
            height={120}
          />
        </Box>
      </Flex>
    </Card>
  );
};

export default CharacterCard;
