import { Courses } from "./Course";
import { Actions } from "./Action";
export declare class Item {
    id: string;
    action_id: string;
    course_id: string;
    total_price: number;
    discount: number;
    action: Actions;
    course: Courses;
    constructor();
}
