"use client";
import { startCase } from "lodash";
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
import { getSchema, getfields } from "./utils";
import { login, signup } from "@/gateways/auth-gateway";
import { toast } from "sonner";
import { UserType, useAuth } from "@/zstore";
import { setToken } from "@/utils/cookie";

const { div: MotionDiv } = motion;

type LoginFormProps = {
  isSignupForm: boolean;
};
function Login({ isSignupForm = false }: LoginFormProps) {
  const { fetchUser } = useAuth();
  //
  const form = useForm({
    resolver: zodResolver(getSchema({ isSignupForm })),
  });

  const router = useRouter();
  const [picture, setPicture] = useState<any>(null);

  const isLoginForm = isSignupForm === false;

  const onSubmit = useCallback(
    async (values: any) => {
      let result: UserType = {} as UserType;
      let promise;
      let token: string;
      let isSuccess = false;

      if (isLoginForm) {
        promise = login(values);
      } else {
        promise = signup(values);
      }

      await toast.promise(promise, {
        loading: "Fetching details please wait",
        success: (data) => {
          isSuccess = true;
          result = data.response;
          token = data.token;
          return data.message;
        },

        error: (data) => {
          return data.message;
        },
      });

      await promise;

      if (!isSuccess) return;
      fetchUser(result?._id || "", (data) => {
        router.replace(`/main/${data.org}`);
        setToken(token);
      });
    },
    [isLoginForm]
  );

  const fields = useMemo(() => {
    return getfields({ isSignupForm, setPicture });
  }, [isSignupForm]);

  return (
    <div
      className={cn(
        "animate-fadeIn",
        "form-container w-full h-full",
        "flex flex-row justify-center items-center"
      )}
    >
      <div
        className={cn(
          "form-container",
          isSignupForm ? "w-9/12" : "w-5/12",
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
                  : "grid grid-cols-[50%_50%] gap-4"
              )}
            >
              {fields.map((f) => (
                <FormField
                  key={f.name}
                  control={form.control}
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
                type="submit"
                className="w-full border-main-light border-2"
              >
                Submit
              </Button>
            </MotionDiv>
          </form>
        </Form>

        <div className="flex flex-row mt-4 justify-center gap-2">
          <h2 className="">
            {isLoginForm ? "New to monday.io?" : "Already have an account?"}
          </h2>
          <h2
            className="text-blue-400 underline cursor-pointer"
            onClick={() => {
              if (isLoginForm) {
                router.push("/signup");
              } else {
                router.push("/login");
              }
            }}
          >
            {isLoginForm ? "Create new account" : "Log-in here"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
