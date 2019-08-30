class Weekly implements Frequency{
    
    days!: string[];

    containsIn(frequency: Frequency): boolean {
        throw new Error("Method not implemented.");
        return false;
    }
}