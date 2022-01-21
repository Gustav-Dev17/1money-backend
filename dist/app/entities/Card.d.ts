import { Users } from "./User";
export declare class Cards {
    id: string;
    name: string;
    cpf: string;
    number: string;
    exp_month: string;
    exp_year: string;
    security_cod: string;
    created_at: Date;
    updated_at: Date;
    user: Users;
    constructor();
    setSecurityCod(security_cod: string): Promise<void>;
}
