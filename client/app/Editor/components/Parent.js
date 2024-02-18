"use client";
import { Box } from "@chakra-ui/react";
import React from "react";
import Codeeditor from "./Codeeditor";

function Parent({ code, mlserverapi }) {
  return <Codeeditor mlserverapi={mlserverapi} inCode={code} />;
}

export default Parent;
