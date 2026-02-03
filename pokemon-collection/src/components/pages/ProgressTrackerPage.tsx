import AddTrackedRomForm from "../tracker/AddTrackedRomForm";
import type Rom from "../../types/Rom";

type Props = {
  trackedRoms: Rom[];
  setTrackedRoms: React.Dispatch<React.SetStateAction<Rom[]>>;

  sharedMessage: string;
  setSharedMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function ProgressTrackerPage({
  trackedRoms,
  setTrackedRoms,
  sharedMessage,
  setSharedMessage,
}: Props) {
  function removeRom(title: string) {
    setTrackedRoms((prev) => prev.filter((r) => r.title !== title));
  }

  function updateProgress(title: string, percent: number) {
    const clamped = Math.max(0, Math.min(100, percent));

    setTrackedRoms((prev) =>
      prev.map((r) =>
        r.title === title ? { ...r, percentComplete: clamped } : r
      )
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Progress Tracker</h2>

      <div style={{ marginBottom: 12 }}>
        <p>
          You are feeling: <strong>{sharedMessage || "not sure yet"}</strong>
        </p>

        <label>
          How are you feeling today?
          <input
            type="text"
            value={sharedMessage}
            onChange={(e) => setSharedMessage(e.target.value)}
            placeholder="Happy, excited, tired..."
            style={{ marginLeft: 8 }}
          />
        </label>
      </div>

      <p>Tracked ROMs: {trackedRoms.length}</p>

      <AddTrackedRomForm trackedRoms={trackedRoms} setTrackedRoms={setTrackedRoms} />

      {trackedRoms.length === 0 ? (
        <p>No ROMs tracked yet.</p>
      ) : (
        <ul>
          {trackedRoms.map((rom) => {
            const title = rom.title ?? "";
            const key = rom.title ?? "unknown-title";

            return (
              <li key={key} style={{ marginBottom: 12 }}>
                <strong>{title || "Untitled ROM"}</strong>

                <div>
                  Progress:
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={rom.percentComplete ?? 0}
                    onChange={(e) => updateProgress(title, Number(e.target.value))}
                    style={{ marginLeft: 8, width: 60 }}
                    disabled={!title}
                  />
                  %
                </div>

                <button
                  type="button"
                  onClick={() => removeRom(title)}
                  style={{ marginTop: 6 }}
                  disabled={!title}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
