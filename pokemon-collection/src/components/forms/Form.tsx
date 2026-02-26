import { useRef } from 'react';

type FormProps = React.ComponentPropsWithoutRef<'form'>;

const Form: React.FC<FormProps> = ({
  children,
  ...props
}): React.JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form {...props} ref={formRef}>
      {children}
    </form>
  );
};

export default Form;
