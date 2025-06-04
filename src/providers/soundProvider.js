import React, { createContext, useContext, useRef, useState, useEffect, useCallback, useMemo } from "react";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const bgMusicRef = useRef(new Audio());
  const slurpSoundRef = useRef(new Audio(`${process.env.PUBLIC_URL}/sounds/slurp.mp3`));
  const clickSoundRef = useRef(new Audio(`${process.env.PUBLIC_URL}/sounds/click.mp3`));

  const backgroundTracks = useMemo(() => [
    "background1.mp3",
    "background2.mp3",
    "background3.mp3",
    "background4.mp3",
    "background5.mp3",
  ], []);

  const currentTrackRef = useRef("");
  const [isMuted, setIsMuted] = useState(true);
  const [isMusicPlaying, setisMusicPlaying] = useState(false);

  const playClick = () => {
    if (isMuted) return;
    clickSoundRef.current.currentTime = 0;
    clickSoundRef.current.volume = 0.2;
    clickSoundRef.current.play().catch((e) => {
      console.warn("Click sound blocked:", e);
    });
  };

  const playSlurp = () => {
    if (isMuted) return;
    slurpSoundRef.current.currentTime = 0;
    slurpSoundRef.current.play().catch((e) => {
      console.warn("Slurp sound autoplay blocked:", e);
    });
  };

  const playRandomTrack = useCallback(() => {
    let newTrack = currentTrackRef.current;

    while (newTrack === currentTrackRef.current && backgroundTracks.length > 1) {
      const randomIndex = Math.floor(Math.random() * backgroundTracks.length);
      newTrack = backgroundTracks[randomIndex];
    }

    currentTrackRef.current = newTrack;
    const trackPath = `${process.env.PUBLIC_URL}/sounds/${newTrack}`;

    bgMusicRef.current.src = trackPath;
    bgMusicRef.current.loop = false;
    bgMusicRef.current.volume = 0.1;

    bgMusicRef.current
      .play()
      .catch((e) => {
        console.warn("Background music autoplay blocked:", e);
      });
  }, [backgroundTracks]);

  const playBackground = useCallback(() => {
    let newTrack = currentTrackRef.current;
  
    while (newTrack === currentTrackRef.current && backgroundTracks.length > 1) {
      const randomIndex = Math.floor(Math.random() * backgroundTracks.length);
      newTrack = backgroundTracks[randomIndex];
    }
  
    currentTrackRef.current = newTrack;
    const trackPath = `${process.env.PUBLIC_URL}/sounds/${newTrack}`;
  
    bgMusicRef.current.src = trackPath;
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.1;
  
    bgMusicRef.current
      .play()
      .catch((e) => {
        console.warn("Background music autoplay blocked:", e);
      });
  }, [backgroundTracks]);

  const stopBackground = () => {
    bgMusicRef.current.pause();
    bgMusicRef.current.currentTime = 0;
    currentTrackRef.current = "";
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleIsMusicPlaying = () => {
    setisMusicPlaying((prev) => !prev);
  };

  useEffect(() => {
    const audio = bgMusicRef.current;
    const handleEnded = () => {
      playRandomTrack();
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playRandomTrack]);

  useEffect(() => {
    if (isMusicPlaying) {
      playBackground();
    } else {
      stopBackground();
    }
  }, [isMusicPlaying, playBackground]);

  return (
    <SoundContext.Provider value={{ playBackground, stopBackground, playSlurp, playClick, toggleMute, toggleIsMusicPlaying, isMuted, isMusicPlaying }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
