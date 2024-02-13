import { Box, Button, Menu, MenuButton, MenuItem, MenuItemOption, MenuList, Text } from '@chakra-ui/react'
import React from 'react'

function Trial() {
  return (
<Box>
     <Text mt={16} mb={2} ml={16} fontSize="lg">
        Languages : 
     </Text>
     <Menu>
  <MenuButton as={Button}  bgColor="gray.300">
    Actions
  </MenuButton>
  <MenuList>
    <MenuItem   _hover={{bgColor:" #A9A9A9"}}>Download</MenuItem>
    <MenuItem _hover={{bgColor:" #A9A9A9"}}>Create a Copy</MenuItem>
    <MenuItem _hover={{bgColor:" #A9A9A9"}}>Mark as Draft</MenuItem>
    <MenuItem _hover={{bgColor:" #A9A9A9"}}>Delete</MenuItem>
    <MenuItem _hover={{bgColor:" #A9A9A9"}}>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
    </Box>
  )
}

export default Trial