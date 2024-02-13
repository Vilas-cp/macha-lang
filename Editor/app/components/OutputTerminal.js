import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { executecode } from "../api";

function OutputTerminal({ editorRef, language }) {
  const [output, setOutput] = useState(null);

  const runCode = async () => {
    const sourcecode = editorRef.current.getValue();
    if (!sourcecode) return;
    try {
      const { run: result } = await executecode(language, sourcecode);
      setOutput(result.output);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <Box w="50%" marginRight={30} color="white">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button variant="outline" colorScheme="green" mb={29} onClick={runCode}>
        Run code
      </Button>
      <Box
        mt={-7}
        bg="black"
        height="75vh"
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor="#333"
      >
        {output ? output : "Run code to see output here"}
      </Box>
    </Box>
  );
}

export default OutputTerminal;
