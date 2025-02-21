"use client"

import { Router } from "next/router";
import { useAuth } from "../firebase/authContext";
import { useRouter } from "next/navigation";

export default function Logout(){
    const { user, logout } = useAuth();
    const router = useRouter();

    logout();

    router.push("/");

    return(
        <></>
    )
    
}