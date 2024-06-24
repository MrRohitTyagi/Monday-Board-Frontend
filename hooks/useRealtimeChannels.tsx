"use client";
import Ably from "ably";

type useRealtimeChannelsProps = {};

const ablyClient = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_KEY || "");

const useRealtimeChannels = () => {
  const notificationChannel = ablyClient.channels.get("NOTIFICATION");

  return { notificationChannel };
};

export default useRealtimeChannels;
