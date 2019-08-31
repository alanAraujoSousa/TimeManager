import moment from "moment";
import { Availability } from "../../models/availability.model";
import { AttendanceRepository } from "../../repository/attendance.repository";

export const getAvailabilityByInterval = (start: string, end: string): Availability[] => {
    
    let availabilities: Availability[] = [];
    let allAttendances = new AttendanceRepository().list();

    var startDate = moment(start, "DD-MM-YYYY");
    var endDate = moment(end, "DD-MM-YYY");
    
    //Difference in number of days
    var days = moment.duration(startDate.diff(endDate)).asDays();

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
                allIntervalsFromDB.concat(intervalsFromDB);
            } else if (frequencyFromDB instanceof Weekly) {
                
                let daysDB = frequencyFromDB.days;

                for (let i = 0; i < daysDB.length; i++) {
                    const dayDB = daysDB[i];
                    if (moment().day(dayDB).weekday() == newDay.weekday()) {
                        allIntervalsFromDB.concat(intervalsFromDB); 
                        break;
                    }   
                }
            } else { 
                let dateDayFromDB = (frequencyFromDB as Reserved).day;
                if (dateDayFromDB === newDay.format("")) {
                    allIntervalsFromDB.concat(intervalsFromDB); 
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

        allIntervalsFromDB.forEach((intervalFromDB) => {

            let startOfInterval = intervalFromDB.start;

            let timeFromDB = moment(newDay)
                .hours(parseInt(startOfInterval.split(":")[0]))
                .minutes(parseInt(startOfInterval.split(":")[1]));

            if (newDay.isBefore(timeFromDB)) {
                let interval = new Interval();

                interval.start = newDay.format("HH:mm");
                interval.end = startOfInterval;
                freeIntervals.push(interval);
            }

            let end = intervalFromDB.end;

        });

        availabilities.push(availability);
    }

    return availabilities;

};