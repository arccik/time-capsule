// import { createClient } from "@supabase/supabase-js";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { env } from "~/env.mjs";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const supabase = createClient(
//       env.SUPABASE_STORAGE_URL,
//       env.SUPABASE_SERVICE_KEY
//     );
//     if (req.method === "GET") {
//       const { data, error } = await supabase.storage
//         .from("time-capsule-files")
//         .list();

//       console.log("SUPERBASE : ", { data, error });
//       return res.json({ data, error });
//     }
//     if (req.method === "POST") {
//       const { name, file } = req.body;
//       if (!name || !file) {
//         return res.status(400).json({ error: "Missing name or file" });
//       }
//       const { data, error } = await supabase.storage
//         .from("time-capsule-files")
//         .upload(name, file);

//       console.log("SUPERBASE POST : >> ", { data, error });
//       return res.json({ data, error });
//     }
//   } catch (error) {
//     console.log("ERROR : ", error);
//     return res.status(500).json({ error });
//   }
// }
