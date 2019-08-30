export class Attendance {

    frequency: Frequency | undefined;

    intervals!: Interval[];

    id() : number {
        let s = JSON.stringify(this);
        for(var i = 0, h = 0; i < s.length; i++)
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        return h;
    }
}
