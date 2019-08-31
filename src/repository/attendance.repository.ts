import { Attendance } from "../models/attendance.model";
import { persist, list, find, update, destroy } from "../data/db.datasource";
import db from "../data/db.json"; 

export class AttendanceRepository {

    delete(id: number) {
        destroy(id);
    }

    save(attendance: Attendance) {
        persist(attendance);
    };

    list(): Attendance[] {
        return list();
    }

    get(id: number): Attendance | null {
        return find(id);
    }

    update(id: number, attendance: Attendance) {
        update(id, attendance);
    }
}
