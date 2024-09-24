"use client"
import Link from 'next/link';
import { PiDroneBold } from 'react-icons/pi';
import {
    Home,
} from "lucide-react"
import { HiOutlineBellAlert } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge"
import { usePathname } from 'next/navigation';
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Nav = () => {
    const pathname = usePathname();
    return (
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="#" className="flex items-center gap-2 font-semibold">
                    <PiDroneBold className="h-6 w-6" />
                    <span className="">WEB-MONITOR</span>
                </Link>

            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                        href="/overview"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname === '/overview' ? 'text-foreground bg-muted' : 'text-muted-foreground'
                            }`}
                    >
                        <Home className="h-4 w-4" />
                        Overview
                    </Link>
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname === '/dashboard' ? 'text-foreground bg-muted' : 'text-muted-foreground'
                            }`}
                    >
                        <MdOutlineSpaceDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/alert"
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${pathname === '/alert' ? 'text-foreground bg-muted' : 'text-muted-foreground'
                            }`}
                    >
                        <HiOutlineBellAlert className="h-4 w-4" />
                        Alert
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                            2
                        </Badge>
                    </Link>

                </nav>
            </div>
        </div>
    );
};

export default Nav;
