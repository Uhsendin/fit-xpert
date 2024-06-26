import { Button, Flex, TextInput, createStyles } from "@mantine/core";
import React, { useEffect } from "react";
import { SearchIcon } from "../../../assets/SearchIcon";
import { useDebouncedState } from "@mantine/hooks";
const useStyles = createStyles((theme) => ({
  textInput: {
    width: "100%",
  },
  searchBtn: {
    marginLeft: "1rem",
  },
}));

const SearchInput = () => {
  const { classes } = useStyles();
  const [searchValue, setSearchValue] = useDebouncedState("", 300);

  console.log(searchValue);
  return (
    <Flex>
      <TextInput
        data-autofocus
        rightSection={<SearchIcon />}
        variant="default"
        placeholder="Search for exercises"
        className={classes.textInput}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />
      <Button variant="subtle" className={classes.searchBtn}>
        SEARCH
      </Button>
    </Flex>
  );
};

export default SearchInput;
