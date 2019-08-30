class Reserved implements Frequency{
    
    day!: Date;

    containsIn(frequency: Frequency): boolean {
        throw new Error("Method not implemented.");
        return false;
    }

}