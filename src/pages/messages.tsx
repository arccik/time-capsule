import MessageGrid from "~/components/open-messages/MessageGrid";

export default function OpenCapsulesPage() {
  return (
    // <main className="animate-gradient-x bg-gradient-to-r from-green-500 from-10% via-sky-600 via-30% to-emerald-600 to-50% ">
    <main className="bg-[url('/images/bg-green-brown.png')] bg-cover bg-fixed bg-no-repeat">
      <div className="mx-auto lg:max-w-[2000px]">
        <MessageGrid />
      </div>
    </main>
  );
}
