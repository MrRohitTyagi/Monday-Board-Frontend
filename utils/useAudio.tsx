"use client";
import React from "react";

type useAudioProps = {};

const useAudio = () => {
  const notiFicationAudio = new Audio("../assets/new-nitification-tone.mp3");

  return { notiFicationAudio };
};

export default useAudio;
