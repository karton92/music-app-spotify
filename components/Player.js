import React, { useState, useEffect, useCallback } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import { HeartIcon, VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { SwitchHorizontalIcon, RewindIcon, VolumeUpIcon, FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 400),
    []
  );

  return (
    <>
      <hr className="border-t-[0.1px] border-gray-900" />
      <div className="text-white h-24 bg-gradient-to-b from-black to-gray-800 grid grid-cols-3 text-sx md: text-base px-2 md:px-8">
        {/* Left */}
        <div className="flex items-center space-x-4">
          <img className="hidden md:inline h-10 w-10 rounded-lg" src={songInfo?.album.images?.[0]?.url} alt="Actual playing song cover" />
          <div>
            <h3 className="font-bold max-[375px]:text-sm">{songInfo?.name}</h3>
            <p className="text-gray-400 max-[375px]:text-sm">{songInfo?.artists?.[0].name}</p>
          </div>
        </div>
        {/* Center */}

        <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="button" />
          <RewindIcon className="button" onClick={() => spotifyApi.skipToPrevious()} />
          {isPlaying ? (
            <PauseIcon className="button w-10 h-10" onClick={() => handlePlayPause()} />
          ) : (
            <PlayIcon className="button w-10 h-10" onClick={() => handlePlayPause()} />
          )}
          <FastForwardIcon className="button" onClick={() => spotifyApi.skipToNext()} />
          <ReplyIcon className="button" />
        </div>

        {/* Right */}
        <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
          <VolumeDownIcon className="button m-3" onClick={() => volume > 0 && setVolume(volume - 10)} />
          <input className="w-14 md:w-28 range " type="range" value={volume} onChange={(e) => setVolume(Number(e.target.value))} min={0} max={100} />
          <VolumeUpIcon className="button m-3" onClick={() => volume < 100 && setVolume(volume + 10)} />
        </div>
      </div>
    </>
  );
};

export default Player;
