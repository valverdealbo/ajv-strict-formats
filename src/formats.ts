function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function date(str: string): boolean {
  const matches: string[] | null = DATE.exec(str);
  if (!matches) return false;
  const year: number = +matches[1];
  const month: number = +matches[2];
  const day: number = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
}

const TIME = /^(\d\d):(\d\d):(\d\d)$/;
const FULL_TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?Z$/;

export function time(str: string, regexp: RegExp = TIME): boolean {
  const matches: string[] | null = regexp.exec(str);
  if (!matches) return false;
  const hour = +matches[1];
  const minute = +matches[2];
  const second = +matches[3];
  return (hour <= 23 && minute <= 59 && second <= 59) || (hour === 23 && minute === 59 && second === 60);
}

const DATE_TIME_SEPARATOR = /T/;

export function datetime(str: string): boolean {
  const dateTime: string[] = str.split(DATE_TIME_SEPARATOR);
  return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], FULL_TIME);
}

const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/;

export function uuid(str: string): boolean {
  return UUID.exec(str) !== null;
}

export type FormatName = 'time' | 'date-time' | 'uuid';

export type Formats = { [K in FormatName]: (str: string) => boolean };

export const formats: Formats = {
  time,
  'date-time': datetime,
  uuid,
};

export const formatNames = Object.keys(formats) as FormatName[];
