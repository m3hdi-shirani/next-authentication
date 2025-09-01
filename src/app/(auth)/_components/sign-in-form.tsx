"use client";

import { signinAction } from "@/app/_actions/auth-actions";
import Eye from "@/app/_assets/eye";
import Phone from "@/app/_assets/phone";
import { Button } from "@/app/_components/button";
import { TextBox } from "@/app/_components/textbox";
import { valibotResolver } from "@hookform/resolvers/valibot";
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

  //Submit
  const onSubmit = async (data: SignInModel) => {
    startTransition(async () => {
      const response = await signinAction(data);
      console.log(response);
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
          label="شماره موبایلت رو وارد کن"
          icon={<Phone />}
        />
        <TextBox
          name={"password"}
          register={register}
          errors={errors}
          type="password"
          placeholder="رمز عبور"
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
