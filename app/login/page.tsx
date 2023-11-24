import { SignInForm } from "@/components/form/signin-form"
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";



export default async function Login() {


  const session = await getServerSession(authOptions);

  console.log('session', session)

  if (session) redirect('/dashboard');

  return (
    <div className="grid place-items-center h-screen">  
        <SignInForm
         title="SignIn"
         description="Log toi mon ami !" 
         />
    </div>
  )
}