import moment from "moment";
import { Availability } from "../../models/availability.model";
import { AttendanceRepository } from "../../repository/attendance.repository";
import { Interval } from "../../models/interval.model";
import { Weekly } from "../../models/weekly.model";
import { Reserved } from "../../models/reserved.model";

export const getAvailabilityByInterval = (start: string, end: string): Availability[] => {
    
    let availabilities: Availability[] = [];
    let allAttendances = new AttendanceRepository().list();

    var startDate = moment(start, "DD-MM-YYYY");
    var endDate = moment(end, "DD-MM-YYYY");
    
    //Difference in number of days
    var days = moment.duration(endDate.diff(startDate)).asDays();

    for (let i = 0; i <= days; i++) {

        let availability = new Availability();
        let freeIntervals: Interval[] = [];

        let newDay = startDate.add(i, "days").startOf("day");
        availability.day = newDay.format("DD-MM-YYYY");
        
        let allIntervalsFromDB: Interval[] = [];

        allAttendances.forEach((a) => {
            
            let frequencyFromDB = a.frequency;
            let intervalsFromDB = a.intervals;

            if (!frequencyFromDB) { // daily
                allIntervalsFromDB = allIntervalsFromDB.concat(intervalsFromDB);
            } else if ((frequencyFromDB as Weekly).days) {
                
                let daysDB = (frequencyFromDB as Weekly).days;

                for (let i = 0; i < daysDB.length; i++) {
                    const dayDB = daysDB[i];
                    if (moment().day(dayDB).weekday() == newDay.weekday()) {
                        allIntervalsFromDB = allIntervalsFromDB.concat(intervalsFromDB); 
                        break;
                    }   
                }
            } else { 
                let dateDayFromDB = (frequencyFromDB as Reserved).day;
                if (dateDayFromDB === newDay.format("DD-MM-YYYY")) {
                    allIntervalsFromDB = allIntervalsFromDB.concat(intervalsFromDB); 
                }
            }              
        });

        // Sort allIntervalsFromDB
        let min = moment(); 
        let maj = moment();
        allIntervalsFromDB.sort((minor, major) => { 

            let minorStart = minor.start;
            let majorStart = major.start;

            min.hours(parseInt(minorStart.split(":")[0]))
            .minutes(parseInt(minorStart.split(":")[1]));

            maj.hours(parseInt(majorStart.split(":")[0]))
            .minutes(parseInt(majorStart.split(":")[1]));

            if (min.isBefore(maj)) {
                return -1;
            } else {
                return +1;
            }
        });

        for (let i = 0; i < allIntervalsFromDB.length; i++) {

            const intervalFromDB = allIntervalsFromDB[i];
            let startOfInterval = intervalFromDB.start;

            let startTimeFromDB = moment(newDay)
                .hours(parseInt(startOfInterval.split(":")[0]))
                .minutes(parseInt(startOfInterval.split(":")[1]));

            if (newDay.isBefore(startTimeFromDB)) {
               
                let interval = new Interval();
                interval.start = newDay.format("HH:mm");
                interval.end = startOfInterval;
               
                freeIntervals.push(interval);
            }

            let endOfInterval = intervalFromDB.end;
            newDay.hours(parseInt(endOfInterval.split(":")[0]))
                .minutes(parseInt(endOfInterval.split(":")[1]) + 1); // +1 para os intervalos não se chocarem

            // se não existirem intervalos para processar coloca a hora do fim do dia.
            if (i == allIntervalsFromDB.length - 1) {
                let interval = new Interval();
                interval.start = newDay.format("HH:mm");
                interval.end = newDay.endOf("day").format("HH:mm");
               
                freeIntervals.push(interval);
            }
        }
        availability.intervals = freeIntervals;
        availabilities.push(availability);
    }

    return availabilities;

};