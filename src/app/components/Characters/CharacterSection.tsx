"use client";
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { Character } from "../../types";
import SearchBar from "./SearchBar";
import CharacterCardSelected from "./CharacterCardSelected";
import useLoadCharacters from "@/app/hooks/useLoadCharacters ";
import CharacterCardContainer from "./CharacterCardContainer";

const CharacterSection: React.FC<{
  characters: Character[];
  sectionTitle: string;
  sectionNumber: number;
}> = ({ characters, sectionTitle, sectionNumber }) => {
  const {
    allCharacters,
    characters: displayedCharacters,
    isLoading,
    loadMoreCharacters,
    loadPrevCharacters,
    searchCharacter,
    hasNextCharacter,
    hasPrevCharacter
  } = useLoadCharacters(characters);

  const handleNextClick = () => {
    loadMoreCharacters();
  };

  const handlePrevClick = () => {
    loadPrevCharacters();
  };
  const handleSearch = (textToSearch: string) => {
    searchCharacter(textToSearch);
  };

  return (
    <Flex
      gap="3"
      width={"100%"}
      wrap={"wrap"}
      justify={"center"}
      padding="3"
      direction={"column"}
      align="center"
    >
      <Flex direction={"column"} justify={"center"} align={"center"} gap="2">
        <Heading size="lg">{sectionTitle}</Heading>
        <CharacterCardSelected number={sectionNumber} />
      </Flex>
      <SearchBar handleSearch={handleSearch} />
      <CharacterCardContainer
        allCharacters={allCharacters}
        handlePrevClick={handlePrevClick}
        displayedCharacters={displayedCharacters}
        sectionNumber={sectionNumber}
        handleNextClick={handleNextClick}
        hasNextCharacter={hasNextCharacter}
        hasPrevCharacter={hasPrevCharacter}
      />
      {isLoading && (
        <Flex justify={"center"} align="center">
          <Spinner />
        </Flex>
      )}
    </Flex>
  );
};
export default CharacterSection;
