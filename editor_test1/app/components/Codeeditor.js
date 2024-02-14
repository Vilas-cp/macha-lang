"use client";
import {
  Alert,
  AlertIcon,
  Box,
  HStack,
  Img,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import Langselector from "./Langselector";
import { CODE_SNIPPETS } from "./constants";
import OutputTerminal from "./OutputTerminal";

function Codeeditor() {
  const editorRef = useRef();

  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("index.macha");
  const [def, setdef] = useState("machalang");

  const [output, setOutput] = useState(null);
  const [isLoading, setisloading] = useState(false);


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
      console.log(error);
      toast({
        title: "error occured",
        description: error.message || "Unable to run code ",
        status: "error",
        duration: 6000,
      });
      console.error(error);
    } finally {
      setisloading(false);
    }
  };

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage]);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <>
      <div className=" flex top-0 w-full space-x-16  items-center text-center h-20 mt-[-55px] ml-[-30px]">
        <img src="macha.jpg" height={80} width={80} />

        <Text mb={2} fontSize="40px" marginTop={10} fontWeight="bold">
          Machalang compiler
        </Text>
      </div>
      <HStack>
        <Box w="50%" mt={4} ml={-30}>
          <div className="block">
            <Langselector language={language} onSelect={onSelect} />
            <Button
              variant="outline"
              bg="green.300"
              mb={29}
              float={"right"}
              onClick={runCode}
              isLoading={isLoading}
            >
              Run code
            </Button>
          </div>
          <Editor
            height="100vh"
            theme="vs-light"
            defaultLanguage={language}
            defaultValue={CODE_SNIPPETS[def]}
            value={value}
            className="-mt-5"
            
            line={0}
            options={{ minimap: { enabled: false } }}
            onMount={onMount}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <OutputTerminal editorRef={editorRef} language={def} />
      </HStack>
    </>
  );
}
export default Codeeditor;
