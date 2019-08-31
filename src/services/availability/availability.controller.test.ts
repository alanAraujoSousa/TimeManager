import * as controller from "./availability.controller";
import { Attendance } from "../../models/attendance.model";

describe("AvailabilityController", () => {
  test("from availability controller directly test list", () => {
    
    expect(controller.getAvailabilityByInterval("12-12-2019", "20-12-2019").length)
        .toBeGreaterThan(0);
  });
});
