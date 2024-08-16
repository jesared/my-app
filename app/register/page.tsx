import { RegisterForm  } from "@/components/form/register-form";
import Loading from "@/components/loading/loading";
import { Suspense } from "react";


export default function Register() {



  return (
    <Suspense fallback={<Loading />}>
    <div className="grid place-items-center pt-10">  
        <RegisterForm
        title="Register"
        description="Incrit toi sur tournoi management !"
        register
        />
    </div>
    </Suspense>
  )
}