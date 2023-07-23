import { api } from "~/utils/api";

const uploadPhotos = async (
  file: File | null
): Promise<boolean | undefined> => {
  if (!file) return;
  const getUrl = api.uploader.getUrl.useMutation();
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
  return upload.ok;
};
export default uploadPhotos;