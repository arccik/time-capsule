import clsx from "clsx";
import type { FieldError, Merge } from "react-hook-form";

export default function Card({
  children,
  title,
  subtitle,
  actions,
  errors,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  errors?: Merge<FieldError, FieldError | undefined> | undefined;
}) {
  return (
    <>
      <div
        className={clsx(
          "border-3 space-y-4 rounded-lg bg-slate-100 p-6 pt-4 shadow-lg ",
          {
            "mb-2 border-2 border-red-600": errors,
          }
        )}
      >
        <div className="flex justify-between">
          <div>
            <p
              className={clsx("font-bold", {
                "text-red-600": errors,
              })}
            >
              {title}
            </p>
            <span className="text-xs text-[#4C5F7A] md:text-primary">
              {subtitle}
            </span>
          </div>
          {actions && <span>{actions}</span>}
        </div>
        {children}
      </div>
      {errors?.message && (
        <p className="text-right text-xs text-red-600">{errors?.message}</p>
      )}
    </>
  );
}
