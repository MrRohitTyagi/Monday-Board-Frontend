import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

type layoutProps = { children: React.ReactNode };

const layout = ({ children }: layoutProps) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_AUTH_CLIENT_ID || ""}
    >
      {children}
    </GoogleOAuthProvider>
  );
};

export default layout;
