"use client";
import { startCase } from "lodash";
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const { div: MotionDiv } = motion;

function getSchema({ isSignupForm }: { isSignupForm: boolean }) {
  const formSchema = z.object({
    ...(isSignupForm === true
      ? {
          username: z
            .string({ message: "Username is required" })
            .min(2, {
              message: "Username must be at least 2 characters.",
            })
            .max(20, { message: "Username must not exceed 20 characters." }),
        }
      : {}),
    email: z.string({ message: "Invalid Email" }).email(),
    password: z
      .string({ message: "Password is required" })
      .min(4, "Password too short")
      .max(20, "Password too long"),
  });
  return formSchema;
}

type LoginFormProps = {
  isSignupForm: boolean;
};
function Login({ isSignupForm = false }: LoginFormProps) {
  //
  const form = useForm({ resolver: zodResolver(getSchema({ isSignupForm })) });
  const router = useRouter();
  const isLoginForm = isSignupForm === false;

  function onSubmit(values: any) {
    console.log(values);
  }
  const fields = useMemo(() => {
    const commonFileds = [
      {
        name: "email",
        label: "Email",
        placeholder: "your-email@email.com",
        type: "email",
      },
      {
        label: "Password",
        name: "password",
        placeholder: "Enter password (min : 3 , max : 20)",
        type: "password",
      },
    ];

    const signupfields = [
      {
        name: "username",
        label: "Username",
        placeholder: "Username",
        type: "text",
      },
      {
        name: "org",
        label: "Organisation name",
        placeholder: "Enter your Organisation name",
        type: "text",
      },
      {
        name: "picture",
        label: "Profile picture",
        placeholder: "Profile Picture",
        type: "file",
      },
    ];
    const finalFields = [
      ...commonFileds,
      ...(isSignupForm === true ? signupfields : []),
    ];
    return finalFields;
  }, []);

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
          "form-container w-5/12",
          "border-2 border-main-light p-4 pl-8 pr-8 rounded-md"
        )}
      >
        <h2 className="text-3xl text-center">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 flex flex-col justify-center"
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
            <MotionDiv
              className="self-center"
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
