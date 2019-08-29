import * as Controller from "./AttendanceController";

describe("AttendanceController", () => {
  test("from controller directly test list all", () => {
    expect(Controller.getAttendances()).toEqual([]);
  });
});
