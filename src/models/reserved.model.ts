class Reserved implements Frequency{
    
    day!: string;

    containsIn(frequency: Frequency): boolean {
        throw new Error("Method not implemented.");
        return false;
    }

}