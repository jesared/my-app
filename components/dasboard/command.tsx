'use client';

import { signOut, useSession } from "next-auth/react";
import {
    Calculator,
    Calendar,
    CreditCard,
    LogOutIcon,
    Settings,
    Smile,
    User,
  } from "lucide-react"
  
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  
  export function SidebarMenu() {
    return (
      <Command className="rounded-lg border shadow-md">
     <CommandList>
          <CommandGroup heading="Dashboard">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              
            </CommandItem>
            <CommandItem>
                <button onClick={() => signOut()} className="flex items-center">
                    <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
                </button>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    )
  }
  