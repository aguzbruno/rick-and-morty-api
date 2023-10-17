import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Flex, Tooltip, useMediaQuery } from "@chakra-ui/react";
import CharacterCard from "./CharacterCard";
import { Character } from "@/app/types";
type Props = {
  allCharacters: Character[];
  handlePrevClick: () => void;
  displayedCharacters: Character[];
  sectionNumber: number;
  handleNextClick: () => void;
  hasNextCharacter: boolean;
  hasPrevCharacter:  boolean;
};
const CharacterCardContainer: React.FC<Props> = ({
  allCharacters,
  handlePrevClick,
  displayedCharacters,
  sectionNumber,
  handleNextClick,
  hasNextCharacter,
  hasPrevCharacter,
}) => {
  const [isShorterThan700] = useMediaQuery("(max-width: 700px)");
  return (
    <Flex
      gap="3"
      direction={isShorterThan700 ? "column" : "row"}
      align={"center"}
    >
      {hasPrevCharacter && (
        <Tooltip label="Previous">
          <Button onClick={handlePrevClick}>
            <ArrowLeftIcon />
          </Button>
        </Tooltip>
      )}

      {displayedCharacters?.length > 0
        ? displayedCharacters?.map((character: Character) => {
            return (
              <CharacterCard
                key={`sectionTitle${character.id}`}
                character={character}
                sectionNumber={sectionNumber}
              />
            );
          })
        : "There is no results"}
      {hasNextCharacter && (
        <Tooltip label="Next">
          <Button onClick={handleNextClick}>
            <ArrowRightIcon />
          </Button>
        </Tooltip>
      )}
    </Flex>
  );
};
export default CharacterCardContainer;
