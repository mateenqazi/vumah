import classnames from 'classnames';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  addDays
} from 'date-fns';

export function generateStyles(sources) {
  if (!sources.length) return {};
  const generatedStyles = sources
    .filter((source) => Boolean(source))
    .reduce((styles, styleSource) => {
      Object.keys(styleSource).forEach((key) => {
        styles[key] = classnames(styles[key], styleSource[key]);
      });
      return styles;
    }, {});
  return generatedStyles;
}

export function findNextRangeIndex(ranges, currentRangeIndex = -1) {
  const nextIndex = ranges.findIndex(
    (range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled
  );
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex((range) => range.autoFocus !== false && !range.disabled);
}

export function getMonthDisplayRange(date, dateOptions, fixedHeight) {
  const startDateOfMonth = startOfMonth(date, dateOptions);
  const endDateOfMonth = endOfMonth(date, dateOptions);
  const startDateOfCalendar = startOfWeek(startDateOfMonth, dateOptions);
  let endDateOfCalendar = endOfWeek(endDateOfMonth, dateOptions);
  if (fixedHeight && differenceInCalendarDays(endDateOfCalendar, startDateOfCalendar) <= 34) {
    endDateOfCalendar = addDays(endDateOfCalendar, 7);
  }
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth,
    endDateOfMonth
  };
}
