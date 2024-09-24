"use client"
import Nav from "@/components/Nav";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation"
export default function Overview() {
    const { data: session } = useSession();
    if (!session) redirect("/login")
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <Nav />
            </div>
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 rounded-lg border border-dashed shadow-sm w-full h-full p-4">

                        <div className="col-span-2 w-full h-full flex items-center justify-center">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7966760.058839532!2d91.34686688389156!3d12.842012473534131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d8df747424db1%3A0x9ed72c880757e802!2sThailand!5e0!3m2!1sen!2sin!4v1726101056689!5m2!1sen!2sin"
                                className="w-full h-full rounded-lg"
                                style={{ border: 0 }}
                            >
                            </iframe>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
