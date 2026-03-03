import { useState } from "react";
import { useTrackedRoms } from "../hooks/useTrackedRoms";

// components
import AddTrackedRomForm from "../components/tracker/AddTrackedRomForm";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const ProgressTrackerPage: React.FC = (): React.JSX.Element => {
  const userId = "demo-user";
  const { items: trackedRoms, isLoading, errorMessages, add, update, remove } =
    useTrackedRoms(userId);

  const [draftHours, setDraftHours] = useState<Record<string, number>>({});

  if (isLoading) {
    return (
      <div style={{ padding: 16 }}>
        <h2>Progress Tracker</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Progress Tracker</h2>

      {errorMessages.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {errorMessages.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      <p>Tracked ROMs: {trackedRoms.length}</p>

      <AddTrackedRomForm
        onAdd={add}
        existingTitles={trackedRoms.map((r) => r.title)}
      />

      {trackedRoms.length === 0 ? (
        <p>No ROMs tracked yet.</p>
      ) : (
        <ul>
          {trackedRoms.map((rom) => {
            const hours =
              draftHours[rom.id] !== undefined ? draftHours[rom.id] : rom.hoursPlayed;

            return (
              <li key={rom.id} style={{ marginBottom: 12 }}>
                <strong>{rom.title}</strong>

                <div style={{ marginTop: 6 }}>
                  Hours Played:
                  <Input
                    type="number"
                    min={0}
                    value={hours}
                    onChange={(e) =>
                      setDraftHours((prev) => ({
                        ...prev,
                        [rom.id]: Number(e.target.value),
                      }))
                    }
                    style={{ marginLeft: 8, width: 80 }}
                  />
                  <Button
                    onClick={() => void update(rom.id, { hoursPlayed: hours })}
                    style={{ marginLeft: 8 }}
                  >
                    Save
                  </Button>
                </div>

                <div style={{ marginTop: 6 }}>
                  Status: <strong>{rom.status}</strong>
                  <div style={{ marginTop: 6, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Button onClick={() => void update(rom.id, { status: "planned" })}>
                      Planned
                    </Button>
                    <Button onClick={() => void update(rom.id, { status: "playing" })}>
                      Playing
                    </Button>
                    <Button onClick={() => void update(rom.id, { status: "completed" })}>
                      Completed
                    </Button>
                    <Button onClick={() => void update(rom.id, { status: "on-hold" })}>
                      On-hold
                    </Button>
                    <Button onClick={() => void update(rom.id, { status: "dropped" })}>
                      Dropped
                    </Button>
                  </div>
                </div>

                <Button onClick={() => void remove(rom.id)} style={{ marginTop: 8 }}>
                  Remove
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProgressTrackerPage;