"use client";

import Image from "next/image";
import Link from "next/link";
import { useSessionStore } from "../_stores/auth.store";
import { Button } from "./button";

const TopNavigationAccount = () => {
  const status = useSessionStore((state) => state.status);
  const session = useSessionStore((state) => state.session);

  return (
    <div className="flex items-center">
      {status === "loading" && <p>Loading...</p>}
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
          <Link href={""} className="text-error">
            خروج
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopNavigationAccount;
