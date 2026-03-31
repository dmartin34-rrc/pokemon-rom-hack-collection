interface HandleChange {
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const handleChange =
  ({ setState }: HandleChange) =>
  (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

export default handleChange;
