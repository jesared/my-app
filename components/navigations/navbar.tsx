/* eslint-disable react/no-unescaped-entities */
"use client"

import {useEffect, useState} from "react";
import { getSession, useSession } from "next-auth/react";
import { usePathname } from 'next/navigation'
import Link from "next/link"


import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { HeartHandshake, HomeIcon, LogIn, Lollipop, UserCog2 } from "lucide-react";
import Loading from "@/components/loading/loading";




export const Navbar = () => {

  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
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

  if (loading) {
    return <Loading />
  }
  

  return (
    <NavigationMenu className="container mx-auto  py-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref >
            <NavigationMenuLink
              className="flex items-center"
            >
              <HomeIcon className={pathname === "/" ? "mr-2 h-7 w-7 text-primary" : "mr-2 h-7 w-7"} />

            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {!session ? (
          <>
            <NavigationMenuItem >
              <Link href="/login" legacyBehavior passHref >
                <NavigationMenuLink
                  className="flex items-center"
                >
                <LogIn className={pathname === "/login" ? "mr-2 h-7 w-7 text-primary" : "mr-2 h-7 w-7"} />
                  
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem >
              <Link href="/register" legacyBehavior passHref>
                <NavigationMenuLink
                  className="flex items-center"
                >
                <HeartHandshake  className={pathname === "/register" ? "mr-2 h-7 w-7 text-primary " : "mr-2 h-7 w-7"} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        ) : null}
        {session ? (
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink>
              <Lollipop className={pathname.startsWith("/dashboard") ? "mr-2 h-7 w-7 text-primary " : "mr-2 h-7 w-7"} />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ) : null}
      </NavigationMenuList>
    </NavigationMenu>
  )
}