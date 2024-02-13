'use client'
import React from "react";
import { LANG_VERSIONS } from "./constants";
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

const languages = Object.entries(LANG_VERSIONS);
function Langselector({language, onselect}) {
  return (
    <Box >
     <Text mb={2} fontSize="lg">
        Languages : 
     </Text>
    <Menu>
      <MenuButton as={Button} >
    {language}
      </MenuButton>
      <MenuList  >
        {languages.map(([language , version]) => (
        <MenuItem key={language} onClick={() => onselect(language)}>
            {language}
             &nbsp;
             <Text as="span"  fontSize={"small"}>
                {version};
             </Text>
        </MenuItem>))}
        
      </MenuList>
    </Menu>
    </Box>
  );
}

export default Langselector;
