import {
  Box,
  Button,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

function OutputTerminal({ output, language ,DarkMode}) {
  const isLargerThan1023 = useBreakpointValue({ base: false, lg: true });
  return (
    <Box w="50%" height={"100%"} color="white">
      <button
        className={`text-2xl font-bold ${!DarkMode?"text-black":"text-white"} ${!DarkMode?"bg-[#d3d3d3]":"bg-[#1c2130]"} p-3  -mb-6 ${!DarkMode?"border-t-gray-400":"border-t-black"} ${!DarkMode?"border-x-gray-400":"border-x-black"} border  ${DarkMode?"border-b-[#d3d3d3]":"border-b-"}`}
        fontSize={30}
        fontWeight="bold"
        color="black"
      >
        Output
      </button>
      <Button
        variant="outline"
        bg="#f5f5f5"
        color="black"
        p={4}
        mt={3}
        fontSize={"x-large"}
        float={"right"}
      >
        Clear
      </Button>

      <Box
        mt={3}
        bg={!DarkMode?"lightgrey":"#1c2130"}
        height={"93%"}
        p={2}
        color={!DarkMode?"black":"white"}
        overflowY={"auto"}
        overflowX={"auto"}
      >
        <pre>{output ? output : "Run code to see output here"}</pre>
      </Box>
    </Box>
  );
}

export default OutputTerminal;
