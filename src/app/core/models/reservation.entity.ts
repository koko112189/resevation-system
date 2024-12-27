import { Space } from "./space.entity";
import { User } from "./user.entity";

export interface Reservation {
    id: string;
    user:User;
    space: Space;
    startDateTime: string;
    endDateTime: string;
}