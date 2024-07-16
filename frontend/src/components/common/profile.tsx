import { Button } from "flowbite-react";
import { AccountInterface } from "../entity/account";
import { useState } from "react";
import { ProfileDrawer } from "../../pages/account/profileDrawer";

interface ProfileProps {
    account: AccountInterface;
}

export function ProfileComponent(props: ProfileProps) {
    const { account } = props;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <>
            {
                account && account.profile ? 
                    <>
                        <div className="bg-white p-4 mb-6 dark:text-white dark:bg-gray-800">
                            <div className="sm:flex xl:block sm:space-x-4 xl:space-x-0">
                                <img className="mb-2 w-20 h-20 rounded-2xl shadow-lg shadow-gray-300 dark:shadow-gray-800" src={account.profile.avatarUrl} alt={account.profile.fullName} />
                                <div>
                                    <h2 className="text-xl font-bold">{account.profile.fullName}</h2>
                                    <div className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-300">
                                        {account.profile.bio}
                                    </div>
                                </div>                            
                            </div>
                            <div className="mb-4 sm:flex xl:block">
                                <div className="sm:flex-1">
                                    <address className="text-sm not-italic font-normal text-gray-500 dark:text-gray-300">
                                        <div className="mt-4">Username</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{account.username}</div>
                                        <div className="mt-4">Email adress</div>
                                        <a className="text-sm font-medium text-gray-900 dark:text-white" href={`mailto:${account.email}`}>{account.email}</a>
                                    </address>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Button onClick={() => setIsDrawerOpen(true)}>Edit Profile</Button>
                            </div>
                        </div>
                        <ProfileDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} profile={account.profile}/>
                    </>
                    :
                    <div className="bg-white p-4 mb-6 dark:bg-gray-800">
                        <div className="mx-auto max-w-screen-sm text-center">
                            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                                Whoops
                            </h1>
                            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                                Your Profile is not ready.
                            </p>
                            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                                Click button below you feel you haven't create your profile.
                            </p>
                            <Button onClick={() => setIsDrawerOpen(true)}>Edit Profile</Button>
                            <ProfileDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
                        </div>
                    </div>
            }
        </>
    )
}