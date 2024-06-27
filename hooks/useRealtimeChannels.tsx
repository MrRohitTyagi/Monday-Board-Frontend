"use client";
import Ably from "ably";
import { useEffect } from "react";

type useRealtimeChannelsProps = {};

const ablyClient = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_KEY || "");

const useRealtimeChannels = () => {
  const notificationChannel = ablyClient.channels.get("NOTIFICATION");

  useEffect(() => {
    ablyClient.connection.on("connected", () => {
      console.log("Connected to Ably!");
    });
    ablyClient.connection.on("closed", () => {
      console.log("Ably CLOSED!");
    });
    return () => ablyClient.close();
  }, []);

  return { notificationChannel };
};

export default useRealtimeChannels;
