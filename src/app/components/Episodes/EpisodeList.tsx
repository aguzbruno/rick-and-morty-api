import React, { memo } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
import useEpisodeList from "../../hooks/useEpisodeList";
import { Episode } from "@/app/types";
import { AddIcon } from "@chakra-ui/icons";
import Image from "next/image";
import RickOpenEyes from "../../assets/rickandmorty3.png";
import RickSharing from "../../assets/ricksharing.png";
import RickTV from "../../assets/episodesrick.png";
import EpisodeListItem from "./EpisodeListItem";

const EpisodeList: React.FC<{ episodesUrls: string[]; title: string }> = memo(
  function EpisodeListComponent({ episodesUrls, title }) {
    const {
      episodes,
      isFetching,
      containerRef,
      hasMoreEpisodes,
      handleLoadMoreEpisodes,
    } = useEpisodeList(episodesUrls);

    const [isShorterThan700] = useMediaQuery("(max-width: 700px)");

    return (
      <Box
        ref={containerRef}
        width={isShorterThan700 ? "100%" : "33%"}
        marginBottom={"12"}
        padding={"5"}
        overflow="hidden"
      >
        <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          width={"100%"}
        >
          <Box height={"150px"}>
            {title === 'SHARED EPISODES' ? (
            <Image
              src={RickSharing}
              width='150'
              height="150"
              alt="rick"
              />):(  <Image  src={RickTV}
              width='200'
              height='150'
              alt="rick"/>)}
            
          </Box>
          <Heading fontWeight={"800"} size={title.length > 25 ? "sm" : "md"}>
            {title} ({episodesUrls.length})
          </Heading>
          {episodesUrls.length > 0 ? (
            <Flex
              gap="3"
              overflow="auto"
              height="200px"
              width={"100%"}
              marginTop={"4"}
              position={"relative"}
              direction={'column'}
              justify={'flex-start'}
              align={'center'}
            >
              
                {episodes.map((episode: Episode, index: number) => (
                  <EpisodeListItem
                    title={title}
                    episode={episode}
                    key={`${title}+${episode.id}`}
                    index={index}
                  />))}
                
            </Flex>
          ) : (
            <Flex direction={"column"} align="center" gap="3">
              {title === "SHARED EPISODES" && (
                <Box>
                  <Image
                    src={RickOpenEyes}
                    width="150"
                    height="150"
                    alt="rick"
                  ></Image>
                </Box>
              )}
              <Heading size="sm" marginTop={"3"}>
                There are not shared episodes
              </Heading>
            </Flex>
          )}
        </Flex>

        {hasMoreEpisodes && (
          <Flex justify={'center'} align='center'>
          <Tooltip label="Load more episodes">
            <Button
              onClick={handleLoadMoreEpisodes}
              isLoading={isFetching}
              loadingText="Loading..."
              width="80%"
              marginTop="4"
            >
              <AddIcon />
            </Button>
          </Tooltip>
          </Flex>
        )}

        {isFetching && !hasMoreEpisodes && (
          <Flex justify={"center"} align="center">
            <Spinner />
          </Flex>
        )}
      </Box>
    );
  }
);
EpisodeList.displayName = "";
export default EpisodeList;
