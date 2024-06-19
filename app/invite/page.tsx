"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { login, signup } from "@/gateways/auth-gateway";
import { toast } from "sonner";
import { useAuth } from "@/zstore";
import { setToken } from "@/utils/cookie";
import Loader from "@/components/core/Loader";
import { uploadImage } from "@/utils/imageupload";
import { getSchema, getfields } from "../(auth-routes)/login/utils";

type InviteProps = {};

const { div: MotionDiv } = motion;

const Invite = ({}: InviteProps) => {
  const query = useSearchParams();
  const boardID = query?.get("board_id");
  const userEmail = query?.get("email");
  const boardName = query?.get("board_name");
  const invited_by = query?.get("invited_by");
  const extra = query?.get("extra");
  const { isAuthenticated, fetchUser } = useAuth();
  const router = useRouter();

  const [picture, setPicture] = useState<any>("");

  const [formType, setFormType] = useState("");

  useEffect(() => {
    setFormType(isAuthenticated === true ? "LOGIN" : "SIGNUP");
  }, [isAuthenticated]);

  const isLoginForm = formType === "LOGIN";
  const isSignupForm = formType === "SIGNUP";

  const onSubmit = useCallback(
    async (values: any) => {
      let promise;
      const url =
        typeof picture !== "string"
          ? await uploadImage(picture?.target?.files?.[0])
          : picture;

      const payload = {
        ...values,
        ...(url ? { picture: url } : {}),
        board: boardID,
      };

      // return console.log(
      //   `%c payload `,
      //   "color: pink;border:1px solid pink",
      //   payload
      // );

      if (isLoginForm) {
        promise = await login(payload);
      } else {
        promise = await signup(payload);
      }

      if (promise.success === false) {
        toast.error(promise?.message || "Login successfully!");
      } else {
        toast.success(promise.message);
        setToken(promise.token);
        fetchUser("user", (data) => {
          router.push(`/main/${data.org}`);
        });
      }
    },
    [isLoginForm, picture]
  );

  const fields = useMemo(() => {
    return getfields({ isSignupForm, setPicture });
  }, [isSignupForm]);

  console.log(`%c query `, "color: yellow;border:1px solid lightgreen", {
    boardID,
    userEmail,
    boardName,
    invited_by,
    extra,
  });

  const form = useForm({
    defaultValues: { email: userEmail ? userEmail : "" },
    resolver: zodResolver(getSchema({ isSignupForm })),
  });

  return (
    <div
      className={cn(
        "animate-fadeIn",
        "form-container w-full h-full",
        "flex flex-col gap-4 justify-center items-center"
      )}
    >
      <h2 className="text-2xl">{`${invited_by} invited you to ${boardName}`}</h2>
      {!isEmpty(extra) && <h2 className="opacity-70">{extra}</h2>}
      <div
        className={cn(
          "form-container",
          "w-fit",
          "border-2 border-main-light p-4 pl-8 pr-8 rounded-md"
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
                  disabled={form.formState.isSubmitting}
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
                disabled={form.formState.isSubmitting}
                type="submit"
                className={cn(
                  "flex flex-row items-center gap-3",
                  "w-full border-main-light border-2"
                )}
              >
                {form.formState.isSubmitting && <Loader />}
                {form.formState.isSubmitting ? (
                  <h1 className="animate-fadeIn">Submitting ...</h1>
                ) : (
                  <h1 className="animate-fadeIn">Submit and accept invite</h1>
                )}
              </Button>
            </MotionDiv>
          </form>
        </Form>

        <div
          className={cn(
            form.formState.isSubmitting && "pointer-events-none opacity-60",
            "flex flex-row mt-4 justify-center gap-2"
          )}
        >
          <h2 className="">
            {isLoginForm ? "New to monday.io?" : "Already have an account?"}
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
    </div>
  );
};

export default Invite;
