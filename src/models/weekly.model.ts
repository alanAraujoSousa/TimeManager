import { Frequency } from "./frequency.model";

export class Weekly implements Frequency {
    
    days!: string[];

    containsIn(frequency: Frequency): boolean {
        throw new Error("Method not implemented.");
        return false;
    }

    getFrequency(): string | string[] {
        return this.days;
     }
}