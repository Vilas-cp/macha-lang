import { Box, Button, Text, useBreakpointValue, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

function OutputTerminal({ output, language }) {
  const isLargerThan1023 = useBreakpointValue({ base: false, lg: true });
  return (
    
      <Box w="50%" color="white" mt={-3}  >
      <button  className="text-2xl font-bold text-black bg-[#d3d3d3] p-3 -mb-6 border-t-gray-400 border-x-gray-400 border border-b-[#d3d3d3]" fontSize={30} fontWeight="bold" color ="black" ml={3} pt={2} >
        Output
      </button>
      <Button
              variant="outline"
              bg="#f5f5f5"
              color="black"
              p={4}
              mt={3}
             fontSize={"x-large"}
             
             className="-mr-[44px]"
              float={"right"}
      
            >
         Clear
            </Button>

      <Box
        mt={4}
        mr={-50}
        bg="lightgrey"
        height="100vh"
        p={2}
        color="black"
        // border="1px solid"
        // borderRadius={4}
        // borderColor="#333"
      >
        <pre>{output ? output : "Run code to see output here"}</pre>
      </Box>
    </Box>

  );
  }

export default OutputTerminal;
