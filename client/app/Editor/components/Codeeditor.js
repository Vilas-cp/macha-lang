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
import { useBreakpointValue } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { loader } from "@monaco-editor/react";
import { languages, editor } from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";
import Langselector from "./Langselector";
import { CODE_SNIPPETS } from "./constants";
import OutputTerminal from "./OutputTerminal";
import { executecode } from "../api";

loader.config({ monaco });
// Register a new language
function registerLang() {
  let some = 10;
  const somenew = 20;

  console.log(some + somenew);
  monaco.languages.register({ id: "MACHALang" });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider("MACHALang", {
    tokenizer: {
      root: [
        [/".*"/, "string-matching"],
        [/'.*'/, "string-matching"],
        [/`[^`]*`/g, "string-matching"],
        [/[0-9]/, "number-matching"],
        [/\/\/.*/, "comment-matching"],
        [/macha\.helu/, "keyword-declartion-3"],
        [/[\(\)\[\]\{\}]/, "keyword-declartion-1"],
        [/irlli/, "keyword-declartion-1"],
        [/idu/, "keyword-declartion-1"],
        [/kelsa/, "keyword-declartion-1"],
        [/sari/, "keyword-declartion-1"],
        [/tapu/, "keyword-declartion-1"],
        [/khali/, "keyword-declartion-1"],
        [/enuilla/, "keyword-declartion-1"],
        [/mundehogu"/, "keyword-declartion-2"],
        [/muri/, "keyword-declartion-2"],
        [/kodu/, "keyword-declartion-2"],
        [/enandre/, "keyword-declartion-2"],
        [/illandre/, "keyword-declartion-2"],
        [/illava/, "keyword-declartion-2"],
        [/allivaragu/, "keyword-declartion-2"],
        [/allitanka/, "keyword-declartion-2"],
      ],
    },
  });

  // Define a new theme that contains only rules that match this language
  monaco.editor.defineTheme("MACHALangTheme", {
    base: "vs",
    inherit: false,
    rules: [
      {
        token: "keyword-declartion-1",
        foreground: "0000cd",
        fontStyle: "bold",
      },
      { token: "keyword-declartion-2", foreground: "ff00ff" },
      { token: "keyword-declartion-3", foreground: "cc6600" },
      { token: "keyword-declartion-4", foreground: "004080" },
      { token: "number-matching", foreground: "33cc33" },
      { token: "string-matching", foreground: "ff5050" },
      { token: "comment-matching", foreground: "1f7a1f" },
    ],
    colors: {
      "editor.foreground": "#000000",
      // "editor.background": "#1c2130"
    },
    scrollbar: {},
  });

  // Register a completion item provider for the new language
  monaco.languages.registerCompletionItemProvider("MACHALang", {
    provideCompletionItems: (model, position) => {
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      var suggestions = [
        {
          label: "simpleText",
          kind: monaco.languages.CompletionItemKind.Text,
          insertText: "simpleText",
          range: range,
        },
        {
          label: "testing",
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: "testing(${1:condition})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range: range,
        },
        {
          label: "ifelse",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "if (${1:condition}) {",
            "\t$0",
            "} else {",
            "\t",
            "}",
          ].join("\n"),
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: "If-Else Statement",
          range: range,
        },
      ];
      return { suggestions: suggestions };
    },
  });
}
// console.log(languages);

registerLang();

function Codeeditor({ inCode, mlserverapi }) {
  const editorRef = useRef();

  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("MACHALang");
  const [def, setdef] = useState("machalang");

  const [output, setOutput] = useState(null);
  const [isLoading, setisloading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isLargerThan1024 = useBreakpointValue({ base: false, lg: true });

  const toast = useToast();

  const runCode = async () => {
    const sourcecode = editorRef.current.getValue();
    if (!sourcecode) return;
    try {
      setisloading(true);
      const result = await executecode(language, sourcecode, mlserverapi);
      setOutput(result.result);
    } catch (error) {
      // Handle error
      console.log(error);
      toast({
        title: "error occured",
        description: error.message || "Unable to run code ",
        status: "error",
        duration: 6000,
      });
      setOutput(error.message);
      // console.error(error);
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
  const DarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle between modes
  };

  useEffect(() => {
    if (inCode) {
      setValue(inCode);
    }
  }, [inCode]);

  return (
    <>
      {/* <div id="containerEditor" style={{ height: "100vh" }}></div> */}
      <div className=" flex top-0 w-full space-x-16  items-center text-center h-20 mt-[-55px] ml-[-30px]">
        <img src="macha.jpg" height={80} width={80} />

        <Text mb={2} fontSize="40px" marginTop={10} fontWeight="bold">
          ಮಚ್ಚ Lang compiler
        </Text>
      </div>
      {isLargerThan1024 ? (
        <HStack spacing={0}>
          <Box w="50%" mt={4} ml={-30}>
            <div className="block">
              <Langselector language={"MACHALang"} onSelect={onSelect} />
              <Button
                variant="outline"
                bg="green.300"
                mb={29}
                float={"right"}
                mr={4}
                onClick={runCode}
                isLoading={isLoading}
              >
                Run code
              </Button>
              <Button
                variant="outline"
                bg="#f5f5f5"
                color="rgba(37, 38, 94, 0.7)"
                mb={29}
                float={"right"}
                mr={6}
              >
                Save
              </Button>
              <Button
                variant="outline"
                bg="#f5f5f5"
                color="rgba(37, 38, 94, 0.7)"
                mr={6}
                mb={29}
                float={"right"}
                onClick={DarkMode}
              >
                {isDarkMode ? "Light" : "Dark"}
              </Button>
            </div>
            <Editor
              height="100vh"
              theme="MACHALangTheme"
              defaultLanguage={"MACHALang"}
              defaultValue={CODE_SNIPPETS[def]}
              value={value}
              className="-mt-5"
              line={0}
              options={{ minimap: { enabled: false } }}
              onMount={onMount}
              onChange={(value) => setValue(value)}
            />
          </Box>
          <OutputTerminal output={output} language={def} />
        </HStack>
      ) : (
        <div>
          <HStack
            spacing={0}
            css={{
              flexDirection: "column",
            }}
          >
            <Box w="100%" mt={4} ml={-30}>
              <div className="block">
                <Langselector language={"MACHALang"} onSelect={onSelect} />
                <Button
                  variant="outline"
                  bg="green.300"
                  mb={29}
                  float={"right"}
                  mr={4}
                  onClick={runCode}
                  isLoading={isLoading}
                >
                  Run code
                </Button>
                <Button
                  variant="outline"
                  bg="#f5f5f5"
                  color="rgba(37, 38, 94, 0.7)"
                  mb={29}
                  float={"right"}
                  mr={6}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  bg="#f5f5f5"
                  color="rgba(37, 38, 94, 0.7)"
                  mr={6}
                  mb={29}
                  float={"right"}
                  onClick={DarkMode}
                >
                  {isDarkMode ? "Light" : "Dark"}
                </Button>
              </div>
              <Editor
                theme="MACHALangTheme"
                defaultLanguage={"MACHALang"}
                defaultValue={CODE_SNIPPETS[def]}
                value={value}
                className="-mt-5 min-h-96"
                line={0}
                options={{ minimap: { enabled: false } }}
                onMount={onMount}
                onChange={(value) => setValue(value)}
              />
            </Box>
            <OutputTerminal output={output} language={def} />
          </HStack>
          :
        </div>
      )}
    </>
  );
}
export default Codeeditor;
