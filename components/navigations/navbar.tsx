/* eslint-disable react/no-unescaped-entities */
"use client"

import * as React from "react"
import { usePathname } from 'next/navigation'
import Link from "next/link"


import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"



export function  Navbar() {

  const pathname = usePathname()

  return (
    <NavigationMenu className="w-full mx-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref >
            <NavigationMenuLink
              className={pathname === "/" ? "font-bold" : navigationMenuTriggerStyle()}
            >
              accueil
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/login" legacyBehavior passHref >
            <NavigationMenuLink
              className={pathname === "/login" ? "font-bold" : navigationMenuTriggerStyle()}
            >
              se connecter
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/register" legacyBehavior passHref>
            <NavigationMenuLink
              className={pathname === "/register" ? "font-bold" : navigationMenuTriggerStyle()}
            >
              s'inscrire
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink
              className={pathname === "/dashboard" ? "font-bold" : navigationMenuTriggerStyle()}
            >
              dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}