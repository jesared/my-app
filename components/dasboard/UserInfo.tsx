'use client';

import { ExitIcon } from "@radix-ui/react-icons"
import { signOut, useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { SidebarMenu } from "./command";


const UserInfo = () => {

    const { data: session } = useSession();

    return (
       <SidebarMenu />
    )
}

export default UserInfo