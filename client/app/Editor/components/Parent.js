"use client";
import { Box } from "@chakra-ui/react";
import React from "react";
import Codeeditor from "./Codeeditor";

function Parent({code}) {
  return (
    <Box minH="100vh" bg="white" px={6} py={8}>
      <Codeeditor inCode={code} />
    </Box>
  );
}

export default Parent;
