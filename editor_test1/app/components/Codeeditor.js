'use client'
import { Alert, AlertIcon, Box, HStack, Img, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import Langselector from "./Langselector";
import { CODE_SNIPPETS } from "./constants";
import OutputTerminal from "./OutputTerminal";

function Codeeditor() {
    const editorRef = useRef();

    const [value, setValue] = useState("");
    const [language, setLanguage] = useState('index.macha');
    const [def,setdef] = useState('machalang')
    
    const onSelect = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setValue(CODE_SNIPPETS[selectedLanguage]);
    }

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }
 
    return (
        <>
        <div className=" flex top-0 w-full space-x-16  items-center text-center h-20 mt-[-55px] ml-[-30px]">
        <img src="macha.jpg" height={80} width={80} />

        <Text mb={2}  fontSize="40px" fontWeight='bold'>
        Machalang compiler
          </Text>
        </div>
        <HStack >
            <Box w='50%' mt={7} ml={-30}>
                <Langselector language={language} onSelect={onSelect}/>
                <Editor
                    height="100vh"
                    theme="vs-dark"
                    defaultLanguage={language}
                    defaultValue={CODE_SNIPPETS[def]}
                    value={value}
                    onMount={onMount}
                    onChange={(value) => setValue(value)}
                />
            </Box>
            <OutputTerminal editorRef={editorRef} language={def}/>
        </HStack>
        </>
    );
}

export default Codeeditor;
