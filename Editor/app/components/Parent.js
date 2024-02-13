'use client'
import { Box } from "@chakra-ui/react";
import React from "react";
import Codeeditor from "./Codeeditor";

function Parent() {
  return (
    <Box minH="100vh"  px={6} py={8}>
=<Codeeditor/>
    </Box>
  );
}

export default Parent;
