import { useMemo, useState } from 'react';

// services
import * as RomService from '../../services/romService';

// shared state hook
import { useSharedPageState } from '../../hooks/useSharedPageState';

// components
import Form from '../form/Form';
import Button from '../ui/Button';
import Input from '../ui/Input';

const AddTrackedRomForm: React.FC = (): React.JSX.Element => {
  const { state, actions } = useSharedPageState();
  const trackedRoms = state.trackedRoms;

  const [title, setTitle] = useState('');
  const [error, setError] = useState<string>('');

  const cleanedTitle = useMemo(() => title.trim(), [title]);

  const isDuplicate = useMemo(() => {
    return RomService.checkIsDuplicate(trackedRoms, cleanedTitle);
  }, [trackedRoms, cleanedTitle]);

  function validate(): boolean {
    if (!cleanedTitle) {
      setError('Title is required.');
      return false;
    }
    if (isDuplicate) {
      setError('That ROM is already being tracked.');
      return false;
    }
    setError('');
    return true;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    actions.addTrackedRom(cleanedTitle);
    setTitle('');
  }

  return (
    <Form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
      <Input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError('');
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