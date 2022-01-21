import { Courses } from "./Course";
export declare class Lessons {
    id: string;
    name: string;
    sequence: string;
    duration: string;
    video: string;
    key: string;
    resource: string;
    course_id: string;
    course: Courses;
    created_at: Date;
    updated_at: Date;
    constructor();
}
