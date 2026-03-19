import { SharedMessageBar } from '../common/SharedMessageBar';
import { useSharedPageState } from '../../hooks/useSharedPageState';

export default function SharedMessageBarContainer() {
  const { state, actions } = useSharedPageState();

  return (
    <SharedMessageBar
      sharedMessage={state.sharedMessage}
      setSharedMessage={actions.setSharedMessage}
    />
  );
}
