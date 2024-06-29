"use client";
import { useSearchParams } from "next/navigation";
import React, { memo, useEffect } from "react";
import { isEmpty, startCase } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/zstore";
import { setToken } from "@/utils/cookie";
import Loader from "@/components/core/Loader";
import { uploadImage } from "@/utils/imageupload";
import { getSchema, getfields } from "../(auth-routes)/login/utils";
import { acceptInvitation, getInvitation } from "@/gateways/invitation-gateway";
import { AlertTriangle } from "lucide-react";
import { InvitationConfigType } from "@/types/invitationTypes";

type InviteProps = {};

const { div: MotionDiv } = motion;

const Invite = ({}: InviteProps) => {
  const query = useSearchParams();
  const invitation_id: string = query?.get("invitation_id") || "";

  const { isAuthenticated, fetchUser, user, addNewBoard } = useAuth();

  const [invitationConfig, setInvitationConfig] =
    useState<InvitationConfigType>({} as InvitationConfigType);

  const router = useRouter();
  const [picture, setPicture] = useState<any>("");
  const [formType, setFormType] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [invalid, setInvalid] = useState({ isTrue: false, message: "" });
  const [initialLoading, setInitialLoading] = useState(true);

  const { board_id, to, board_name, from, extra } = invitationConfig || {};

  useEffect(() => {
    setFormType(isAuthenticated === true ? "LOGIN" : "SIGNUP");
  }, [isAuthenticated]);

  useEffect(() => {
    async function init() {
      const { response, success, message } = await getInvitation(invitation_id);
      if (success === true) {
        setInvitationConfig(response as InvitationConfigType);
        setInitialLoading(false);
      } else {
        setInvalid({ message: message, isTrue: true });
        setInitialLoading(false);
      }
    }
    init();
  }, [isAuthenticated]);

  const isLoginForm = useMemo(() => formType === "LOGIN", [formType]);
  const isSignupForm = useMemo(() => formType === "SIGNUP", [formType]);

  async function handleInviteAccept(values: any = {}) {
    if (isEmpty(values)) setIsLoading(true);
    let payload: any = {
      board_id: board_id,
      invitation_id: invitation_id,
    };

    if (isAuthenticated === true) {
      payload = { ...payload, user_id: user._id };
    } else if (isAuthenticated === false && isLoginForm === true) {
      payload = { ...payload, ...values, reqType: "LOGIN" };
    } else if (isAuthenticated === false && isSignupForm === true) {
      payload = { ...payload, ...values, reqType: "SIGNUP" };
    }

    // if (isAuthenticated)
    const { response, message, success } = await acceptInvitation(payload);

    if (success === true) {
      toast.success(message);
    }

    // await waitfor();

    const { board, token } = response;

    if (token) {
      setToken(token);
      fetchUser("user", (data) => {
        router.push(`/main`);
      });
    } else {
      addNewBoard(board);
    }

    // TODO  replace push with replace
    if (isAuthenticated) router.push(`/main`);
    if (isEmpty(values)) setIsLoading(false);
  }

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    const url =
      typeof picture !== "string"
        ? await uploadImage(picture?.target?.files?.[0])
        : picture;

    const payload = {
      ...values,
      ...(url ? { picture: url } : {}),
    };
    await handleInviteAccept(payload);
    setIsLoading(false);
  };

  const fields = useMemo(() => {
    return getfields({ isSignupForm, setPicture });
  }, [isSignupForm]);

  const form = useForm({
    defaultValues: { email: to ? to : "" },
    resolver:
      isAuthenticated === true
        ? undefined
        : zodResolver(getSchema({ isSignupForm })),
  });

  return (
    <div
      className={cn(
        "animate-fadeIn",
        "form-container w-full h-full",
        "flex flex-col gap-4 justify-center items-center"
      )}
    >
      {initialLoading ? (
        <Loader />
      ) : invalid.isTrue === true ? (
        <div className="flex flex-col items-center gap-7">
          <AlertTriangle color="orange" size={100} />

          <h1 className="text-3xl animate-fadeIn text-center text-red-300">
            {invalid.message}
          </h1>
        </div>
      ) : (
        <>
          <h2 className="text-2xl">{`${startCase(
            from
          )} has invited you to ${board_name}`}</h2>
          {!isEmpty(extra) && <h2 className="opacity-70">{extra}</h2>}
          {isAuthenticated === true ? (
            <Button
              onClick={() => handleInviteAccept()}
              className={cn(
                "h-20 active:scale-95 transition-all",
                "rounded-lg border-b-green-400 ",
                "border-x-transparent border-t-transparent border-2",
                "bg-highlighter-dark py-3 px-12 text-xl"
              )}
              disabled={isLoading}
            >
              {isLoading ? <h2>Please Wait...</h2> : <h2>Accept Invitation</h2>}
              {isLoading && <Loader />}
            </Button>
          ) : (
            <div
              className={cn(
                "form-container",
                "w-fit",
                "border-2 border-main-bg p-4 pl-8 pr-8 rounded-md"
              )}
            >
              <h2 className="text-3xl text-center">
                {isLoginForm ? "Login" : "Sign Up"}
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className={cn("mt-4 flex flex-col items-center")}
                >
                  <div
                    className={cn(
                      "mt-4 w-full fields-comtainer",
                      isLoginForm
                        ? "grid grid-cols-[100%] gap-6"
                        : "lg:grid grid-cols-[50%_50%] gap-4"
                    )}
                  >
                    {fields.map((f) => (
                      <FormField
                        key={f.name}
                        control={form.control}
                        disabled={isLoading}
                        name={f.name}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>{startCase(f.label)}</FormLabel>
                            <FormControl>
                              <Input
                                customOnChange={f.customOnChange}
                                type={f.type}
                                placeholder={f.placeholder}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <MotionDiv
                    className="self-center mt-4"
                    initial={{
                      width: "50%",
                    }}
                    animate={{
                      width: "100%",
                    }}
                  >
                    <Button
                      disabled={isLoading}
                      type="submit"
                      className={cn(
                        "flex flex-row items-center gap-3",
                        "w-full border-main-bg border-2"
                      )}
                    >
                      {isLoading && <Loader />}
                      {isLoading ? (
                        <h1 className="animate-fadeIn">Submitting ...</h1>
                      ) : (
                        <h1 className="animate-fadeIn">
                          Accept invite and submit
                        </h1>
                      )}
                    </Button>
                  </MotionDiv>
                </form>
              </Form>

              <div
                className={cn(
                  isLoading && "pointer-events-none opacity-60",
                  "flex flex-row mt-4 justify-center gap-2"
                )}
              >
                <h2 className="">
                  {isLoginForm
                    ? "New to monday.io?"
                    : "Already have an account?"}
                </h2>
                <h2
                  className="text-blue-400 underline cursor-pointer"
                  onClick={() => {
                    if (isLoginForm) {
                      setFormType("SIGNUP");
                    } else {
                      setFormType("LOGIN");
                    }
                  }}
                >
                  {isLoginForm ? "Create new account" : "Log-in here"}
                </h2>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Invite);
