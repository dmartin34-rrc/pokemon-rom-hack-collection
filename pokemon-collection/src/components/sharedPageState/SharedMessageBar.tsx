import Input from '../ui/Input';
import { useSharedPageState } from './useSharedPageState';

const SharedMessageBar = (): React.JSX.Element => {
  const { state, actions } = useSharedPageState();

  return (
    <div style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
      <p style={{ margin: 0 }}>
        You are feeling:{' '}
        <strong>{state.sharedMessage || 'not sure yet'}</strong>
      </p>

      <div style={{ marginTop: 8 }}>
        <Input
          type="text"
          value={state.sharedMessage}
          onChange={(e) => actions.setSharedMessage(e.target.value)}
          placeholder="Happy, excited, tired..."
          label="How are you feeling today?"
        />
      </div>
    </div>
  );
};

export default SharedMessageBar;