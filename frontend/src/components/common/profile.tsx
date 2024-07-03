import { AccountInterface } from "../entity/account";

interface ProfileProps {
    account: AccountInterface;
}

export function ProfileComponent(props: ProfileProps) {
    const { account } = props;

    return (
        <>
            <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
                <div className="sm:flex xl:block sm:space-x-4 xl:space-x-0">
                    <img className="mb-2 w-20 h-20 rounded-2xl shadow-lg shadow-gray-300" src={account.profile.avatarUrl} alt={account.profile.fullName} />
                    <div>
                        <h2 className="text-xl font-bold">{account.profile.fullName}</h2>
                        <div className="flex items-center text-sm font-normal text-gray-500">
                            {account.profile.bio}
                        </div>
                    </div>
                </div>
                <div className="mb-4 sm:flex xl:block">
                    <div className="sm:flex-1">
                        <address className="text-sm not-italic font-normal text-gray-500">
                            <div className="mt-4">Username</div>
                            <div className="text-sm font-medium text-gray-900">{account.username}</div>
                            <div className="mt-4">Email adress</div>
                            <a className="text-sm font-medium text-gray-900" href={`mailto:${account.email}`}>{account.email}</a>
                        </address>
                    </div>
                </div>
            </div>
        </>
    )
}