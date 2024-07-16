export interface AccountInterface {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    profile: ProfileInterface;
}

export interface AccountSessionInterface {
    id: string;
    username: string;
    fullName: string;
    email: string;
}

export interface ProfileInterface {
    id: string;
    fullName: string;
    bio: string;
    avatarUrl:string;
    created_at: Date;
    updated_at: Date;
}