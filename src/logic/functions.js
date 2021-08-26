import moment from 'moment'

export function getDaysToBookFromJson(data) {
    let holidays = data["england-and-wales"].events;
    let totalDays = [];
    let tempDays = [];

    const today = moment();

    holidays = holidays.filter(holiday =>
        moment(holiday.date).isSameOrAfter(today, 'day'));

    let temp = [ ...holidays ];
    let holidaysWithoutWeekends = [];

    for (let day of temp) {
        holidaysWithoutWeekends.push(day.date);
    }

    let saturdays = getAllWeekends(holidays, -1);
    let sundays = getAllWeekends(holidays, 0);

    for (const day of saturdays)
        holidays.push({ title: "Weekend", date: day });

    for (const day of sundays)
        holidays.push({ title: "Weekend", date: day });

    holidays.sort(compare)

    let titles = [];

    for (let i = 0; i < holidays.length; i++) {
        let holiday = holidays[i];
        let nextHoliday = holidays[i + 1];
        
        if (holiday.title != "Weekend")
            titles.push(holiday.title);

        if (daysTillNextHoliday(holiday, nextHoliday) < 5) {
            tempDays.push(holiday);
            tempDays.push(nextHoliday);
        }
        else {
            let start = tempDays[0].date;
            let end = tempDays[tempDays.length - 1].date;
            let daysOff = daysToBook(start, end, holidays);

            let allDates = [];
            let allDatesTemp = [];

            for (let day of tempDays) {
                if (!allDatesTemp.includes(day.date))
                    allDates.push({date: day.date, title: day.title});
                    allDatesTemp.push(day.date);
            }

            for (let day of daysOff) {
                if (!allDatesTemp.includes(day))
                    allDates.push({date: day, title: "Book"});
                    allDatesTemp.push(day);
            }
            allDates.sort(compare2);

            if (tempDays.length > 2 &&
                start != end) {
                let days = {
                    start: start,
                    end: end,
                    duration: daysBetweenAndIncluding(start, end),
                    daysOff: daysOff,
                    noOfDays: daysOff.length,
                    titles: titles,
                    allDates: allDates
                };

                totalDays.push(days);
            }
            tempDays = [];
            titles = [];
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

export function compare2(a, b) {
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