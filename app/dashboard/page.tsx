

import UserInfo from "@/components/dasboard/UserInfo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Basic } from "@/components/tables/basic";
import { Notification } from "@/components/notifications/notification";


export default async function Dashboard() {

  const session = await getServerSession(authOptions);


  if (!session) redirect("login");

  return (
    <div className="flex flex-row py-10 gap-4">
      <div className="basis-1/6">
        <UserInfo />
      </div>   
      <div className="basis-1/2">
        <Notification />
       </div>
    </div>
  );
}
