export default function dateFormatter(time: Date): string {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  });
  return formatter.format(time);
}
