import middleware from "../../middleware";
import express, { Router } from "express";
import request from "supertest";
import { applyMiddleware, applyRoutes } from "../../utils";
import promiseRequest from "request-promise";
import errorHandlers from "../../middleware/errorHandlers";
import routes from "../../services/attendance/routes";

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

   test("list all", async () => {
    const response = await request(router).get("/api/v1/attendance");
    expect(response.status).toEqual(200);
  });
});