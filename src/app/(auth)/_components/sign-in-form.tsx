"use client";

import { signinAction } from "@/app/_actions/auth-actions";
import Eye from "@/app/_assets/eye";
import Phone from "@/app/_assets/phone";
import { Button } from "@/app/_components/button";
import { TextBox } from "@/app/_components/textbox";
import { useSessionStore } from "@/app/_stores/auth.store";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import { SignInSchema } from "../_types/auth.schema";
import { SignInModel } from "../_types/auth.types";

export const SignInForm: FC = () => {
  //Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInModel>({
    resolver: valibotResolver(SignInSchema),
  });

  const [isPending, startTransition] = useTransition();
  const updateSession = useSessionStore((state) => state.updateSession);
  const router = useRouter();

  //Submit
  const onSubmit = async (data: SignInModel) => {
    startTransition(async () => {
      const response = await signinAction(data);
      if (response.isSuccess) {
        updateSession();
        router.push("/dashboard/courses");
      }
    });
  };

  //Render
  return (
    <div className=" w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-6"
      >
        <TextBox
          name={"username"}
          register={register}
          errors={errors}
          type="number"
          placeholder="شماره موبایل"
          value="09130664121"
          label="شماره موبایلت رو وارد کن"
          icon={<Phone />}
        />
        <TextBox
          name={"password"}
          register={register}
          errors={errors}
          type="password"
          placeholder="رمز عبور"
          value="12345678"
          label="رمز عبورت رو وارد کن"
          icon={<Eye />}
        />
        <Button type="submit" loading={isPending} className="w-full">
          ورود به پلتفرم
        </Button>
      </form>
    </div>
  );
};
