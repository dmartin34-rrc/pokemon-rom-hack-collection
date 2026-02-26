import { forwardRef } from 'react';

type InputProps = {
  label?: string;
  labelClassName?: string;
  actions?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, labelClassName, actions, id, ...props },
    ref,
  ): React.JSX.Element => {
    if (actions) {
      return (
        <p>
          <label htmlFor={id} className={labelClassName}>
            {actions}
            <input id={id} {...props} ref={ref} />
          </label>
        </p>
      );
    }

    if (label) {
      return (
        <p>
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>
          <input id={id} {...props} ref={ref} />
        </p>
      );
    }

    return (
      <p>
        <input id={id} {...props} ref={ref} />
      </p>
    );
  },
);

export default Input;
