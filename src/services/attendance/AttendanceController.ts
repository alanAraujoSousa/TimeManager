import { Request } from "express";
import { Attendance } from "../../models/attendance.model";
import { AttendanceRepository } from "../../repository/attendance.repository"
import { HTTP400Error } from "../../utils/httpErrors";

export const getAttendances = (): Attendance[] => {
   return [];
};

export const getHourAsDate = (hour: String): Date => {
   let hourSplit = hour.split(":");
   let hourMinute = Number.parseInt(hourSplit[0]);
   let hoursecond = Number.parseInt(hourSplit[1]);
   return new Date(2000, 1, 1, hourMinute, hoursecond, 0, 0);
}

export const intervalContainsAnother = (intervalRoot: Interval, intervalChild: Interval): boolean => {

   let startIntervalRoot = getHourAsDate(intervalRoot.start);
   let endIntervalRoot = getHourAsDate(intervalRoot.end);

   let startIntervalChild = getHourAsDate(intervalChild.start);
   let endIntervalChild = getHourAsDate(intervalChild.end);

   return ((startIntervalRoot.getTime() <= startIntervalChild.getTime() 
      && endIntervalRoot.getTime() >= startIntervalChild.getTime()) 
      || (startIntervalRoot.getTime() <= endIntervalChild.getTime() 
         && endIntervalRoot.getTime() >= endIntervalChild.getTime())) {
   }
}

export const someIntervalContainInAnothers = (intervalsRoot: Interval[], intervalsChild: Interval[]): boolean => {
   intervalsRoot.forEach((intervalRoot) => {
      intervalsChild.forEach((intervalChild) => {
         if (intervalContainsAnother(intervalRoot, intervalChild))
            return true;
      });
   });  
   return false;
}

export const createAttendance = (attendanceReceived: Attendance) => {

   let frequencyReceived = attendanceReceived.frequency;
   let intervalsReceived = attendanceReceived.intervals;

   let repo = new AttendanceRepository;
      
   let attendancesFromDB = repo.list();
   attendancesFromDB.forEach((a) => {

      let frequencyFromDB = a.frequency;
      let intervalsFromDB = a.intervals;
      
      if (!frequencyFromDB) { // daily frequency on DB

         if (someIntervalContainInAnothers(intervalsFromDB, intervalsReceived))
            throw new HTTP400Error("The attendance informed is not unique."); // error 400
      
      } else { // weekly or reserved

         if (frequencyFromDB instanceof Weekly) {

            if(!frequencyReceived) { // db: weekly I: daily

               if (someIntervalContainInAnothers(intervalsFromDB, intervalsReceived))
                  throw new HTTP400Error("The attendance informed is not unique."); 

            } else if (frequencyReceived instanceof Weekly) { // db: weekly I: weekly

               let daysReceived = frequencyReceived.days;
               let daysDB = frequencyFromDB.days;

               daysDB.forEach((dayDB) => {
                  daysReceived.forEach((dayReceived) => {
                     if (dayDB === dayReceived) {
                        if (someIntervalContainInAnothers(intervalsFromDB, intervalsReceived))
                           throw new HTTP400Error("The attendance informed is not unique."); 
                     }
                  });
               });
            } else { // db: weekly I: Reserved
               
            }
         } else { // db: reserved I: need to check

         }

         if (frequencyFromDB!.containsIn(frequencyReceived!)) {
            throw new HTTP400Error("The attendance informed is not unique."); // error 400
         }
      }      
   });   

   repo.save(attendanceReceived);
};