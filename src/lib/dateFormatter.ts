export default function dateFormatter(time: Date): string {
  if (!time) return "Wrong time format";
  const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  });
  return formatter.format(new Date(time));
}
