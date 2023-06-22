import { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { GrClose } from "react-icons/gr";

export default function Recorder() {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    setAudioElement(audio);
  };

  const handleDelete = () => {
    setAudioElement(null);
  };

  return (
    <>
      <div className="flex flex-row justify-center">
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          // downloadOnSavePress={true}
          // downloadFileExtension="mp3"
          showVisualizer={true}
        />
      </div>
      {audioElement && (
        <div className="flex w-full flex-row justify-center">
          <audio controls src={audioElement.src} />
          <button className="btn-error btn-circle btn" onClick={handleDelete}>
            <GrClose />
          </button>
        </div>
      )}
    </>
  );
}

/*
  In case you'd like to update colors of the icons just follow the instruction here:
  https://github.com/samhirtarif/react-audio-recorder/issues/19#issuecomment-1420248073
*/
