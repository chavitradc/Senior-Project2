"use client"
import Link from "next/link"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter, redirect } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react";

export default function Regsiter() {
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const router = useRouter();
    const { data: session } = useSession();
    if (session) redirect("/")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setError("Password do not match!")
            return;
        }
        if (!fname || !lname || !username || !password || !confirmPassword) {
            setError("Please complete your information!")
            return;
        }
        try {

            const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username })
            })
            const { user } = await resCheckUser.json();
            if (user) {
                setError("Username already exists!");
                return;
            }
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, lname, username, password
                })
            })
            if (res.ok) {
                setError("");
                setSuccess("User registration successful");
                // Wait for a brief moment to show the success message
                setTimeout(() => {
                    router.push("/login"); // Redirect to the login page
                }, 1000);
            } else {
                const errorData = await res.json(); // Get the error response data
                setError(errorData.message || "User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration", error)
        }

    }
    return (
        <main className="flex flex-col justify-center items-center mx-auto h-screen">
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md my-2">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md my-2">
                        {success}
                    </div>
                )}
                <Card className="mx-auto max-w-sm ">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="fname">First name</Label>
                                    <Input onChange={(e) => setFname(e.target.value)} id="fname" placeholder="" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lname">Last name</Label>
                                    <Input onChange={(e) => setLname(e.target.value)} id="lname" placeholder="" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input onChange={(e) => setUsername(e.target.value)}
                                    id="username"
                                    type="username"
                                    placeholder=""

                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" type="password" />
                            </div>
                            <Button type="submit" className="w-full">
                                Create an account
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </main>
    )
}