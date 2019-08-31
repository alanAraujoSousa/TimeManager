import * as controller from "./attendance.controller";
import { Attendance } from "../../models/attendance.model";

describe("AttendanceController", () => {
  test("from controller directly test list all", () => {

    let mock = new Attendance();
    mock.intervals = [{start:"00:00", end:"01:00"}];
    
    controller.createAttendance(mock);
    expect(controller.getAttendances().length).toBeGreaterThan(0);
  });
});
