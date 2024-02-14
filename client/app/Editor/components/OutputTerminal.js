import { Box, Button, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

function OutputTerminal({ editorRef, language }) {
  const [output, setOutput] = useState(null);

  return (
    <Box w="50%" color="white" mt={7}>
      {/* <Text mb={2} fontSize={30} fontWeight="bold" color ="black">
        Output
      </Text> */}

      <Box
        mt={3}
        mr={-50}
        bg="lightgrey"
        height="100vh"
        p={2}
        color="black"
        // border="1px solid"
        // borderRadius={4}
        // borderColor="#333"
      >
        {output ? output : "Run code to see output here"}
      </Box>
    </Box>
  );
}

export default OutputTerminal;
