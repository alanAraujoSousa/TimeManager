import { createReadStream, createWriteStream, readFileSync, writeFileSync } from "fs"; 
import { mapSync } from "event-stream";
import { Attendance } from "../models/attendance.model";
import db from "../data/db.json"; 

const dbPath = "./dist/data/db.json"

export const persist = (attendance: Attendance): number => {

    let attendances = list();
    let data: any = attendance;

    let s = JSON.stringify(attendance);
    for(var i = 0, id = 0; i < s.length; i++)
        id = Math.imul(31, id) + s.charCodeAt(i) | 0;

    attendance.id = id;

    attendances.push(attendance);
    writeFileSync(dbPath, JSON.stringify(attendances));

    return id;
};

export const list = (): Attendance[] => {
    
    let attendances: Attendance[] = [];
    let data = readFileSync(dbPath);
    attendances = JSON.parse(data.toString());
    
    return attendances;
};

export const find = (id: number): Attendance | null => {
    
    list().filter((a) => {
        return a.id == id;
    });
    return null;
};

export const destroy = (id: number) => {
    let all = list();
    all.splice(all.findIndex((a) => a.id == id), 1);
    writeFileSync(dbPath, JSON.stringify(all));
}

export const update = (id: number, attendance: Attendance) => {
    
}