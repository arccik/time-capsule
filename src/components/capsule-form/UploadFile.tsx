import { env } from "~/env.mjs";
import { Capsule } from "~/types/capsule";
import { UseFormSetValue } from "react-hook-form";

export default function UploadFile({
  setValue,
}: {
  setValue: UseFormSetValue<Capsule>;
}) {
  const uploadPhoto = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0]!;
    const filename = encodeURIComponent(
      new Date().toDateString() + "-" + file.name
    );
    const fileType = encodeURIComponent(file.type);

    const res = await fetch(
      `/api/upload/url?file=${filename}&fileType=${fileType}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();

    if (!url || !fields) return;
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      setValue("image", env.NEXT_PUBLIC_AWS_S3_BACKET_URL + filename);
    } else {
      console.error("Upload failed.");
    }
  };
  return (
    <div className="flex flex-col">
      <h2 className="mb-4 text-xl font-bold text-white">
        Upload Memories in form of images
      </h2>
      <input
        type="file"
        onChange={uploadPhoto}
        accept="image/*"
        className="file-input-bordered file-input-primary file-input  drop-shadow-md"
      />
    </div>
  );
}
