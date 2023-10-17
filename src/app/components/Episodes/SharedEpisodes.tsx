import React from "react";
import EpisodeList from "./EpisodeList";

const SharedEpisodes: React.FC<{
  firstCharacterEpisodes?: string[];
  secondCharacterEpisodes?: string[];
}> = ({ firstCharacterEpisodes, secondCharacterEpisodes }) => {
  const sharedEpisodesUrls = firstCharacterEpisodes?.filter((url: string) =>
    secondCharacterEpisodes?.includes(url)
  );
  return (
    sharedEpisodesUrls && (
      <EpisodeList
        episodesUrls={sharedEpisodesUrls}
        title="SHARED EPISODES"
      ></EpisodeList>
    )
  );
};

export default SharedEpisodes;
