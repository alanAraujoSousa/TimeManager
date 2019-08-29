class Weekly {

    private _days: string[];

    constructor(days: string[]) {
        this._days = days;
    }

    public get days() {
        return this._days;
    }
}