"use client";
import { startCase } from "lodash";
import { memo, useCallback, useMemo, useState } from "react";
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
import { getSchema, getfields } from "./utils";
import { login, signup } from "@/gateways/auth-gateway";
import { toast } from "sonner";
import { useAuth } from "@/zstore";
import { setToken } from "@/utils/cookie";
import Loader from "@/components/core/Loader";
import { uploadImage } from "@/utils/imageupload";

const { div: MotionDiv } = motion;

const LoginComponent = () => {
  const pathname = usePathname();
  const isSignupForm = pathname === "/signup";
  const isLoginForm = isSignupForm === false;
  const router = useRouter();

  const { fetchUser } = useAuth();
  const form = useForm({
    resolver: zodResolver(getSchema({ isSignupForm })),
  });

  const [picture, setPicture] = useState<any>("");

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
      };

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
          router.replace(`/main`);
        });
      }
    },
    [isLoginForm, picture]
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
                  disabled={form.formState.isSubmitting}
                  name={f.name}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{startCase(f.label)}</FormLabel>
                      <FormControl>
                        <Input
                          className={cn(
                            f.type === "file" && "file-input-sm",
                            "bg-transparent !mt-0"
                          )}
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
                  "w-full border-main-bg border-2"
                )}
              >
                {form.formState.isSubmitting && <Loader />}
                {form.formState.isSubmitting ? (
                  <h1 className="animate-fadeIn">Submitting ...</h1>
                ) : (
                  <h1 className="animate-fadeIn">Submit</h1>
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
};

export default memo(LoginComponent);
