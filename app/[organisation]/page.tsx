"use client";
import React from "react";
import { startCase } from "lodash";
import { useAuth } from "@/zstore";

type pageProps = {};
const Organisation = (props: pageProps) => {
  const { username } = useAuth();
  return (
    <div>
      <h2>
        Welcome! {startCase(username)} <br /> Quickly access your recent boards,
        Inbox and workspaces
      </h2>
      <div className="divider"></div>
    </div>
  );
};

export default Organisation;
