"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (

    <>
      <video
        ref={videoRef}
        controls={false}
        src="/bg.webm"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 right-0 h-screen w-full object-cover -z-20"
      />
      <div className="absolute bg-slate-100 dark:bg-slate-900 top-0 left-0 right-0 h-screen w-full object-cover -z-10 opacity-20" />
      <button
        className="w-10  absolute left-0 bottom-0 rounded-full p-2 b m-3 border-[1px] border-slate-600 dark:border-slate-300 opacity-50 z-10"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
    </>
  );
};

export default VideoPlayer;
