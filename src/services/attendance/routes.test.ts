import middleware from "../../middleware";
import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import promiseRequest from "request-promise";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "../../services/attendance/routes";
import { Attendance } from "../../models/attendance.model";

jest.mock("request-promise");
(promiseRequest as any).mockImplementation(() => '{"features": []}');

describe("routes", () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
  });

    test("from rest interface list all attendances", async () => {
      const response = await request(router).get("/api/v1/attendance");
      expect(response.status).toEqual(200);
    });

    test("from rest interface create a attendance", async () => {

      let mock = new Attendance();
      mock.intervals = [{start:"00:00", end:"01:00"}];
      const response = await request(router).post("/api/v1/attendance").send(mock);

      expect(response.status).toEqual(200);
    });

    test("from rest interface delete a attendance", async () => {

      let mock = new Attendance();
      mock.intervals = [{start:"00:00", end:"01:00"}];
      const response1 = await request(router).post("/api/v1/attendance").send(mock);
      
      var id = response1.body;

      const response2 = await request(router).delete("/api/v1/attendance/" + id);
      expect(response2.status).toEqual(200);
    });

});