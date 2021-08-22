import moment from 'moment'

export function getDaysToBookFromJson(data) {
    let english = data["england-and-wales"].events;
    let totalDays = [];
    let tempDays = [];

    const today = moment();

    english = english.filter(holiday =>
        moment(holiday.date).isSameOrAfter(today, 'day'));

    let saturdays = getAllWeekends(english, -1);
    let sundays = getAllWeekends(english, 0);

    for (const day of saturdays)
        english.push({ title: "Weekend", date: day });

    for (const day of sundays)
        english.push({ title: "Weekend", date: day });

    english.sort(compare)

    for (let i = 0; i < english.length; i++) {
        let holiday = english[i];
        let nextHoliday = english[i + 1];

        if (daysTillNextHoliday(holiday, nextHoliday) < 5) {
            tempDays.push(holiday);
            tempDays.push(nextHoliday);
        }
        else {
            let startDate = tempDays[0].date;
            let endDate = tempDays[tempDays.length - 1].date;
            let daysOff = daysToBook(startDate, endDate, english);

            if (tempDays.length > 2 &&
                startDate != endDate) {
                let days = {
                    startDate: startDate,
                    endDate: endDate,
                    duration: daysBetweenAndIncluding(startDate, endDate),
                    daysOff: daysOff,
                    noOfDays: daysOff.length
                };

                totalDays.push(days);
            }
            tempDays = [];
        }
    }

    return totalDays;
}

export function daysTillNextHoliday(event, nextEvent) {
    let x = new moment(event.date);
    let y = nextEvent != null ? new moment(nextEvent.date) : new moment(event.date);

    let noOfDaysUntilWeekend = 5 - moment(event.date).day();
    let noOfDaysUntilNextEvent = y.diff(x, 'day');

    if (noOfDaysUntilNextEvent == 0)
        return noOfDaysUntilWeekend;
    else if (noOfDaysUntilNextEvent <= noOfDaysUntilWeekend)
        return noOfDaysUntilNextEvent;
    else
        return noOfDaysUntilWeekend;
}

export function daysBetweenAndIncluding(startDate, endDate) {
    return moment(endDate).diff(moment(startDate), 'day') + 1
}

export function datesBetweenAndIncluding(startDate, endDate) {
    let days = [];

    for (let i = 0; i < moment(endDate).diff(moment(startDate), 'day'); i++) {
        let date = moment(new moment(startDate).add(i, 'day')).format('YYYY-MM-DD');
        days.push(date);
    }

    return days;
}

export function daysToBook(startDate, endDate, holidays) {
    let allDays = datesBetweenAndIncluding(startDate, endDate);
    let holidayDates = holidays.map(holiday => holiday.date);

    let daysOff = allDays.filter(date => {
        return !holidayDates.includes(date);
    })

    return daysOff;
}

export function getAllWeekends(holidays, day) {
    let start = moment();
    let end = moment(holidays[holidays.length - 1].date);

    var arr = [];

    let tmp = start.clone().day(day);
    if (tmp.isAfter(start, 'd')) {
        arr.push(tmp.format('YYYY-MM-DD'));
    }
    while (tmp.isBefore(end)) {
        tmp.add(7, 'days');
        arr.push(tmp.format('YYYY-MM-DD'));
    }

    return arr;
}

export function compare(a, b) {
    const dateA = a.date.toUpperCase();
    const dateB = b.date.toUpperCase();

    let comparison = 0;
    if (dateA > dateB) {
        comparison = 1;
    } else if (dateA < dateB) {
        comparison = -1;
    }
    return comparison;
}