import { useAuth } from "@/components/auth/AuthContext"
// Please use regular react suspense for loading. This component is for displaying a fallback while checking authentication.

import { ReactNode } from "react";
import AuthRedirect from "./AuthRedirect";

interface AuthSuspenseProps {
    children: ReactNode;
}

export default function AuthSuspense({ children }: AuthSuspenseProps){
    const { user } = useAuth();
    return (
        <>
            <AuthRedirect url={'/login'}/>

            {user ?
                <>
                    {children}
                </>
            :
                <div>
                    <h1 className="text-4xl font-bold text-center mt-20">Authorizing...🧐</h1>
                </div>}
        </>
    )
}