"use client";

import { signIn } from "next-auth/react";

export default function Page() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>Войти через Google</button>
    </div>
  );
}
