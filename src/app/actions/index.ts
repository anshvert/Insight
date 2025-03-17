'use server'

import { auth, signIn, signOut } from "@/lib/auth";

export async function doSocialLogin(formData: any): Promise<void> {
    const action = formData.get('action')
    return await signIn(action, { redirectTo: "/chat/" })
}

export async function getSession() {
    return await auth()
}

export async function SignOut() {
    await signOut({ redirectTo: "/" })
}