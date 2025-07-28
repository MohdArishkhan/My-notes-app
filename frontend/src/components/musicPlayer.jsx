import React, { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] bg-blue-950 text-white p-4 rounded-full shadow-lg flex items-center gap-4 ring-1 ring-blue-400">
      <audio ref={audioRef} src="/illenium-lifeline.mp3" loop />

      {/* ▶️ Play / Pause Button */}
      <button
        onClick={togglePlay}
        className="text-white text-2xl hover:scale-110 transition-transform"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      {/* 👋 Hello text */}
      <span className="text-white font-medium">For my cuties Lex & Cad</span>

      {/* 🔊 Volume Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 h-1 accent-blue-400 cursor-pointer"
      />

      {/* 🎵 Status Text */}
      <span className="hidden sm:inline text-sm text-white font-medium">
        {isPlaying ? "Playing..." : "Paused"}
      </span>
    </div>
  );
};

export default MusicPlayer;
