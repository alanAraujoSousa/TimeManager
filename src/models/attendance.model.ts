import { Frequency } from "./frequency.model";
import { Interval } from "./interval.model";

export class Attendance {

    id: number | undefined;

    frequency: Frequency | undefined;

    intervals!: Interval[];
}
