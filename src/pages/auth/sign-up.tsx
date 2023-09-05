// import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { z } from "zod";
// import Input from "~/components/auth/Input";

// const schema = z.object({
//   email: z.string().min(1, { message: "Email is required" }),
//   name: z.string().min(1, { message: "Name is required" }),
// });
// type Inputs = z.infer<typeof schema>;

// export default function SignUpPage() {
//   const [redirectUrl, setRedirectUrl] = useState<string>("/dashboard");
//   const { status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (router.query.callbackUrl) {
//       setRedirectUrl(router.query.callbackUrl as string);
//     }
//   }, [router.query.callbackUrl]);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(schema),
//   });
//   const onSubmit: SubmitHandler<Inputs> = async (data): Promise<void> => {
//     await signIn("email", {
//       ...data,
//       callbackUrl: redirectUrl,
//     });
//   };

//   if (status === "authenticated") {
//     window.location.href = redirectUrl;
//   }
//   return (
//     <>
//       <div className="hero min-h-[calc(100vh-70px)] bg-slate-200">
//         <div className="hero-content max-w-5xl flex-col lg:flex-row-reverse">
//           <div className="text-center lg:text-left">
//             <h1 className="text-5xl font-bold">Sign Up </h1>
//             <h1 className="text-4xl font-bold text-secondary">MessageTTF</h1>
//           </div>
//           <div className="card w-full max-w-md flex-shrink-0 bg-slate-100 shadow-2xl">
//             <div className="card-body">
//               <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
//                 <Input
//                   label="Email"
//                   error={errors.email}
//                   register={register("email")}
//                 />
//                 <Input
//                   label="Name"
//                   error={errors.name}
//                   register={register("name")}
//                 />

//                 <div className="form-control mt-6">
//                   <button type="submit" className="btn btn-primary">
//                     Sign Up
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default function SignUpPage() {
  return null;
}
