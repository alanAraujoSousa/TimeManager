import { Frequency } from "./frequency.model";

export class Reserved implements Frequency{
    
    day!: string;

    containsIn(frequency: Frequency): boolean {
        throw new Error("Method not implemented.");
        return false;
    }

    getFrequency(): string | string[] {
        return this.day;
    }

}