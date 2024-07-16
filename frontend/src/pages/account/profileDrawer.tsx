import { Button, Drawer, Textarea, TextInput } from "flowbite-react";
import { HiUser, HiSave } from 'react-icons/hi';
import { ProfileInterface } from "../../components/entity/account";

interface ProfileDrawerProps {
    profile?: ProfileInterface;
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}

export function ProfileDrawer(props: ProfileDrawerProps) {
    const { profile, isDrawerOpen, setIsDrawerOpen } = props;

    return (
        <>
            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} position="right">
                <Drawer.Header title="Edit Profile" titleIcon={HiUser} />
                <Drawer.Items>
                    <form action="#">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <TextInput type="text" id="name" value={profile?.fullName} placeholder="Type your full name" />
                            </div>
                            <div>
                                <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                                <Textarea id="bio" value={profile?.bio} placeholder="Write your bio" />
                            </div>
                        </div>
                        <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                            <Button type="button" outline color="blue" className="w-full justify-center inline-flex items-center">
                                <HiSave />
                                Update
                            </Button>
                        </div>
                    </form>
                </Drawer.Items>
            </Drawer>
        </>
    )
} 