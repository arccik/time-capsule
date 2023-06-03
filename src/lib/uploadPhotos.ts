import { createClient } from "@supabase/supabase-js";
import { env } from "~/env.mjs";

const supabase = createClient(
  env.SUPABASE_STORAGE_URL || "",
  env.SUPABASE_SERVICE_KEY || ""
);

export default async function uploadImage(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0]!;
  const { data, error } = await supabase.storage
    .from("time-capsule-files")
    .list();

  // .getBucket("time-capsule-files");

  console.log("SUPABASE STORAGE :))) ", data, error);
}
