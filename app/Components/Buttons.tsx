"use client"

import { Button } from "@/components/ui/button"
import { signIn, signOut } from "next-auth/react"

export function Logout() {
    return (
        <Button variant="outline" onClick={() => signOut()}>Logout</Button>
    )
}

export function NavLogin() {
    return (
        <Button variant="outline" onClick={() => signIn("github")}>Login</Button>
    )
}

export function MainLogin() {
    return (
        <Button variant="outline" className="w-full" onClick={() => signIn("github")}>Login with Github</Button>    
    )
}