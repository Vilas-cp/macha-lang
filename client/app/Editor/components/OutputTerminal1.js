import {
  Box,
  Button,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

function OutputTerminal1({ output, language, DarkMode }) {
  const isLargerThan1023 = useBreakpointValue({ base: false, lg: true });
  return (
    <Box w="100%" height={"50%"} color="white">
      <button
        className={`text-2xl font-bold ${!DarkMode?"text-black":"text-white"} ${!DarkMode?"bg-[#d3d3d3]":"bg-[#1c2130]"} p-3  -mb-6 ${!DarkMode?"border-t-gray-400":"border-t-black"} ${!DarkMode?"border-x-gray-400":"border-x-black"} border  ${DarkMode?"border-b-[#d3d3d3]":"border-b-"}`}
        fontWeight="bold"
        color="black"
      >
        Output
      </button>

      <Box
        
        height={"91%"}
        p={2}
        bg={!DarkMode?"lightgrey":"#1c2130"}
        color={!DarkMode?"black":"white"}
        overflowY={"auto"}
        overflowX={"auto"}
      >
        <pre>{output ? output : "Run code to see output here"}</pre>
      </Box>
    </Box>
  );
}

export default OutputTerminal1;
