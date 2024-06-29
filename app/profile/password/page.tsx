"use client";
import FormSimpleInput from "@/components/core/FormSimpleInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { verifyOTP } from "@/gateways/email-gateway";
import { changeUserPassword } from "@/gateways/user-gateway";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PasswordProps = {};

const passwordSchema = z.object({
  password: z.string().min(3, "Password must be at least 3 characters"),
  // new_password: z.string().min(3, "Password must be at least 3 characters"),
  // confirm_new_password: z.string(),
});
// .refine(
//   (data) => {
//     return data.new_password === data.confirm_new_password;
//   },
//   {
//     message: "Passwords must match",
//     path: ["confirm_new_password"],
//   }
// );

const Password = (props: PasswordProps) => {
  const form = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const [otp, setotp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const onSubmit = async (values: any) => {
    const { success } = otpSent
      ? { success: true }
      : await changeUserPassword({ password: values.password });

    if (success !== true) return;

    if (otpSent === false) {
      return setOtpSent(true);
    }
    verifyOTP({ otp: otp });
    //....
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-3")}
        >
          <div className="mx-auto w-96 space-y-6 py-12">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Change Password</h1>
            </div>
            <div className="space-y-4">
              <FormSimpleInput
                form={form}
                label="Current password"
                name="password"
                // placeHolder="Enter current password"
              />
              <FormSimpleInput
                form={form}
                label="New password"
                name="new_password"
                // placeHolder="Enter new password"
              />
              <FormSimpleInput
                form={form}
                label="Confirm new password"
                name="confirm_new_password"
                // placeHolder="Enter current password"
              />
              {otpSent && (
                <div
                  className={cn(
                    "animate-fadeIn",
                    "space-y-2 flex flex-col justify-center items-center"
                  )}
                >
                  <Label htmlFor="otp" className="opacity-80">
                    OTP sent to your regestered email
                  </Label>
                  <InputOTP
                    maxLength={6}
                    pattern="^[0-9]+$"
                    value={otp}
                    onChange={(e) => {
                      setotp(e);
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="w-full">
                    <h1
                      className={cn(
                        "text-indigo-2  00 cursor-pointer",
                        "text-sm underline underline-offset-2"
                      )}
                    >
                      Resend OTP
                    </h1>
                  </div>
                </div>
              )}
              <Button type="submit" className="w-full">
                Change Password
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Password;
