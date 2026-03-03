import Input from "../ui/Input";

export type SharedMessageBarProps = {
  sharedMessage: string;
  setSharedMessage: (next: string) => void;
};

export function SharedMessageBar({
  sharedMessage,
  setSharedMessage,
}: SharedMessageBarProps) {
  return (
    <div className="border-b border-gray-200 bg-white py-3">
      <div className="mx-auto flex max-w-md flex-col gap-2 px-4">
        
        {/* Prompt */}
        <label
          htmlFor="shared-message"
          className="text-sm font-medium text-gray-700"
        >
          How are you feeling today?
        </label>

        <Input
          id="shared-message"
          type="text"
          value={sharedMessage}
          onChange={(e) => setSharedMessage(e.target.value)}
          placeholder="Happy, excited, tired..."
          className="h-9 text-sm"
        />

        {/* Display current feeling */}
        <p className="text-sm text-gray-600">
          {sharedMessage
            ? `You're feeling: ${sharedMessage}`
            : "You're feeling: (not sure yet)"}
        </p>
      </div>
    </div>
  );
}