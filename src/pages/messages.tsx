import MessageGrid from "~/components/open-capsule/MessageGrid";
import { type Capsule, PrismaClient } from "@prisma/client";

export default function OpenCapsulesPage() {
  return (
    <main className="animate-gradient-x bg-gradient-to-r from-green-700 from-10% via-sky-600 via-30% to-emerald-500 to-90%">
      <div className="mx-auto ">
        <MessageGrid />
      </div>
    </main>
  );
}
