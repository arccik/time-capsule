import MessageGrid from "~/components/open-messages/MessageGrid";

export default function OpenCapsulesPage() {
  return (
    <main className="animate-gradient-x bg-gradient-to-r from-green-500 from-10% via-sky-500 via-30% to-emerald-500 to-50% dark:from-slate-800 dark:to-slate-950">
      <div className="mx-auto ">
        <MessageGrid />
      </div>
    </main>
  );
}
