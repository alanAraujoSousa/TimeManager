import { Attendance } from "../models/attendance.model";
import { persist } from "../data/db.datasource";

export class AttendanceRepository {

    save(attendance: Attendance) {
        persist(attendance);
    };

    list(): Attendance[] {
        return {} as Attendance[];
    }

    get(id: number): Attendance {
        return {} as Attendance;
    }

    update(id: number, attendance: Attendance) {
        
    }
}
