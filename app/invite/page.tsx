"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import LoginComponent from "../(auth-routes)/login/page";

type InviteProps = {};

const Invite = (props: InviteProps) => {
  const query = useSearchParams();
  const boardID = query?.get("board_id");
  const userEmail = query?.get("email");
  const boardName = query?.get("board_name");
  const invited_by = query?.get("invited_by");

  console.log(`%c query `, "color: yellow;border:1px solid lightgreen", {
    boardID,
    userEmail,
    boardName,
    invited_by,
  });

  return <LoginComponent />;
};

export default Invite;
