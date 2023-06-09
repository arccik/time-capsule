function addYears(years: number, date?: Date | undefined): Date {
  if (date === undefined) date = new Date();
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}
export { addYears };
