import { createReadStream, createWriteStream } from "fs"; 
import { parse, stringify } from "jsonstream";
import { mapSync } from "event-stream";
import { Attendance } from "../models/attendance.model";


export const persist = (data: any) => {
    
    data['id'] = data.id();
    JSON.stringify(data);

    var transformStream = stringify();
    var outputStream = createWriteStream("./db.json" );
};

export const list = (): Attendance[] => {
    
    let attendances: Attendance[] = [];

    let transformStream = parse( "*" );
    var inputStream = createReadStream( "./db.json" )
        .pipe(transformStream)
        .pipe(mapSync(function (data: any) {

            console.error(data);
            
            attendances.push(data); 
            return data;
    }));

    return attendances;
};
