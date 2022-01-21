import { Users } from "./User";
export declare enum ActionSituation {
    CO = "CO",
    CA = "CA",
    FA = "FA"
}
export declare class Actions {
    id: string;
    payment: string;
    situation: ActionSituation;
    discount: number;
    total_price: number;
    final_price: number;
    bought_at: Date;
    user_id: string;
    user: Users;
    constructor();
}
