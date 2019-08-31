import middleware from "../../middleware";
import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import promiseRequest from "request-promise";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "../../services/attendance/routes";

jest.mock("request-promise");
(promiseRequest as any).mockImplementation(() => '{"features": []}');

describe("route-availability", () => {
  let router: Router;

  beforeEach(() => {
    router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);
  });

    test("from rest interface list all available slots of time", async () => {
      const response = await request(router).get("/api/v1/availability?start=12:00&end=13:00");
      expect(response.status).toEqual(200);
    });
});