import { Attendance } from "../models/attendance.model";
import { persist } from "../data/db.datasource";

export class AttendanceRepository {

    save(attendance: Attendance): void {
        persist(attendance);
    };
}
