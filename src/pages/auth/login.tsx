import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/auth/Input";
// import { notification } from "antd";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  // password: z.string().min(1, { message: "Password is required" }),
});

type Inputs = z.infer<typeof schema>;

export default function SignUpPage() {
  const { status } = useSession();
  if (status === "authenticated") {
    window.location.href = "/";
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data): Promise<void> => {
    // signIn("credentials", { ...data, redirect: false }).then((callback) => {
    //   if (callback?.error) {
    //     notify.error({
    //       message: callback.error,
    //       icon: <BsEmojiSmileUpsideDown className="text-2xl text-red-500" />,
    //     });
    //   }
    //   if (callback?.ok && !callback?.error) {
    //     notify.success({
    //       message: "Login Successful",
    //       icon: <BsEmojiSmile className="text-2xl text-green-500" />,
    //     });
    //     window.location.href = "/";
    //   }
    // });
    await signIn("email", { ...data, callbackUrl: "/dashboard" });
  };

  return (
    <>
      <div className="hero min-h-[calc(100vh-70px)] bg-base-200">
        <div className="hero-content max-w-5xl flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login to your account</h1>
            <h1 className="text-4xl font-bold text-secondary">
              Your Digital Time Capsule
            </h1>
            <p className="py-6">
              MessageTTF is an innovative online platform that lets you create
              and preserve memories in the form of messages, photos and voice
              messages ensuring they remain securely stored until a future date
              of your choosing. With ChronoCapsule, you can capture the essence
              of a moment and experience the joy of revisiting it in the future.
            </p>
          </div>
          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
            <div className="card-body">
              <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
                <Input
                  label="Email"
                  error={errors.email}
                  register={register("email")}
                />

                <div className="form-control mt-6">
                  <button type="submit" className="btn-primary btn">
                    Sign in with Email
                  </button>
                  <div className="divider">OR</div>
                  <button
                    onClick={() =>
                      void signIn("google", { callbackUrl: "/dashboard" })
                    }
                    type="button"
                    className="btn-ghost btn border border-primary"
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
