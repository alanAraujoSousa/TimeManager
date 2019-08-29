class Interval {

    private _start: string = "00:00";

    private _end: string = "00:00";

    constructor(start: string, end: string) {
        start = start;
        end = end;
    }   

    public get end(): string {
        return this._end;
    }

    public set end(value: string) {
        // validate string
        this._end = value;
    }

    public get start(): string {
        return this._start;
    }

    public set start(value: string) {
        // validate string
        this._start = value;
    }
}