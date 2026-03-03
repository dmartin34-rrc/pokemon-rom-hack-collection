type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  href?: never;
  children: React.ReactNode;
};

type AnchorProps = React.ComponentPropsWithoutRef<'a'> & { href?: string };

const isAnchorProps = (
  props: ButtonProps | AnchorProps,
): props is AnchorProps => {
  return 'href' in props;
};

const Button: React.FC<ButtonProps | AnchorProps> = (
  props,
): React.JSX.Element => {
  if (isAnchorProps(props)) {
    const { children, ...rest } = props;
    return <a {...rest}>{children}</a>;
  }

  const { children, ...rest } = props;
  return <button {...rest}>{children}</button>;
};

export default Button;
