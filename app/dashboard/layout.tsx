import { getServerSession } from "next-auth";
import { redirect, } from "next/navigation";
import { authOptions } from "@/lib/auth"
import Loading from "@/components/loading/loading";
import { Suspense } from "react";
import Breadcrumb from "@/components/dasboard/BreadcrumbDashborad";
import { SidebarMenu } from "@/components/dasboard/SidebarMenu";

const breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Profile', href: 'dashboard/profile' },
    { label: 'Ajouté un participant', href: 'dashboard/add-participants' },
  ];

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    
    const session = await getServerSession(authOptions);

    if (!session || undefined) redirect("/login");

    return (
        <Suspense fallback={<Loading />}>
           
            <div className="flex gap-4 bg-violet-950">
                
                    <SidebarMenu />
                
                <div className="w-screen">
                <Breadcrumb breadcrumbs={breadcrumbs}/>
                    <div className="grid gap-4">
                        <Suspense fallback={<Loading />}>
                            {children}
                        </Suspense>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}