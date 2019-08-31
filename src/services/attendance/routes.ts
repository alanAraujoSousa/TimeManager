import { Request, Response } from "express";
import { getAttendances, createAttendance, deleteAttendance } from "./attendance.controller";
import { checkSearchIntervalParams } from "../../middleware/checkInterval";
import { Attendance } from "../../models/attendance.model";

export default [
  {
    path: "/api/v1/attendance",
    method: "get",
    handler: async (req : Request, res: Response) => {
       res.status(200).send();
    }
  },
  {
    path: "/api/v1/attendance",
    method: "post",
    handler: async (req : Request, res: Response) => {
       res.status(200).send(createAttendance(req.body as Attendance));
    }
  },
  {
    path: "/api/v1/attendance/:id",
    method: "delete",
    handler: async ({params} : Request, res: Response) => {
       res.status(200).send(deleteAttendance(parseInt(params['id'])));
    }
  }
];
