// import { UploadButton } from "@uploadthing/react";

// import type { OurFileRouter } from "~/server/uploadthing";
// // You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
// import "@uploadthing/react/styles.css";

// export default function UploadFile() {
//   return (
//     <section className="flex flex-row justify-end">
//       <UploadButton<OurFileRouter>
//         endpoint="imageUploader"
//         onClientUploadComplete={(res) => {
//           // Do something with the response
//           console.log("Files: ", res);
//           alert("Upload Completed");
//         }}
//         onUploadError={(error: Error) => {
//           // Do something with the error.
//           alert(`ERROR! ${error.message}`);
//         }}
//       />
//       <UploadButton<OurFileRouter>
//         endpoint="audioUploader"
//         onClientUploadComplete={(res) => {
//           // Do something with the response
//           console.log("Files: ", res);
//           alert("Upload Completed");
//         }}
//         onUploadError={(error: Error) => {
//           // Do something with the error.
//           alert(`ERROR! ${error.message}`);
//         }}
//       />
//     </section>
//   );
// }
