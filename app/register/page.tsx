import { RegisterForm  } from "@/components/form/register-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function Register() {
  const session = await getServerSession(authOptions);


  if (session) redirect("dashboard");

  return (
    <div className="grid place-items-center h-screen">  
        <RegisterForm
        title="Register"
        description="Incrit toi sur tournoi management !"
        register
        />
    </div>
  )
}