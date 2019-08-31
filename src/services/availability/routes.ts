import { Request, Response } from "express";
import { getAvailabilityByInterval } from "./availability.controller";
import { checkSearchIntervalParams } from "../../middleware/checkInterval";

export default [
  {
    path: "/api/v1/availability",
    method: "get",
    handler: [
      checkSearchIntervalParams,  
      async ({ query }: Request, res: Response) => {
        res.status(200).send(getAvailabilityByInterval(query.start, query.end));
      }
    ]
  }
];
