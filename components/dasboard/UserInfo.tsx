'use client';

import { ExitIcon } from "@radix-ui/react-icons"
import { signOut, useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const UserInfo = () => {

    const isClient = typeof window !== "undefined";
  const { data: session } = isClient ? useSession() : { data: null };

    return (

        <Card className="">
            <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <div>
                <Label>Nom: </Label> <span className="font-bold">{session?.user?.name}</span>
            </div>
                <div className="py-4">
                    <Label>Email: </Label> <span className="font-bold">{session?.user?.email}</span>
                </div>
                <Button
                    onClick={() => signOut()}
                   
                >
                  <ExitIcon />
                </Button>
                </div>            
            </CardContent>
        </Card>
    )
}

export default UserInfo