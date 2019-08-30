import { Request } from "express";
import { Attendance } from "../../models/attendance.model";

export const getAttendances = () => {
   return [];
};

export const createAttendance = (req: Request) => {

   let attendance = req.body as Attendance;
   console.log(attendance);

   let frequency = attendance.frequency as Frequency;

   let mock = {
      "intervals": [
        {
          "start": "00:00",
          "end": "00:00"
        }
      ]
    };

   // daily
   if (typeof frequency == undefined) {

      
      
   } else { 
      frequency.doAlgorithm();
   }
};