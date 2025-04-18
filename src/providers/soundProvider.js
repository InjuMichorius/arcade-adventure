import React, { createContext, useContext, useRef, useEffect } from "react";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const bgMusicRef = useRef(new Audio());
  const slurpSoundRef = useRef(new Audio(`${process.env.PUBLIC_URL}/sounds/slurp.mp3`));

  const backgroundTracks = [
    "background1.mp3",
    "background2.mp3",
    "background3.mp3",
    "background4.mp3",
    "background5.mp3",
  ];

  const currentTrackRef = useRef("");

  // Play a random track, but avoid repeating the same one
  const playRandomTrack = () => {
    let newTrack = currentTrackRef.current;

    while (newTrack === currentTrackRef.current && backgroundTracks.length > 1) {
      const randomIndex = Math.floor(Math.random() * backgroundTracks.length);
      newTrack = backgroundTracks[randomIndex];
    }

    currentTrackRef.current = newTrack;
    const trackPath = `${process.env.PUBLIC_URL}/sounds/${newTrack}`;

    bgMusicRef.current.src = trackPath;
    bgMusicRef.current.loop = false; // So we can shuffle on end
    bgMusicRef.current.volume = 0.2;

    bgMusicRef.current
      .play()
      .catch((e) => {
        console.warn("Background music autoplay blocked:", e);
      });
  };

  const playBackground = () => {
    playRandomTrack();
  };

  const stopBackground = () => {
    bgMusicRef.current.pause();
    bgMusicRef.current.currentTime = 0;
    currentTrackRef.current = ""; // Reset so next play is random again
  };

  const playSlurp = () => {
    slurpSoundRef.current.currentTime = 0;
    slurpSoundRef.current.play().catch((e) => {
      console.warn("Slurp sound autoplay blocked:", e);
    });
  };

  // Setup shuffle on song end
  useEffect(() => {
    const audio = bgMusicRef.current;
    const handleEnded = () => {
      playRandomTrack();
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <SoundContext.Provider value={{ playBackground, stopBackground, playSlurp }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
