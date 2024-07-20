import { useEffect, useState } from "react";
import RootLayout from "../../components/layouts/layout";
import { ApplicationError } from "../../components/common/error";
import LoadingComponent from "../../components/common/loading";
import { AccountAPI } from "../../services/api/account";
import { useAuth } from "../../hooks/Auth.hooks";
import { AccountInterface } from "../../components/entity/account";
import { ProfileComponent } from "../../components/common/profile";

export function ProfilePage() {

    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<ApplicationError>(Object);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth()
    const [account, setAccount] = useState<AccountInterface>(Object);
    const api = new AccountAPI(token);

    const getProfile = async () => {
        setLoading(true);
        try {
            const response = await api.getProfile();
            setAccount(response);
        } catch (error: unknown) {
            setError(error as ApplicationError);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProfile();
        console.log(`error ${isError}`);
        console.log(`loading ${loading}`)
    }, []);

    return (
        <>
            <RootLayout title='Profile' error={error} isError={isError} setIsError={setIsError}>
                {
                    loading ? <LoadingComponent /> : <ProfileComponent account={account} />
                }
            </RootLayout>
        </>
    )
}