import { useMemo, useState } from "react";
import type Rom from "../../types/Rom";

type Props = {
  trackedRoms: Rom[];
  setTrackedRoms: React.Dispatch<React.SetStateAction<Rom[]>>;
};

export default function AddTrackedRomForm({ trackedRoms, setTrackedRoms }: Props) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string>("");

  const cleanedTitle = useMemo(() => title.trim(), [title]);

  const isDuplicate = useMemo(() => {
    if (!cleanedTitle) return false;

    return trackedRoms.some((r) => {
      if (!r.title) return false;
      return r.title.toLowerCase() === cleanedTitle.toLowerCase();
    });
  }, [trackedRoms, cleanedTitle]);

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

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const newRom: Rom = {
      title: cleanedTitle,
      percentComplete: 0,
    } as Rom;

    setTrackedRoms((prev) => [...prev, newRom]);
    setTitle("");
  }

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
      <label>
        Add ROM:
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          placeholder="Enter a ROM title"
          style={{ marginLeft: 8 }}
        />
      </label>

      <button type="submit" style={{ marginLeft: 8 }} disabled={!cleanedTitle || isDuplicate}>
        Add
      </button>

      {error ? <p style={{ marginTop: 8 }}>{error}</p> : null}
      {!error && isDuplicate ? <p style={{ marginTop: 8 }}>Already tracked.</p> : null}
    </form>
  );
}
