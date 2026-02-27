import { useMemo } from 'react';
// components
import Input from '../ui/Input';
import Button from '../ui/Button';

type SharedMessageBarProps = {
  sharedMessage: string;
  setSharedMessage: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
  maxLength?: number;
};

const SharedMessageBar: React.FC<SharedMessageBarProps> = ({
  sharedMessage,
  setSharedMessage,
  label = 'You are feeling: ',
  maxLength = 80,
}): React.JSX.Element => {
  const remaining = useMemo(
    () => maxLength - sharedMessage.length,
    [maxLength, sharedMessage],
  );

  const tooLong = sharedMessage.length > maxLength;

  return (
    <section
      style={{ marginBottom: 16, padding: 12, border: '1px solid #ccc' }}
    >
      <div style={{ marginBottom: 8 }}>
        <strong>{label}:</strong> {sharedMessage || '(empty)'}
      </div>

      <Input
        type="text"
        value={sharedMessage}
        onChange={(e) => setSharedMessage(e.target.value)}
        style={{ marginLeft: 8 }}
        label="Edit"
      />

      <div style={{ marginTop: 8 }}>
        <small>Characters left: {remaining}</small>
        {tooLong ? <p>Message is too long (max {maxLength}).</p> : null}
      </div>

      <Button onClick={() => setSharedMessage('')} style={{ marginTop: 8 }}>
        Clear
      </Button>
    </section>
  );
};

export default SharedMessageBar;
