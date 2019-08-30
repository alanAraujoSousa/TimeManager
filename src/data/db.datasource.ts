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
        .pipe(mapSync(function (data: Attendance) {

            console.error(data);
            
            attendances.push(data); 
            return data;
    }));

    return attendances;
};

export const get = (id: number): Attendance => {
    
    let attendance: Attendance = new Attendance;

    let transformStream = parse( "*" );
    var inputStream = createReadStream( "./db.json" )
        .pipe(transformStream)
        .pipe(mapSync(function (data: Attendance) {

            attendance = data;
            if (attendance.id() == id) {
                return data;
            }

            console.error(data);
            
             
            return data;
    }));

    return attendance;
};