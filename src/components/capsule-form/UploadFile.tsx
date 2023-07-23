import { env } from "~/env.mjs";
import type { FormProps } from "~/types/formProps";
import { api } from "~/utils/api";
import Card from "../layout/Card";
import { useState } from "react";
import Image from "next/image";

export default function UploadFile({
  setValue,
}: // unregister,
Pick<FormProps, "setValue" | "unregister">) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const getUrl = api.uploader.getUrl.useMutation();
  const uploadPhoto = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { url, fields } = await getUrl.mutateAsync({
      fileName: file.name,
      fileType: file.type,
    });
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      setValue("image", env.NEXT_PUBLIC_AWS_S3_BACKET_URL + file.name);
      setFile(file);
    } else {
      setFile(null);
      console.error("Upload failed.");
    }
  };

  return (
    <Card
      title="Upload Photo"
      subtitle="Upload your photo here."
      actions={
        <input
          type="checkbox"
          className="toggle-success toggle"
          onChange={() => {
            setFile(null);
            setShow((prev) => !prev);
            // unregister("image");
          }}
          checked={show}
        />
      }
    >
      {file ? (
        <div className="indicator">
          <span
            className="badge-error badge indicator-item cursor-pointer"
            onClick={() => {
              setFile(null);
              // unregister("image");
            }}
          >
            X
          </span>
          <Image
            className="rounded-lg"
            width={200}
            height={200}
            src={URL.createObjectURL(file)}
            alt="uploading image"
          />
        </div>
      ) : (
        show && (
          <div className="flex items-center justify-between">
            <input
              type="file"
              onChange={void uploadPhoto}
              accept="image/* video/*"
              className="file-input-bordered file-input-primary file-input w-full drop-shadow-md"
            />
          </div>
        )
      )}
    </Card>
  );
}