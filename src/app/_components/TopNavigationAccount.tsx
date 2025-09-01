"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signOutAction } from "../_actions/auth-actions";
import { useSessionStore } from "../_stores/auth.store";
import { Button } from "./button";
import { Loading } from "./loading";

const TopNavigationAccount = () => {
  const status = useSessionStore((state) => state.status);
  const session = useSessionStore((state) => state.session);
  const clearSession = useSessionStore((state) => state.clearSession);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      const response = await signOutAction();
      if (response?.isSuccess) {
        clearSession();
        router.push("/");
      }
    });
  };

  return (
    <div className="flex items-center">
      {status === "loading" && <Loading color="error" size="xs" text="" />}
      {status === "unauthenticated" && (
        <Button variant="outlined" href="/signin">
          ورود به حساب
        </Button>
      )}
      {status === "authenticated" && session && (
        <div className="flex items-center gap-3">
          <Image
            src={session.pic}
            width={48}
            height={48}
            alt={"avatar-user"}
            className="rounded-full"
          />
          <p>{session.fullName}</p>|
          <div onClick={handleSignOut} className="text-error cursor-pointer">
            {isPending ? (
              <>
                <Loading color="error" size="xs" text="" />
              </>
            ) : (
              <span>خروج</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavigationAccount;
