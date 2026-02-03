import { useMemo, useState } from "react";
import type TrackedRom from "../types/TrackedRom";

type Props = {
  trackedRoms: TrackedRom[];
  setTrackedRoms: React.Dispatch<React.SetStateAction<TrackedRom[]>>;
};

function ProgressTrackerPage({
  trackedRoms,
  setTrackedRoms,
}: Props): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const existingTitles = useMemo(() => {
    return new Set(trackedRoms.map((rom) => rom.title.trim().toLowerCase()));
  }, [trackedRoms]);

  const validateTitle = (value: string): string => {
    const trimmed = value.trim();

    if (trimmed.length === 0) return "ROM title is required.";
    if (trimmed.length < 3) return "Title must be at least 3 characters.";
    if (existingTitles.has(trimmed.toLowerCase()))
      return "This ROM is already being tracked.";

    return "";
  };

  const handleAdd = (): void => {
    const message = validateTitle(title);

    if (message) {
      setError(message);
      return;
    }

    const newTrackedRom: TrackedRom = {
      id: crypto.randomUUID(),
      title: title.trim(),
      progress: 0,
    };

    setTrackedRoms((prev) => [newTrackedRom, ...prev]);
    setTitle("");
    setError("");
  };

  const handleRemove = (id: string): void => {
    setTrackedRoms((prev) => prev.filter((rom) => rom.id !== id));
  };

  const handleProgressChange = (id: string, nextProgress: number): void => {
    const safe = Math.max(0, Math.min(100, nextProgress));

    setTrackedRoms((prev) =>
      prev.map((rom) => (rom.id === id ? { ...rom, progress: safe } : rom))
    );
  };

  return (
    <section className="bg-stone-50 text-gray-950 px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-6">
          <h2 className="text-[1.5em]">Progress Tracker</h2>
          <p className="mt-2 text-slate-600">
            Add ROM hacks you’re playing and update your progress.
          </p>
        </header>

        {/*  Form Component */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="rounded-lg border border-slate-600/30 bg-white p-5 shadow-sm"
        >
          <label htmlFor="rom-title" className="block text-gray-950">
            ROM Title
          </label>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              id="rom-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(validateTitle(e.target.value));
              }}
              aria-invalid={Boolean(error)}
              placeholder="e.g., Pokemon Unbound"
              className={[
                "w-full flex-1 rounded-md border bg-stone-50 px-3 py-2",
                "placeholder:text-slate-600/70",
                "focus:outline-none focus:ring-2 focus:ring-blue-900",
                error ? "border-red-600" : "border-slate-600/30",
              ].join(" ")}
            />

            <button
              type="submit"
              className="rounded-md bg-blue-900 px-4 py-2 text-white font-semibold hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              Add
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm font-semibold text-red-600" role="alert">
              {error}
            </p>
          )}
        </form>

        {/* List + Add/Remove */}
        <div className="mt-8">
          <h3 className="text-[1.125em]">Tracked ROMs</h3>

          {trackedRoms.length === 0 ? (
            <p className="mt-2 text-slate-600">No ROMs tracked yet.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {trackedRoms.map((rom) => (
                <li
                  key={rom.id}
                  className="rounded-lg border border-slate-600/30 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold text-gray-950">{rom.title}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        Progress:{" "}
                        <span className="font-semibold text-gray-950">
                          {rom.progress}%
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="text-sm text-slate-600">
                        <span className="sr-only">Progress</span>
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={rom.progress}
                          onChange={(e) =>
                            handleProgressChange(rom.id, Number(e.target.value))
                          }
                          className="w-20 rounded-md border border-slate-600/30 bg-stone-50 px-2 py-1 text-center text-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          handleProgressChange(rom.id, rom.progress + 10)
                        }
                        className="rounded-md bg-slate-600 px-3 py-1 text-white font-semibold hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-900"
                      >
                        +10
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleProgressChange(rom.id, rom.progress - 10)
                        }
                        className="rounded-md bg-slate-600 px-3 py-1 text-white font-semibold hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-blue-900"
                      >
                        -10
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemove(rom.id)}
                        className="rounded-md border border-blue-900 px-3 py-1 text-blue-900 font-semibold hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-10 text-sm text-slate-600">
          Your tracker updates immediately and persists across routes (shared state in App).
        </p>
      </div>
    </section>
  );
}

export default ProgressTrackerPage;
