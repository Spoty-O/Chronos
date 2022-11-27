import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 1 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    return daysMatrix;
}

export function getWeek() {
    let index = 0;
    const week = new Array(7).fill(null).map(() => {
        index++;
        return dayjs().day(index).format("ddd").toUpperCase();
    });
    return week;
}
