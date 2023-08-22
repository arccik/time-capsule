import React, { useState, useRef, useEffect, CSSProperties } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface AudioPlayerProps {
  url: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <div className="mx-auto mt-10">
        <div
          className="radial-progress  bg-transparent text-primary-content drop-shadow-2xl"
          style={
            {
              "--value": (currentTime / duration) * 100,
              "--size": "12rem",
              "--thickness": "2px",
            } as CSSProperties
          }
        >
          <div className="z-10">
            <audio ref={audioRef} src={url}></audio>
            <button onClick={togglePlay}>
              {isPlaying ? <FaPause size={32} /> : <FaPlay size={32} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
