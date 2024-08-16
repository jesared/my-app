import { SignInForm } from "@/components/form/signin-form"
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"

import Loading from "@/components/loading/loading";
import { Suspense } from "react";

export default function Login() {


  return (
    <Suspense fallback={<Loading />}>
      <div className="grid place-items-center pt-10">
        <SignInForm
          title="SignIn"
          description="Log toi mon ami !"
        />
      </div>
    </Suspense>
  )
}