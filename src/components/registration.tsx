import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/auth/Input";
import { api } from "~/utils/api";
import { notification } from "antd";
import { BsEmojiSmile, BsEmojiSmileUpsideDown } from "react-icons/bs";
import { useState } from "react";
import Loader from "~/components/layout/Loader";
import { useRouter } from "next/router";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
  name: z.string().optional(),
});

type Inputs = z.infer<typeof schema>;

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [notify, contextHolder] = notification.useNotification();
  const router = useRouter();

  const registerUser = api.user.register.useMutation({
    onError: (err) => {
      setLoading(false);
      notify.error({
        message: err.message,
        icon: <BsEmojiSmileUpsideDown className="text-red-500" />,
      });
    },
    onSuccess: () => {
      setLoading(false);
      notify.success({
        message: "User Successfully registered",
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        icon: <BsEmojiSmile className="text-green-500" />,
      });
      void router.push("/login");
    },
    onMutate: () => setLoading(true),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data): void => {
    console.log("Submittting ... ", data);
    registerUser.mutate(data);
  };

  return (
    <div className="hero min-h-[calc(100vh-70px)] bg-base-200">
      <div className="hero-content max-w-5xl flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          {contextHolder}
          <h1 className="text-5xl font-bold">Sign Up Now!</h1>
          <h1 className="text-4xl font-bold text-secondary">
            Your Digital Time Capsule
          </h1>
          <p className="py-6">
            MessageTTF is an innovative online platform that lets you create and
            preserve memories in the form of messages, photos and voice messages
            ensuring they remain securely stored until a future date of your
            choosing. With ChronoCapsule, you can capture the essence of a
            moment and experience the joy of revisiting it in the future.
          </p>
        </div>

        {loading ? (
          <div className="w-full max-w-sm">
            <Loader />
          </div>
        ) : (
          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
            <div className="card-body">
              <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
                <Input
                  error={errors.name}
                  register={register("name")}
                  label="Name"
                />
                <Input
                  error={errors.email}
                  register={register("email")}
                  label="Email"
                />
                <Input
                  error={errors.password}
                  register={register("password")}
                  label="Password"
                />
                <Input
                  error={errors.confirmPassword}
                  register={register("confirmPassword")}
                  label="Confirm Password"
                />
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Upload Image</span>
                  </label>
                  <input
                    type="file"
                    className="file-input-bordered file-input-primary file-input w-full max-w-xs"
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    className="btn-primary btn"
                    disabled={Object.keys(errors).length > 0}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
