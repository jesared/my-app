'use client';

import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const SettingComponent = () => {

  // const isClient = typeof window !== "undefined";
  // const { data: session } = isClient ? useSession() : { data: null };
  const { data: session } = useSession();

  return (
    <Card className="rounded-none bg-violet-50">
      <CardHeader className="pb-3">
        <CardTitle>Setting</CardTitle>
        <CardDescription>
          modifier vos informations.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-1">
       
        <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
          <PersonIcon className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">votre nom</p>
            <p className="text-sm text-muted-foreground">
            {session?.user?.name}
            </p>
          </div>
        </div>
      
      </CardContent>
    </Card>
  )
}