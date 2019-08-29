
class Attendance {

    private _id: number | undefined;

    private _frequency: undefined | Weekly | Reserved;

    private _intervals: Interval[] = [];

    constructor(interval: Interval[]) {
        this._intervals = interval;
    }

    
    public get id() : number | undefined {
        return this._id;
    }
    
    
    public set id(v : number | undefined) {
        this._id = v;
    }
    

    public get intervals() {
        return this._intervals;
    }
}
