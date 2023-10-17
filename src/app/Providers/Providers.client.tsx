"use client";

import { ReactNode, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
