import { forwardRef } from "react";

type InputProps = {
  label?: string;
  labelClassName?: string;
  actions?: React.ReactNode;
  wrapperClassName?: string;
} & React.ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, labelClassName, actions, wrapperClassName, id, className, ...props }, ref) => {
    return (
      <div className={wrapperClassName ?? ""}>
        {label || actions ? (
          <div className="mb-1 flex items-center justify-between gap-2">
            {label ? (
              <label htmlFor={id} className={labelClassName ?? "text-sm font-medium"}>
                {label}
              </label>
            ) : (
              <span />
            )}

            {actions ? <div className="shrink-0">{actions}</div> : null}
          </div>
        ) : null}

        <input
          id={id}
          ref={ref}
          {...props}
          className={[
            "w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none",
            "focus:border-gray-400",
            className ?? "",
          ].join(" ")}
        />
      </div>
    );
  }
);

export default Input;