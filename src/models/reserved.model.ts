class Reserved {

    private _date: Date;

    constructor(date: Date) {
        this._date = date;    
    }

    public set date(date: Date) {
        this._date = new Date();
    }

    public get date() {
        return this._date;
    }
}