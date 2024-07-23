import { ErrorUnauthorizedComponent } from "../components/common/error/403";
import RootLayout from "../components/layouts/layout";
import { useAuth } from "../hooks/Auth.hooks"

export function ErrorUnauthorizedPage() {
    const { isLoggedIn } = useAuth();
    return (
        <>
            {isLoggedIn ?
                <RootLayout title="">
                    <ErrorUnauthorizedComponent />
                </RootLayout>
                :
                <ErrorUnauthorizedComponent />
            } 
                
        </>
    )
}