'use client';

import { usePathname, useRouter } from "next/navigation";
import { LogoutButton } from "../bouton.component";
import { ItemMenu } from "./ui/ItemMenu";
import { ImageDash } from "./ui/ImageDash";

export function SidebarMenu() {

    const router = useRouter();
    const pathname = usePathname();

    return ( 
    
        <div className="flex place-content-start">
            <div className="bg-violet-100 flex flex-col h-screen items-center w-60 ">
                <ImageDash userName="Jérôme" avatarLink="/assets/images/noavatar.jpg" />
                <div>
                    <ItemMenu label="Profile" icon="user" href="/dashboard/profile" />
                    <ItemMenu label="Ajouter participant" href="/dashboard/add-participant" icon="add"/>
                    <ItemMenu label="Participants" href="/dashboard/participants" icon="participant"/>
                    <ItemMenu label="Settings" href="/dashboard/setting" icon="settings"/>
                    <ItemMenu label="Home" href="/" icon="home"/>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}
