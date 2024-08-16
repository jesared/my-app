/* eslint-disable react/no-unescaped-entities */
'use client';

import {useEffect, useState} from "react";
import { PersonIcon } from "@radix-ui/react-icons"
import { useSession, getSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Loading from "@/components/loading/loading";

export const ProfileComponent = () => {

  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  

  useEffect(() => {
    const fetchData = async () => {
      const currentSession  = await getSession();
      if (currentSession) {
        setLoading(false)
      }else{
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  
console.log('session', session)
  // const isClient = typeof window !== "undefined";
  // const { data: session } = isClient ? useSession() : { data: null };


  return (
    <Card className="rounded-none bg-violet-50">
      <CardHeader className="pb-3">
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Bienvenue sur votre profil d'utilisateur
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