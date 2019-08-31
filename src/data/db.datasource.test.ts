import * as datasource from "./db.datasource";
import { Attendance } from "../models/attendance.model";

describe("Datasource", () => {
  
  test("create a attendance on database", () => {
    let mock = new Attendance();
    mock.intervals = [
      {"start": "00:00", "end": "01:00"}
    ];
    datasource.persist(mock);

    let rs = datasource.find(mock.id!);
    expect(rs).not.toBeNull();
  });

});
