'use client'
import React from "react";
import { LANG_VERSIONS } from "./constants";
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

const languages = Object.entries(LANG_VERSIONS);
function Langselector({language, onSelect}) {
  return (
    <>
 
    <Box >
    <Menu >
      <MenuButton as={Button} >
    {language}
      </MenuButton>
      <MenuList  >
        {languages.map(([language , version]) => (
          <MenuItem key={language} onClick={() => onSelect(language)}>
            {language}
             &nbsp;
             <Text  fontSize="small">
                {version};
             </Text>
        </MenuItem>))}
        
      </MenuList>
    </Menu>
    </Box>
          </>
  );
}

export default Langselector;
