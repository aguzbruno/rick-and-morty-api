"use client";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import CharacterSection from "./CharacterSection";
import { Character } from "@/app/types";

const CharacterSectionContainer: React.FC<{
  characters: Character[];
}> = ({ characters }) => {
  const [isShorterThan1200] = useMediaQuery("(max-width: 1200px)");
  return (
    <Flex
      direction={isShorterThan1200 ? "column" : "row"}
      gap="5"
      align={"flex-start"}
      width={"100%"}
    >
      <CharacterSection
        characters={characters}
        sectionNumber={1}
        sectionTitle="Character #1"
      />

      <CharacterSection
        characters={characters}
        sectionNumber={2}
        sectionTitle="Character #2"
      />
    </Flex>
  );
};
export default CharacterSectionContainer;
