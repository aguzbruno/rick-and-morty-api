import { Box, Flex } from "@chakra-ui/react";
import { Character } from "../types";
import CharacterSection from "../components/Characters/CharacterSection";
import Episodes from "../components/Episodes/Episodes";
import Navbar from "../components/Navbar/Navbar";

const getData = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();
  return data;
};
import { Work_Sans } from "next/font/google";
import Image from "next/image";
import CharacterSectionContainer from "../components/Characters/CharacterSectionContainer";

const workSans = Work_Sans({
  weight: "500",
  subsets: ["latin"],
});
const Characters = async () => {
  const data = await getData();
  const characters: Character[] = data.results;
  return (
    <Flex
      align={"flex-start"}
      justify={"space-around"}
      direction={"column"}
      className={workSans.className}
    >
      {characters ? (
        <>
          <CharacterSectionContainer characters={characters} />
          <Episodes />
        </>
      ) : (
        <Box>Ha habido un error en el servidor</Box>
      )}
    </Flex>
  );
};
export default Characters;
