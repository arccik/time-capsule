import MessageGrid from "~/components/open-capsule/MessageGrid";
import { type Capsule, PrismaClient } from "@prisma/client";

export default function OpenCapsulesPage({
  data,
  totalPages,
}: {
  data: Capsule[];
  totalPages: number;
}) {
  return (
    <main className="animate-gradient-x bg-gradient-to-r from-green-700 from-10% via-sky-600 via-30% to-emerald-500 to-90%">
      <div className="mx-auto ">
        <MessageGrid data={data} totalPages={totalPages} />
      </div>
    </main>
  );
}

export const getServerSideProps = async ({
  query,
}: {
  query: { page?: number };
}) => {
  const { page = 1 } = query;
  const where = {
    public: true,
    opened: true,
  };
  const prisma = new PrismaClient();
  const openMsg = await prisma.capsule.findMany({
    skip: 12 * (page - 1),
    take: 12,
    where,
    orderBy: { dateTime: "desc" },
    include: {
      user: true,
      likes: true,
      comments: true,
    },
  });
  const totalMessages = await prisma.capsule.count({ where });
  const totalPages = Math.floor(totalMessages / 12 + 1);
  const data = openMsg?.map<Capsule[]>(
    (item) => JSON.parse(JSON.stringify(item)) as Capsule[]
  );
  return { props: { data, totalPages } };
};