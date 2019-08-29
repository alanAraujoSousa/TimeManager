import { Request, Response } from "express";
import { getAttendances, createAttendance } from "./AvailabilityController";
import { checkSearchIntervalParams } from "../../middleware/checkInterval";

export default [
  {
    path: "/api/v1/attendance",
    method: "get",
    handler: async (req : Request, res: Response) => {
       res.status(200).send(getAttendances());
    }
  },
  {
    path: "/api/v1/attendance",
    method: "post",
    handler: async (req : Request, res: Response) => {
       res.status(200).send(createAttendance(req));
    }
  },

];
