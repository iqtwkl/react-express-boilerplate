import { ErrorNotFoundComponent } from "../components/common/error/404";
import RootLayout from "../components/layouts/layout";
import { useAuth } from "../hooks/Auth.hooks"

export function ErrorNotFoundPage() {
    const { isLoggedIn } = useAuth();
    return (
        <>
            {isLoggedIn ?
                <RootLayout title="">
                    <ErrorNotFoundComponent />
                </RootLayout>
                :
                <ErrorNotFoundComponent />
            } 
                
        </>
    )
}