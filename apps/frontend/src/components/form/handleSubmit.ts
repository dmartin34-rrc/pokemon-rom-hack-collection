const handleSubmit =
  (
    onSave: (value: unknown) => void,
    formRef: React.RefObject<HTMLFormElement | null>,
  ) =>
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = Object.fromEntries(formData);

    onSave(data);

    formRef.current?.reset();
  };

export default handleSubmit;
