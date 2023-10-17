"use client";
import React from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import RickLogo from "../../assets/rickLogo.png";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isShorterThan700] = useMediaQuery("(max-width: 700px)");
  const pathname = usePathname();

  const isActive = (route: string) => {
    return pathname === route ? true : false;
  };

  return isShorterThan700 ? (
    <Flex justify={"center"} align={"center"}>
      <Link href="/">
        <Image
          src={RickLogo}
          priority={true}
          width="250"
          height="250"
          alt="logo"
        />
      </Link>
    </Flex>
  ) : (
    <Flex
      width={"100%"}
      justify={"space-around"}
      align="center"
      color="black"
      fontWeight={"800"}
    >
      <Link href="/">
        <Box
          padding="10"
          borderRadius={"3rem"}
          bgColor={isActive("/") ? "black" : "white"}
          color={isActive("/") ? "white" : "black"}
          _hover={{
            transform: "scale(1.1)",
            transition: "transform 0.3s ease"
          }}
        >
          Home
        </Box>
      </Link>
      <Link href="/characters">
        <Box
          padding="10"
          borderRadius={"3rem"}
          bgColor={isActive("/characters") ? "black" : "white"}
          color={isActive("/characters") ? "white" : "black"}
          _hover={{
            transform: "scale(1.1)",
            transition: "transform 0.3s ease"
          }}
        >
          Characters
        </Box>
      </Link>
      <Box
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.3s ease"
        }}
      >
        <Link href="/">
          <Image
            src={RickLogo}
            priority={true}
            width="250"
            height="250"
            alt="logo"
          />
        </Link>
      </Box>

      <Link href="/" target="_blank">
        <Box
          _hover={{
            transform: "scale(1.1)",
            transition: "transform 0.3s ease"
          }}
        >
          About the project
        </Box>
      </Link>
      <Link href="https://www.linkedin.com/in/aguzbruno/" target="_blank">
        <Box
          _hover={{
            transform: "scale(1.1)",
            transition: "transform 0.3s ease"
          }}
        >
          About me
        </Box>
      </Link>
    </Flex>
  );
};

export default Navbar;
