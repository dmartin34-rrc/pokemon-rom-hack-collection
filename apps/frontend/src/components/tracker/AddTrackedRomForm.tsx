import { useMemo, useState } from "react";
import type { CreateTrackedRomInput } from "../../../../../shared/types/Tracked";

// components
import Form from "../form/Form";
import Button from "../ui/Button";
import Input from "../ui/Input";

type Props = {
  onAdd: (
    input: CreateTrackedRomInput
  ) => Promise<{ isValid: boolean; errorMessages?: string[] }>;
  existingTitles?: string[];
};

const AddTrackedRomForm: React.FC<Props> = ({
  onAdd,
  existingTitles = [],
}): React.JSX.Element => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string>("");

  const cleanedTitle = useMemo(() => title.trim(), [title]);

  const isDuplicate = useMemo(() => {
    const needle = cleanedTitle.toLowerCase();
    return (
      !!needle &&
      existingTitles.some((t) => t.trim().toLowerCase() === needle)
    );
  }, [existingTitles, cleanedTitle]);

  function validate(): boolean {
    if (!cleanedTitle) {
      setError("Title is required.");
      return false;
    }
    if (isDuplicate) {
      setError("That ROM is already being tracked.");
      return false;
    }
    setError("");
    return true;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const result = await onAdd({
      userId: "demo-user",
      title: cleanedTitle,
      hoursPlayed: 0,
      status: "planned",
    });

    if (!result.isValid) {
      setError(result.errorMessages?.[0] ?? "Failed to add ROM.");
      return;
    }

    setTitle("");
    setError("");
  }

  return (
    <Form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
      <Input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
        placeholder="Enter a ROM title"
        style={{ marginLeft: 8 }}
        label="Add ROM:"
      />

      <Button
        type="submit"
        style={{ marginLeft: 8 }}
        disabled={!cleanedTitle || isDuplicate}
      >
        Add
      </Button>

      {error ? <p style={{ marginTop: 8 }}>{error}</p> : null}
      {!error && isDuplicate ? (
        <p style={{ marginTop: 8 }}>Already tracked.</p>
      ) : null}
    </Form>
  );
};

export default AddTrackedRomForm;