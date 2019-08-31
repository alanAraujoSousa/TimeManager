import { Request } from "express";
import { Attendance } from "../../models/attendance.model";
import { Weekly } from "../../models/weekly.model";
import { Reserved } from "../../models/reserved.model";
import { AttendanceRepository } from "../../repository/attendance.repository"
import { HTTP400Error } from "../../utils/httpErrors";
import moment from "moment";
import { Interval } from "../../models/interval.model";


export const deleteAttendance = (id: number) => {
   let repo = new AttendanceRepository();
   repo.delete(id);
}

export const getAttendances = (): Attendance[] => {
   let repo = new AttendanceRepository();
   return repo.list();
};

export const createAttendance = (attendanceReceived: Attendance): number => {

   let frequencyReceived = attendanceReceived.frequency;
   let intervalsReceived = attendanceReceived.intervals;

   let repo = new AttendanceRepository;
      
   let attendancesFromDB = repo.list();
   for (let i = 0; i < attendancesFromDB.length; i++) {
      const a = attendancesFromDB[i];
      
      let frequencyFromDB = a.frequency;
      let intervalsFromDB = a.intervals;
      
      if (!frequencyFromDB) { // daily frequency on DB, no need to check the received
         someIntervalContainInAnothers(intervalsFromDB, intervalsReceived); // error 400
      } else { // weekly or reserved I have necessity to check the received

         if ((frequencyFromDB as Weekly).days) { // db: weekly I: need to check

            if(!frequencyReceived) { // db: weekly I: daily
               someIntervalContainInAnothers(intervalsFromDB, intervalsReceived);
            } else if ((frequencyReceived as Weekly).days) { // db: weekly I: weekly

               let daysDB = (frequencyFromDB as Weekly).days;

               (frequencyReceived as Weekly).days.forEach((dayReceived) => {
                  daysDB.forEach((dayDB) => {
                     if (moment().day(dayDB).weekday() == moment().day(dayReceived).weekday()) {
                        someIntervalContainInAnothers(intervalsFromDB, intervalsReceived);
                     }
                  });
               });
            } else { // db: weekly I: Reserved

               let dateDayReceived = (frequencyReceived as Reserved).day;

               (frequencyFromDB as Weekly).days.forEach((dayDB) => {
                  if (moment().day(dayDB).weekday() == moment(dateDayReceived, "DD-MM-YYYY").weekday()) {
                     someIntervalContainInAnothers(intervalsFromDB, intervalsReceived);
                  }
               });
            }
         } else { // db: reserved I: need to check

            if(!frequencyReceived) { // db: Reserved I: daily
               someIntervalContainInAnothers(intervalsFromDB, intervalsReceived);
            } else if ((frequencyReceived as Weekly).days) { // db: Reserved I: weekly

               let dateDayFromDB = (frequencyFromDB as Reserved).day;

               (frequencyReceived as Weekly).days.forEach((dayDB) => {
                  if (moment().day(dayDB).weekday() == moment(dateDayFromDB, "DD-MM-YYYY").weekday()) {
                     someIntervalContainInAnothers(intervalsFromDB, intervalsReceived);
                  }
               });

            } else { // db: Reserved I: Reserved

               let dateDayFromDB = (frequencyFromDB as Reserved).day;
               let dateDayReceived = (frequencyReceived as Reserved).day;
               
               if (dateDayFromDB === dateDayReceived) {
                  someIntervalContainInAnothers(intervalsFromDB, intervalsReceived);
               }
            }
         }
      }      
   }

   return repo.save(attendanceReceived);
};

const getHourAsDate = (hour: String): Date => {
   let hourSplit = hour.split(":");
   let hourMinute = Number.parseInt(hourSplit[0]);
   let hoursecond = Number.parseInt(hourSplit[1]);
   return new Date(2000, 1, 1, hourMinute, hoursecond, 0, 0);
}

const intervalContainsAnother = (intervalRoot: Interval, intervalChild: Interval): boolean => {

   let startIntervalRoot = getHourAsDate(intervalRoot.start);
   let endIntervalRoot = getHourAsDate(intervalRoot.end);

   let startIntervalChild = getHourAsDate(intervalChild.start);
   let endIntervalChild = getHourAsDate(intervalChild.end);

   return ((startIntervalRoot.getTime() <= startIntervalChild.getTime() 
      && endIntervalRoot.getTime() >= startIntervalChild.getTime()) 
      || (startIntervalRoot.getTime() <= endIntervalChild.getTime() 
         && endIntervalRoot.getTime() >= endIntervalChild.getTime()));
}

const someIntervalContainInAnothers = (intervalsRoot: Interval[], intervalsChild: Interval[]) => {
   intervalsRoot.forEach((intervalRoot) => {
      intervalsChild.forEach((intervalChild) => {
         if (intervalContainsAnother(intervalRoot, intervalChild))
            throw new HTTP400Error("The attendance informed is not unique.");
      });
   });  
}