export class Attendance {

    id: number | undefined;

    frequency: undefined | Weekly | Reserved;

    intervals: Interval[] = [];
}
