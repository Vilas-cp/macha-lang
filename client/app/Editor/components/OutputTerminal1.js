import {
  Box,
  Button,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

function OutputTerminal1({ output, language }) {
  const isLargerThan1023 = useBreakpointValue({ base: false, lg: true });
  return (
    <Box w="100%" height={"50%"} color="white">
      <button
        className="text-xl ml-4 font-bold text-black bg-[#d3d3d3] p-1 border-t-gray-400 border-x-gray-400 border border-b-[#d3d3d3]"
        fontWeight="bold"
        color="black"
      >
        Output
      </button>

      <Box
        bg="lightgrey"
        height={"91%"}
        p={2}
        color="black"
        overflowY={"auto"}
        overflowX={"auto"}
      >
        <pre>{output ? output : "Run code to see output here"}</pre>
      </Box>
    </Box>
  );
}

export default OutputTerminal1;
