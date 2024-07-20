import { ErrorNotFoundComponent } from "../components/common/error/404";
import RootLayout from "../components/layouts/layout";
import { useAuth } from "../hooks/AuthContext.hooks"

export function ErrorNotFoundPage() {
    const { isLoggedIn } = useAuth();
    return (
        <>
            {isLoggedIn ?
                <RootLayout breadcrumbList={[]} title="" error={null} isError={false} setIsError={null}>
                    <ErrorNotFoundComponent />
                </RootLayout>
                :
                <ErrorNotFoundComponent />
            } 
                
        </>
    )
}