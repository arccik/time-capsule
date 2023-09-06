import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/auth/Input";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});

type Inputs = z.infer<typeof schema>;

export default function LoginPage() {
  const [redirectUrl, setRedirectUrl] = useState<string>("/dashboard");
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.query.callbackUrl) {
      setRedirectUrl(router.query.callbackUrl as string);
    }
  }, [router.query.callbackUrl]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data): Promise<void> => {
    await signIn("email", {
      ...data,
      callbackUrl: redirectUrl,
    });
  };

  if (status === "authenticated") {
    window.location.href = redirectUrl;
  }
  return (
    <>
      <div className="hero min-h-[calc(100vh-70px)] bg-slate-200 ">
        <div className="hero-content max-w-5xl flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Welcome to MessageTTF</h1>
            <h1 className="text-4xl font-bold text-secondary">
              Where Memories Await!
            </h1>
            {/* <p className="py-6">
              MessageTTF is an innovative online platform that lets you create
              and preserve memories in the form of messages, photos and voice
              messages ensuring they remain securely stored until a future date
              of your choosing. With MessageTTF, you can capture the essence of
              a moment and experience the joy of revisiting it in the future.
            </p> */}
            <p className="py-6">
              Once you have entered your email, click the &rsquo; Login with
              email&rsquo; button. We will send you an email shortly with a
              secure login link. This link will grant you access to your
              account, where you can begin crafting beautiful memories or
              revisiting those you have already created.
            </p>
          </div>
          <div className="card w-full max-w-sm flex-shrink-0 bg-slate-100 shadow-2xl">
            <div className="card-body">
              <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
                <Input
                  label="Email"
                  error={errors.email}
                  register={register("email")}
                />

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Login with email
                  </button>
                  <div className="divider">OR</div>
                  <button
                    onClick={() =>
                      void signIn("google", { callbackUrl: redirectUrl })
                    }
                    type="button"
                    className="btn btn-ghost border border-primary"
                  >
                    <FcGoogle className="mr-3 text-2xl" />
                    Sign in with Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
