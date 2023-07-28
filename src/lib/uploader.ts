// const handleAudioUpload = async () => {
//   if (!audioBlob) return;
//   const fileName = "test.mp3";
//   const { url: uploadURL, fields } = await getUploaderURL.mutateAsync({
//     fileName,
//     fileType: "audio/mp3",
//   });
//   const formData = new FormData();
//   const file = new File([audioBlob], fileName);
//   Object.entries({ ...fields, file }).forEach(([key, value]) => {
//     formData.append(key, value as string);
//   });
//   const upload = await fetch(uploadURL, {
//     method: "POST",
//     body: formData,
//   });
// };
