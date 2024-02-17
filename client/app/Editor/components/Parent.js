"use client";
import { Box } from "@chakra-ui/react";
import React from "react";
import Codeeditor from "./Codeeditor";

function Parent({code, mlserverapi, API}) {
  return (
    <Box minH="100vh" bg="white" px={6} py={8}>
      <Codeeditor mlserverapi={mlserverapi} inCode={code} />
    </Box>
  );
}

export default Parent;
