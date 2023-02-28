import { ChevronDownIcon, ChevronUpIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Playlist from "./Playlist";
import { isPlayingState } from "../atoms/songAtom";

const colors = ["from-indigo-500", "from-blue-500", "from-green-500", "from-red-500", "from-yellow-500", "from-pink-500", "from-purple-500"];
const menuOptions = [
  {
    name: "Profil",
    icon: <LogoutIcon />,
  },
  {
    name: "Ustawienia",
    icon: <LogoutIcon />,
  },
  {
    name: "Pomoc",
    icon: <LogoutIcon />,
  },
  {
    name: "Wyloguj",
    icon: <LogoutIcon />,
  },
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const activePlaylist = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center relative bg-black space-x-3 hover:bg-gray-800 cursor-pointer rounded-full p-1 pr-2 transition transform ease-out"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <img className="rounded-full w-10 h-10" src={session?.user.image} alt="User avatar" />
          <h2>{session?.user.name}</h2>
          {!isMenuOpen ? <ChevronDownIcon className="h-5 w-5" /> : <ChevronUpIcon className="h-5 w-5" />}
          {isMenuOpen && (
            <div className="absolute w-auto h-auto bg-black text-white top-14 flex flex-col items-start rounded-lg ">
              {menuOptions.map((item) => (
                <div className="flex items-center justify-between text-md w-[190px] p-4 hover:bg-gray-800">
                  <h3 className="font-bold" key={item.name}>
                    {item.name}
                  </h3>
                  <div className="w-6 h-6 flex justify-end">{item.icon}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        <img
          className="h-44 w-44 shadow-1xl rounded-lg max-[375px]:h-[120px] max-[375px]:w-[120px]"
          src={playlist?.images?.[0].url}
          alt="Playlist image"
        />
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
