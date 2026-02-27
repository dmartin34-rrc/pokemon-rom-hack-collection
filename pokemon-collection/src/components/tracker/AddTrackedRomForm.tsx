import { useMemo, useState } from 'react';
// types
import type Rom from '../../types/Rom';
// components
import Form from '../form/Form';
import Button from '../ui/Button';
import Input from '../ui/Input';

type AddTrackedRomFormProps = {
  trackedRoms: Rom[];
  setTrackedRoms: React.Dispatch<React.SetStateAction<Rom[]>>;
};

const AddTrackedRomForm: React.FC<AddTrackedRomFormProps> = ({
  trackedRoms,
  setTrackedRoms,
}): React.JSX.Element => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string>('');

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

    const newRom: Rom = {
      title: cleanedTitle,
      percentComplete: 0,
    } as Rom;

    setTrackedRoms((prev) => [...prev, newRom]);
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
