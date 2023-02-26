import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Playlist from "./Playlist";
import { isPlayingState } from "../atoms/songAtom";

const colors = ["from-indigo-500", "from-blue-500", "from-green-500", "from-red-500", "from-yellow-500", "from-pink-500", "from-purple-500"];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const activePlaylist = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [activePlaylist]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(activePlaylist)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) => console.log("Something go wrong", error));
  }, [spotifyApi, activePlaylist]);

  const logOut = () => {
    signOut();
    spotifyApi.pause();
    setIsPlaying(false);
  };

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8 hover:scale-105 transition transform duration-200 ease-out">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={() => logOut()}
        >
          <img className="rounded-full w-10 h-10" src={session?.user.image} alt="User avatar" />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        <img className="h-44 w-44 shadow-1xl rounded-lg" src={playlist?.images?.[0].url} alt="Playlist image" />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Playlist />
      </div>
    </div>
  );
};

export default Center;
