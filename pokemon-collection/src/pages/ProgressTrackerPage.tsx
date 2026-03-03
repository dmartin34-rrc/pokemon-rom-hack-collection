// shared state hook
import { useSharedPageState } from '../hooks/useSharedPageState';

// components
import AddTrackedRomForm from '../components/tracker/AddTrackedRomForm';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ProgressTrackerPage: React.FC = (): React.JSX.Element => {
  const { state, actions } = useSharedPageState();

  const trackedRoms = state.trackedRoms;

  return (
    <div style={{ padding: 16 }}>
      <h2>Progress Tracker</h2>

      <p>Tracked ROMs: {trackedRoms.length}</p>

      <AddTrackedRomForm />

      {trackedRoms.length === 0 ? (
        <p>No ROMs tracked yet.</p>
      ) : (
        <ul>
          {trackedRoms.map((rom) => {
            const title = rom.title ?? '';
            const key = rom.title ?? 'unknown-title';

            return (
              <li key={key} style={{ marginBottom: 12 }}>
                <strong>{title || 'Untitled ROM'}</strong>

                <div>
                  Progress:
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={rom.percentComplete ?? 0}
                    onChange={(e) =>
                      actions.updateProgress(title, Number(e.target.value))
                    }
                    style={{ marginLeft: 8, width: 60 }}
                    disabled={!title}
                  />
                  %
                </div>

                <Button
                  onClick={() => actions.removeTrackedRom(title)}
                  style={{ marginTop: 6 }}
                  disabled={!title}
                >
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