import clsx from "clsx";
import { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { GrTrash, GrAdd } from "react-icons/gr";
import { IoCloudDone } from "react-icons/io5";
import { api } from "~/utils/api";

export default function Recorder() {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(true);
  const getUploaderURL = api.uploader.getUrl.useMutation();
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );
  const addAudioElement = (blob: Blob) => {
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    setAudioElement(audio);
    setAudioBlob(blob);
  };

  const handleAudioUpload = async (): Promise<void> => {
    if (!audioBlob) return;
    const fileName = (Math.random() + 1).toString(36).substring(7) + ".webm";
    const { url: uploadURL, fields } = await getUploaderURL.mutateAsync({
      fileName,
      fileType: "audio/webm",
    });
    const formData = new FormData();
    const file = new File([audioBlob], fileName);
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    const upload = await fetch(uploadURL, {
      method: "POST",
      body: formData,
    });
    if (upload.ok) {
      setUploadSuccess(true);
    }
  };
  const handleCancelClic = () => {
    setUploadSuccess(false);
  };
  if (uploadSuccess) {
    return (
      <div className="flex items-center justify-center">
        <div className="indicator">
          <span
            className="badge badge-error indicator-item cursor-pointer"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleCancelClic}
          >
            X
          </span>
          <IoCloudDone size={50} color="green" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={clsx({
          "flex flex-row justify-center": true,
          hidden: uploadSuccess,
          "loading-ring loading-lg loading": !uploadSuccess,
        })}
      >
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          // downloadOnSavePress={true}
          // downloadFileExtension="mp3"
          showVisualizer={true}
        />
      </div>
      {audioElement && (
        <>
          <div className="flex w-full flex-row items-center justify-center">
            <audio controls src={audioElement.src} />
            <div className="btn-group">
              <button
                type="button"
                className="btn-success btn-sm btn"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleAudioUpload}
              >
                <GrAdd className="mr-2" />
                Save
              </button>
              <button
                type="button"
                className="btn-error btn-sm btn"
                onClick={() => {
                  setAudioElement(null);
                  setUploadSuccess(false);
                }}
              >
                <GrTrash />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
