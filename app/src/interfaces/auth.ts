
export interface AuthRepositoryInterface {
    requestResetPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}