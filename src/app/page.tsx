"use client";
import { Box, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import Rick from "./assets/rickmorty.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import Mute from './assets/mute.png'
import Sound from './assets/audio.png'

const Home = () => {
  const [isShorterThan700] = useMediaQuery("(max-width: 700px)");
  const [volume, setVolume] = useState(0.5);
  
  useEffect(() => {
    const audioElement = document.getElementById('background-music') as HTMLAudioElement;
    audioElement.volume = volume;
    audioElement.play();
    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);
  useEffect(() => {
    const audioElement = document.getElementById('background-music') as HTMLAudioElement;
    audioElement.volume = volume;
  }, [volume]);
  
  const handleVolumeChange = (volumeNumber:number) => {
    const newVolume = volumeNumber
    setVolume(newVolume);
  };
  
  return (
    <Flex
      align={"flex-start"}
      justify={"space-around"}
      direction={"column"}
      // background='linear-gradient(180deg, rgba(225,235,244,0.2721682422969187) 0%, rgba(223,223,224,0.4934567577030813) 100%)'
    >
      <audio id="background-music">
        <source src="/introMusic.mp3" type="audio/mpeg" />
      </audio>
      <Flex
        direction={isShorterThan700 ? "column" : "row"}
        align="center"
        gap="5"
        justify={"space-between"}
        width="100%"
      >
        <Flex
          marginLeft={isShorterThan700 ? "0" : "24"}
          align="flex-start"
          justify={"flex-start"}
          direction={"column"}
        >
          <Box>
            <Heading color="gray.600" size="2xl">
              {" "}
              Rick &
            </Heading>
            <Heading color="gray.600" size="2xl">
              {" "}
              Morty Challenge
            </Heading>
          </Box>
          <Box borderLeft={"3px solid black"} paddingLeft={"3"} marginTop={"4"}>
            <Heading size="md">Find your favorites rick and morty </Heading>
            {isShorterThan700 ? (
              <Link href="/characters">
                <Heading size="md" color={"purple"}>
                  characters
                </Heading>
              </Link>

            ) : (
              <Heading size="md">characters</Heading>
            )}
             
          </Box>
          <Flex align="center" mb={4} mt={4}>
        {volume === 0 &&<Box cursor={'pointer'} onClick={()=>handleVolumeChange(0.5)}><Image src={Mute} height={'20'} width={'20'} alt='mute'></Image></Box>}
        {volume !== 0 && <Box cursor={'pointer'} onClick={()=>handleVolumeChange(0)}><Image src={Sound} alt='Sound'  height={'20'} width={'20'}></Image></Box>}
      </Flex>
        </Flex>
        {
          <Flex>
            <Image
              src={Rick}
              width={!isShorterThan700 ? "600" : "300"}
              height={!isShorterThan700 ? "600" : "300"}
              alt="rick"
            />
          </Flex>
        }
      </Flex>
    </Flex>
  );
};
export default Home;
