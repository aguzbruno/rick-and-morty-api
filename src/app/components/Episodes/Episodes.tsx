"use client";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { useStore } from "../../store/useStore";
import EpisodeList from "./EpisodeList";
import SharedEpisodes from "./SharedEpisodes";

const Episodes: React.FC = () => {
  const { firstCharacterSelected, secondCharacterSelected } = useStore();
  const [isShorterThan700] = useMediaQuery("(max-width: 700px)");
  return (
    <Flex
      direction={isShorterThan700 ? "column" : "row"}
      width={"100%"}
      gap="3"
    >
      {firstCharacterSelected?.episode && (
        <EpisodeList
          title={`${firstCharacterSelected.name.toUpperCase()}'S EPISODES`}
          episodesUrls={firstCharacterSelected?.episode}
        />
      )}
      {firstCharacterSelected?.episode && secondCharacterSelected && (
        <SharedEpisodes
          firstCharacterEpisodes={firstCharacterSelected?.episode}
          secondCharacterEpisodes={secondCharacterSelected?.episode}
        />
      )}
      {secondCharacterSelected?.episode && (
        <EpisodeList
          title={`${secondCharacterSelected.name.toUpperCase()}'S EPISODES`}
          episodesUrls={secondCharacterSelected?.episode}
        />
      )}
    </Flex>
  );
};
export default Episodes;
