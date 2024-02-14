import { Box, Button, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { executecode } from "../api";

function OutputTerminal({ editorRef, language }) {
  const [output, setOutput] = useState(null);
  const [isLoading,setisloading] = useState(false)
const toast = useToast();
  const runCode = async () => {
    const sourcecode = editorRef.current.getValue();
    if (!sourcecode) return;
    try {
      setisloading(true);
      const { run: result } = await executecode(language, sourcecode);
      setOutput(result.output);
    } catch (error) {
      // Handle error
      console.log(error)
      toast({
        title:'error occured',
        description:error.message || "Unable to run code ",
        status: 'error',
        duration: 6000,

      })
      console.error(error);
    }finally{
      setisloading(false);
    }
  };

  return (
    <Box w="50%" color="white" mt={7}>
      {/* <Text mb={2} fontSize={30} fontWeight="bold" color ="black">
        Output
      </Text> */}
      <Button variant="outline" bg="green.300" mb={29} onClick={runCode} isLoading = {isLoading}>
        Run code
      </Button>
      <Box
        mt={-7}
        mr={-50}
        bg="black"
        height="100vh"
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
