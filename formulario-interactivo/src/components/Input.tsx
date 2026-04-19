import { forwardRef ,type InputHTMLAttributes } from "react";

type InputProps = {
  titleLabel: string;
  idInput: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputWithLabel = forwardRef<HTMLInputElement, InputProps>(
  ({titleLabel, idInput, className, ...props}, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={idInput}>{titleLabel}</label>
        <input
          id={idInput}
          ref={ref}
          {...props}
          className={`border border-stone-400 px-2 py-1 rounded-sm outline-0 focus:outline-1 focus:outline-stone-500 ${className}`}
        />
      </div>
    )
  }
);