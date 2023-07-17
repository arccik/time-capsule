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
        className={`border-3 w-full space-y-4 rounded-lg bg-slate-100 p-6 pt-4 shadow-lg  ${
          errors ? "mb-2 border-2 border-red-600" : ""
        }`}
      >
        <div className="flex justify-between">
          <div>
            <p className={`font-bold ${errors ? "text-red-600" : ""}`}>
              {title}
            </p>
            <span className="text-xs text-primary">{subtitle}</span>
          </div>
          {actions && <div>{actions}</div>}
        </div>

        {children}
      </div>
      {errors?.message && (
        <p className="text-right text-xs text-red-600">{errors?.message}</p>
      )}
    </>
  );
}
