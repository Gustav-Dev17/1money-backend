export declare enum UserType {
    ADMIN = "A",
    USER = "U"
}
export declare class Users {
    id: string;
    role: UserType;
    name: string;
    email: string;
    password: string;
    picture: string;
    key: string;
    created_at: Date;
    updated_at: Date;
    constructor();
    setPassword(password: string): Promise<void>;
}
