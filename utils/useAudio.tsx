"use client";
import React, { useEffect, useRef } from "react";

type useAudioProps = {};

const useAudio = () => {
  const notiFicationAudioRef = useRef<HTMLAudioElement>();
  useEffect(() => {
    notiFicationAudioRef.current = new Audio(
      "../assets/new-nitification-tone.mp3"
    );
  }, []);

  return { notiFicationAudio: notiFicationAudioRef.current };
};

export default useAudio;
