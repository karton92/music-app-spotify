import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, RssIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { sidebarVisibleState } from "../atoms/sidebarAtom";
import useSpotify from "../hooks/useSpotify";
import Image from "next/image";
import SpotifyLogo from "../images/spotify-for-developers-logo.svg";

import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { green, grey } from "@mui/material/colors";
import { alpha, styled } from "@mui/material/styles";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlist, setPlaylist] = useState([]);
  const [activePlaylist, setActivePlaylist] = useRecoilState(playlistIdState);
  const [sidebarVisible, setSidebarVisible] = useRecoilState(sidebarVisibleState);

  const [isDemoVerision, setIsDemoVersion] = useState();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => setPlaylist(data.body.items));
    }
  }, [session, spotifyApi]);

  // TU POPRAWIĆ NA:
  //     if (spotifyApi.getAccessToken() && isDemoVersion) {
  //     spotifyApi.getUserPlaylists().then((data) => setPlaylist(data.body.items));
  //   }
  // }, [session, spotifyApi]);

  console.log(spotifyApi);

  const DemoSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: green[600],
      "&:hover": {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },

    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: green[800],
    },
    "& .MuiSwitch-switchBase + .MuiSwitch-track": {
      backgroundColor: grey[400],
    },
  }));

  return (
    <div
      className={`text-gray-400 p-5 border-r-gray-900 h-screen text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] ${
        !sidebarVisible ? "hidden" : "visible"
      } hidden md:inline-flex pb-32`}
    >
      <div className="space-y-3 overflow-y-scroll scrollbar-hide">
        <Image className="fill-white" src={SpotifyLogo} />
        <div className="flex justify-center overflow-visible scrollbar-default">
          <Stack direction="row" spacing={1} alignItems="center">
            <p>Demo</p>
            <DemoSwitch defaultChecked />
            <p className="text-green-600 font-bold">Spotify API</p>
          </Stack>
        </div>

        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5 text-blue-500" />
          <p>Home</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5 text-white" />
          <p>Search</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5 text-[darkgoldenrod]" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5 text-yellow-400" />
          <p>Create Playlist</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5 text-red-400" />
          <p>Liked Songs</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-green-400" />
          <p>Your Episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* PLAYLIST */}

        {playlist.map((item) => (
          <p key={item.id} onClick={() => setActivePlaylist(item.id)} className="cursor-pointer hover:text-white ">
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
