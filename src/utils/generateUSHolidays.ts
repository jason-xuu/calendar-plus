// frontend/src/utils/generateUSHolidays.ts

function getNthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): Date {
    const firstDay = new Date(year, month, 1);
    let dayOffset = (weekday - firstDay.getDay() + 7) % 7;
    const date = 1 + dayOffset + (n - 1) * 7;
    return new Date(year, month, date);
  }
  
  function getLastMondayOfMay(year: number): Date {
    const date = new Date(year, 4, 31); // May 31
    while (date.getDay() !== 1) {
      date.setDate(date.getDate() - 1);
    }
    return date;
  }
  
  function getSecondMondayOfOctober(year: number): Date {
    return getNthWeekdayOfMonth(year, 9, 1, 2); // October (9), Monday (1), 2nd
  }
  
  function isInaugurationYear(year: number): boolean {
    return (year - 2021) % 4 === 0;
  }
  
  export function generateUSHolidays(year: number) {
    const holidays = [
      { title: "New Year's Day", date: `${year}-01-01` },
      { title: "Martin Luther King Jr. Day", date: getNthWeekdayOfMonth(year, 0, 1, 3).toISOString().split('T')[0] }, // 3rd Monday of Jan
    ];
  
    // Inauguration Day — only on inauguration years
    if (isInaugurationYear(year)) {
      holidays.push({
        title: "Inauguration Day",
        date: `${year}-01-20`
      });
    }
  
    holidays.push(
      { title: "Washington's Birthday (Presidents Day)", date: getNthWeekdayOfMonth(year, 1, 1, 3).toISOString().split('T')[0] }, // 3rd Monday of Feb
      { title: "Memorial Day", date: getLastMondayOfMay(year).toISOString().split('T')[0] },
      { title: "Juneteenth National Independence Day", date: `${year}-06-19` },
      { title: "Independence Day", date: `${year}-07-04` },
      { title: "Labor Day", date: getNthWeekdayOfMonth(year, 8, 1, 1).toISOString().split('T')[0] }, // 1st Monday of Sept
      { title: "Columbus Day", date: getSecondMondayOfOctober(year).toISOString().split('T')[0] }, // 2nd Monday of Oct
      { title: "Veterans Day", date: `${year}-11-11` },
      { title: "Thanksgiving Day", date: getNthWeekdayOfMonth(year, 10, 4, 4).toISOString().split('T')[0] }, // 4th Thursday of Nov
      { title: "Christmas Day", date: `${year}-12-25` }
    );
  
    return holidays;
  }
  