import * as Controller from "./AvailabilityController";

describe("AvailabilityController", () => {
  test("list all", () => {
    expect(Controller.getAttendances()).toEqual([]);
  });
});
