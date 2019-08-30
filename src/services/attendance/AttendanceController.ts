import { Request } from "express";
import { Attendance } from "../models/Attendance";

export const getAttendances = () => {
   return [];
};

export const createAttendance = (req: Request) => {
   let attendance = req.body as Attendance;
   console.log(attendance);

   let frequency = attendance.frequency;
   let intervals = attendance.intervals;



   if (typeof frequency == undefined) {
      // daily

   } else if (typeof frequency == "object") { // trocar pela checagem de tipo typescript Weekly ou Reserved
      if (frequency.day) {
         // reserved
         let day = frequency.day;
         
         console.log(day);
      } else {
         // weekly
         console.log()
      }
   }
};