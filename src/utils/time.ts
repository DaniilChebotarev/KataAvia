import { add } from 'date-fns';

export function getTimeFromMins(mins: number): string {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  if (hours.toString().split('').length === 1 && minutes.toString().split('').length === 1)
    return `0${hours}ч : 0${minutes} м`;
  if (minutes.toString().split('').length === 1) return `${hours}ч : 0${minutes}м`;
  return `${hours}ч : ${minutes}м`;
}

export function convertDate(time: string, duration: number): string {
  const timing = new Date(time);
  const res = [timing.getHours(), timing.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
  const res2 = add(new Date(time), {
    minutes: duration,
  });
  const end = [res2.getHours(), res2.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
  return `${res} - ${end}`;
}
