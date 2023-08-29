import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { env } from "~/env.mjs";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  subject: z.string().min(1, { message: "Subject is required" }),
  text: z.string().min(1, { message: "Text is required" }),
});

type Inputs = z.infer<typeof schema>;

type Props = {
  setSent: Dispatch<SetStateAction<boolean>>;
};

export default function ContactUsForm({ setSent }: Props) {
  const [submitError, setSubmitError] = useState<null | string>(null);
  const emailSender = api.sending.email.useMutation({
    onError: (err) => {
      setSubmitError(
        "Something went wrong on the server, try to send email to" +
          env.SMTP_HOST
      );
      console.error("Something went wrong with sending email: ", err);
    },
    onSuccess: () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setSent(true);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data): void => {
    emailSender.mutate(data);
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
        <h2 className="text-gray-90 mb-4 text-center text-4xl font-extrabold tracking-tight">
          Contact Us
        </h2>
        <p className="mb-8 text-center font-light text-gray-500  sm:text-xl lg:mb-16">
          Got a technical issue? Want to send us your feedback? Need details
          about our Business plan? Let us know.
        </p>
        <form
          className="space-y-8"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              {...register("email")}
              placeholder="email@example.com"
              className={clsx(
                "focus:ring-primary-500 focus:border-primary-500  block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm",
                errors.email && "border-red-500"
              )}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Subject
            </label>
            <input
              {...register("subject")}
              className={clsx(
                "focus:ring-primary-500 focus:border-primary-500  block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm",
                errors.subject && "border-red-500"
              )}
              placeholder="Let us know how we can help you"
            />
            {errors.subject && (
              <p className="text-red-500">{errors.subject.message}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Your message
            </label>
            <textarea
              {...register("text")}
              rows={6}
              className={clsx(
                "focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm",
                errors.text && "border-red-500"
              )}
              placeholder="Leave a comment..."
            ></textarea>
            {errors.text && (
              <p className="text-red-500">{errors.text.message}</p>
            )}
          </div>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!!Object.keys(errors).length}
          >
            Send message
          </button>
          {submitError && (
            <div className="alert alert-error">{submitError}</div>
          )}
        </form>
      </div>
    </section>
  );
}
