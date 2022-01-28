import { Users } from "./User";
export declare class Cards {
    id: string;
    name: string;
    cpf: string;
    number: string;
    exp_month: string;
    exp_year: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
    user: Users;
    constructor();
}
