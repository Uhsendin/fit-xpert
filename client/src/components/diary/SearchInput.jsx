import { Button, Flex, TextInput, createStyles } from '@mantine/core';
import React from 'react';
import { SearchIcon } from '../../assets/SearchIcon';
const useStyles = createStyles((theme) => ({
  textInput: {
    width: '100%',
  },
  searchBtn: {
    marginLeft: '1rem',
  },
}));
const SearchInput = () => {
  const { classes } = useStyles();
  return (
    <Flex>
      <TextInput
        data-autofocus
        rightSection={<SearchIcon />}
        variant="default"
        placeholder="Search for all foods and recipes...."
        className={classes.textInput}
      />
      <Button variant="subtle" className={classes.searchBtn}>
        SEARCH
      </Button>
    </Flex>
  );
};

export default SearchInput;
