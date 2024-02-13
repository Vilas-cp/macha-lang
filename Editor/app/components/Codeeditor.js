'use client'
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import Langselector from "./Langselector";
import { CODE_SNIPPETS } from "./constants";
import OutputTerminal from "./OutputTerminal";

function Codeeditor() {
    const editorRef = useRef();

    const [value, setValue] = useState("");
    const [language, setLanguage] = useState('javascript');
    
    const onSelect = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setValue(CODE_SNIPPETS[selectedLanguage]);
    }

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    return (
        <HStack spacing={4}>
            <Box w='50%'>
                <Langselector language={language} onSelect={onSelect}/>
                <Editor
                    height="75vh"
                    theme="vs-dark"
                    defaultLanguage={language}
                    defaultValue={CODE_SNIPPETS[language]}
                    value={value}
                    onMount={onMount}
                    onChange={(value) => setValue(value)}
                />
            </Box>
            <OutputTerminal editorRef={editorRef} language={language}/>
        </HStack>
    );
}

export default Codeeditor;
