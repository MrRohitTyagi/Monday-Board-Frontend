import FormSimpleInput from "@/components/core/FormSimpleInput";
import FormSimpleTextArea from "@/components/core/FormSimpleTextArea";
import Loader from "@/components/core/Loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { sendInvitation } from "@/gateways/email-gateway";
import { BoardType } from "@/types/boardTypes";
import { useAuth } from "@/zstore";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  description: z.string().optional(),
});

type UserInviteProps = {
  board: BoardType;
  onClose: () => void;
};

const UserInvite = ({ board, onClose }: UserInviteProps) => {
  const {
    user: { username },
  } = useAuth();
  const form = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values: any) => {
    const payload = {
      to: values.email,
      extra: values.description,
      from: username,
      board: board._id,
      board_name: board.title,
    };
    const res = await sendInvitation(payload);
    if (res.success === false) {
      toast.error(res.message || "Invitation failed please try again");
    } else {
      toast.success(res.message || "Invitation sent successfully");
      onClose();
    }
  };

  return (
    <div className="invite-user-cont">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormSimpleInput
            disabled={form.formState.isSubmitting}
            form={form}
            label="User email"
            name="email"
            placeHolder="Enter user email"
            type="email"
          />
          <FormSimpleTextArea
            disabled={form.formState.isSubmitting}
            classNames={{ input: "!mt-0" }}
            form={form}
            label="Description (optional)"
            name="description"
            placeHolder="Enter description"
            type="text"
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="flex flex-row gap-3"
          >
            {form.formState.isSubmitting ? (
              <h1>Sending...</h1>
            ) : (
              <h1>Send invite</h1>
            )}
            {form.formState.isSubmitting ? (
              <Loader />
            ) : (
              <SendHorizonal color="white" size={16} />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default memo(UserInvite);
