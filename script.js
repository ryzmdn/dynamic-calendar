"use strict";

const year = new Date().getFullYear();
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const container = document.getElementById("container");

function generateMonthCalendar(year, month) {
  const firstMonthDate = new Date(year, month, 1);
  const firstWeekDay = (firstMonthDate.getDay() + 6) % 7;
  const today = new Date();

  const calendar = document.createElement("section");
  calendar.className = "calendar";
  calendar.ariaLabel = `${monthNames[month]} calendar`;

  const calendarHeader = document.createElement("div");
  calendarHeader.className = "calendar-header";
  const calendarTitle = document.createElement("h2");
  calendarTitle.className = "calendar-title";
  calendarTitle.textContent = `${monthNames[month]} ${year}`;
  const calendarSubtitle = document.createElement("p");
  calendarSubtitle.className = "calendar-subtitle";
  calendarSubtitle.textContent = `${monthNames[month]} is the #${month + 1} month of the year ${year}.`
  calendarHeader.append(calendarTitle, calendarSubtitle);
  calendar.append(calendarHeader);

  const calendarDays = document.createElement("div");
  calendarDays.className = "calendar-days";
  ["M", "T", "W", "T", "F", "S", "S"].forEach(day => {
    const calendarDayText = document.createElement("div");
    calendarDayText.textContent = day;
    calendarDays.append(calendarDayText);
  });
  calendar.append(calendarDays);

  const calendarBody = document.createElement("div");
  calendarBody.className = "calendar-body";

  let date = new Date(firstMonthDate);
  date.setDate(date.getDate() - firstWeekDay);

  for (let index = 0; index < 42; index++) {
    const calendarDate = document.createElement("div");
    calendarDate.className = "calendar-date";
    const calendarInner = document.createElement("div");
    const calendarTime = document.createElement("time");
    
    calendarTime.setAttribute("datetime", date.toISOString().split('T')[0]);
    calendarTime.textContent = date.getDate();

    if (date.getMonth() !== month) {
      calendarInner.className = "calendar-date-readonly";
    } else if (date.toDateString() === today.toDateString()) {
      calendarInner.className = "calendar-date-now";
    } else {
      calendarInner.className = "calendar-date-active";
    }

    calendarInner.append(calendarTime);
    calendarDate.append(calendarInner);
    calendarBody.append(calendarDate);

    date.setDate(date.getDate() + 1);
  }

  calendar.append(calendarBody);
  return calendar;
}

function generateFullYearCalendar() {
  const calendarContainer = document.createElement("div");
  calendarContainer.className = "calendars-container";
  
  for (let month = 0; month < 12; month++) {
    const monthCalendar = generateMonthCalendar(year, month);
    calendarContainer.append(monthCalendar);
  }

  container.append(calendarContainer);
}

generateFullYearCalendar();