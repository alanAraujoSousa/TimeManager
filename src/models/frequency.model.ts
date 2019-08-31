export interface Frequency {
    
    getFrequency(): string | Array<string>;
    containsIn(frequency: Frequency): boolean;
}