import React, { useEffect, useState } from "react";
import { Flex, Input } from "@chakra-ui/react";
import useDebounce from "@/app/hooks/useDebounce";

const SearchBar: React.FC<{
  handleSearch: (text: string) => void;
}> = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500); // Debounce con un retraso de 500 milisegundos

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Llama a handleSearch con el texto debounced
  useEffect(() => {
    handleSearch(debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <Flex width={"100%"} justify={"center"} gap="3">
      <Input
        placeholder="Search character"
        onChange={handleInputChange}
        value={searchText}
        width={"350px"}
      />
    </Flex>
  );
};
export default SearchBar;
