import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns";

// Type definitions for function parameters
export const getStartOfWeek = (date: Date): Date =>
  startOfWeek(startOfMonth(date), { weekStartsOn: 0 });

export const getEndOfWeek = (date: Date): Date =>
  endOfWeek(endOfMonth(date), { weekStartsOn: 0 });

export const getDaysInRange = (start: Date, end: Date): Date[] =>
  eachDayOfInterval({ start, end });
