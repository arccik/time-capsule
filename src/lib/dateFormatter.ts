export default function dateFormatter(time: Date): string {
  if (!time) return "Wrong time format";


  console.log("Date formatter : ", time);
  const formatter = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  });
  return formatter.format(new Date(time));
}
