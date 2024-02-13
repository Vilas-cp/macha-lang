'use client'
import { Box } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import Langselector from "./Langselector";
    //CODE EDITOR
function Codeeditor() {
    const editorref = useRef();

    const [value,setValue] = useState("");
    const [language,setLanguange] = useState('javascript');
    const onselect = (x)=>{
  
        setLanguange(x)
    }
    const onMount =(editor)=>{
        editorref.current = editor;
        editor.focus();
  
    }
  return (
 

    
    <Box>
    <Langselector language={language} onselect = {onselect}/>


    <Editor
        height="75vh"
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue="// some comment"
        value={value}
        onMount={onMount}
    onChange={(value) => setValue(value)}
      />
    
    </Box>

  );
}

export default Codeeditor;
