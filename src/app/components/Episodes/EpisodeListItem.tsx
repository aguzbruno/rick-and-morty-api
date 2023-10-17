import { Episode } from "@/app/types";
import { Box } from "@chakra-ui/react";

// Función para manejar los estilos del ListItem
const getListItemStyle = (title: string, index: number) => {
  if (title === "SHARED EPISODES") {
    return {
      bgColor: index % 2 === 0 ? "black" : "white",
      color: "#73C312",
    };
  } else {
    return {
      bgColor: index % 2 === 0 ? "#73C312" : "white",
      color: index % 2 === 0 ? "white" : "#73C312",
    };
  }
};
const EpisodeListItem: React.FC<{
  episode: Episode;
  title: string;
  index: number;
}> = ({ episode, title, index }) => {
  return (
    <Box
      width={"70%"}
      fontSize={
        episode.name.length + episode.air_date.length > 25 ? "xs" : "sm"
      }
      borderRadius={"1rem"}
      padding="2.5"
      {...getListItemStyle(title, index)}
    >
      EP #{episode.id} - {episode.name} - {episode.air_date}
    </Box>
  );
};
export default EpisodeListItem;
