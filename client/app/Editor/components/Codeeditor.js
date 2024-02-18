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
import CodeMirror from "@uiw/react-codemirror";
import { useCodeMirror } from "@uiw/react-codemirror";
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
import { useRouter } from "next/navigation";
import OutputTerminal1 from "./OutputTerminal1";

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
        [/[^]*`/g, "string-matching"],
        [/[0-9]/, "number-matching"],
        [/\/\/.*/, "comment-matching"],
        [/macha\.helu/, "keyword-declartion-3"],
        [/[\(\)\[\]\{\}]/, "keyword-declartion-1"],
        [/irlli/, "keyword-declartion-1"],
        [/idu/, "keyword-declartion-1"],
        [/kelsa/, "keyword-declartion-1"],
        [/sari/, "keyword-declartion-1"],
        [/tappu/, "keyword-declartion-1"],
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
          label: "enandre",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "enandre (${1:condition}) {",
            "\t$0",
            "} illandre {",
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
  const keywords = [
    "macha.helu",
    "irlli",
    "idu",
    "kelsa",
    "sari",
    "tappu",
    "khali",
    "enuilla",
    "mundehogu",
    "muri",
    "kodu",
    "enandre",
    "illandre",
    "illava",
    "allivaragu",
    "allitanka",
  ];
  monaco.languages.registerCompletionItemProvider("MACHALang", {
    provideCompletionItems: (model, position) => {
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };
      const suggestion = [
        ...keywords.map((k) => {
          return {
            label: k,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: k,
            range: range,
          };
        }),
      ];
      return { suggestions: suggestion };
    },
  });
}
function registerLang1() {
  let some = 10
  const somenew = 20;

  console.log(some + somenew);
  monaco.languages.register({ id: "MACHALang" });

  // Register a tokens provider for the language
  monaco.languages.setMonarchTokensProvider("MACHALang", {
    tokenizer: {
      root: [
        [/".*"/, "string-matching"],
        [/'.*'/, "string-matching"],
        [/[^]*`/g, "string-matching"],
        [/[0-9]/, "number-matching"],
        [/\/\/.*/, "comment-matching"],
        [/macha\.helu/, "keyword-declartion-3"],
        [/[\(\)\[\]\{\}]/, "keyword-declartion-1"],
        [/irlli/, "keyword-declartion-4"],
        [/idu/, "keyword-declartion-4"],
        [/kelsa/, "keyword-declartion-4"],
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
  monaco.editor.defineTheme("MACHALangThemeDark", {
    base: "vs",
    inherit: false,
    rules: [
      {
        token: "keyword-declartion-1",
        foreground: "0000cd",
        fontStyle: "bold",
      },
      { token: "keyword-declartion-2", foreground: "ac9d69" },
      { token: "keyword-declartion-1", foreground: "c06041" },
      { token: "keyword-declartion-3", foreground: "c4c878" },
      { token: "keyword-declartion-4", foreground: "dbe18a" },
      { token: "number-matching", foreground: "33cc33" },
      { token: "string-matching", foreground: "ff5050" },
      { token: "comment-matching", foreground: "1f7a1f" },
    ],
    colors: {
      "editor.foreground": "#FFFFFF",
      "editor.background": "#1c2130"
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
          label: "enandre",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            "enandre (${1:condition}) {",
            "\t$0",
            "} illandre {",
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
  const keywords = [
    "macha.helu",
    "irlli",
    "idu",
    "kelsa",
    "sari",
    "tapu",
    "khali",
    "enuilla",
    "mundehogu",
    "muri",
    "kodu",
    "enandre",
    "illandre",
    "illava",
    "allivaragu",
    "allitanka",
  ];
  monaco.languages.registerCompletionItemProvider("MACHALang", {
    provideCompletionItems: (model, position) => {
      var word = model.getWordUntilPosition(position);
      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestion = [
        ...keywords.map((k) => {
          return {
            label: k,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: k,
            range: range,
          };
        }),
      ];
      return { suggestions: suggestion };
    },
  });
}

// console.log(languages);
registerLang();
registerLang1();

function Codeeditor({ inCode, mlserverapi }) {
  const editorRef = useRef();

  const [language, setLanguage] = useState("MACHALang");
  const [def, setdef] = useState("machalang");
  const [value, setValue] = useState(CODE_SNIPPETS["machalang"]);

  const [output, setOutput] = useState(null);
  const [isLoading, setisloading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isLargerThan1024 = useBreakpointValue({ base: false, lg: true });

  const toast = useToast();

  const runCode = async () => {
    const sourcecode = value;
    if (!sourcecode) return;
    try {
      setisloading(true);
      const result = await executecode(language, sourcecode, mlserverapi);
      console.log(result);
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

  useEffect(() => {
    if (window !== undefined) {
      console.log("Hello");
      console.log(editor);
      console.log(editor.create);
    }
  }, []);
  const router = useRouter();

  return (
    <div className={`${isDarkMode?"bg-[#1f2023]":"bg-white"}`}>
      {/* <div id="containerEditor" style={{ height: "100vh" }}></div> */}
      <div className=" flex top-0 w-full space-x-8 items-center text-center h-[5vh] md:h-[10vh] ">
        <img src="/MachaLangPic.png" className="h-full mt-0" />

        <Text
          mb={2}
          // fontSize="40px"
          className="text-xl md:text-4xl"
          fontWeight="bold"
          marginLeft={0}
          color={!isDarkMode?"black":"white"}
          cursor={"pointer"}
          onClick={() => router.push("/")}
        >
          ಮಚ್ಚ Lang compiler
        </Text>
      </div>
      {isLargerThan1024 ? (
        <div className="h-[90vh] flex flex-row flex-shrink">
          <Box height={"100%"} className="md:w-[50%] w-full">
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
              <span className="!hidden md:!block">
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
                  {!isDarkMode ? "Light" : "Dark"}
                </Button>
              </span>
            </div>
            <Editor
              theme={!isDarkMode?"MACHALangTheme":"MACHALangThemeDark"}
              defaultLanguage={"MACHALang"}
              defaultValue={CODE_SNIPPETS[def]}
              value={value}
              height={"91%"}
              className="w-full"
              line={0}
              options={{ minimap: { enabled: false } }}
              onMount={onMount}
              onChange={(value) => setValue(value)}
            />
          </Box>
          <OutputTerminal output={output} language={def}  DarkMode={isDarkMode}/>
        </div>
      ) : (
        <div className="h-[95vh] flex flex-col flex-shrink">
          <div className="block w-full h-[5%]">
            <Langselector language={"MACHALang"} onSelect={onSelect} />
            
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
            <Button
                  variant="outline"
                  bg="#f5f5f5"
                  color="rgba(37, 38, 94, 0.7)"
                  
                  mb={29}
                  float={"right"}
                  onClick={DarkMode}
                >
                  {!isDarkMode ? "Light" : "Dark"}
                </Button>
          </div>
          <div className="w-full h-[45%]">
            <CodeMirror
            theme={isDarkMode ? "dark" : "light"}
              defaultValue={CODE_SNIPPETS[def]}
              value={value}
              className="!w-full !h-full"
              width="100%"
              height="100%"
              onChange={(value) => setValue(value)}
            />
          </div>

          <OutputTerminal1 output={output} language={def} DarkMode={isDarkMode}  />
        </div>
      )}
    </div>
  );
}
export default Codeeditor;
