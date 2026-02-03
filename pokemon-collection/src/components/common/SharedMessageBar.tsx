import { useMemo } from "react";

type Props = {
  sharedMessage: string;
  setSharedMessage: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
  maxLength?: number;
};

export default function SharedMessageBar({
  sharedMessage,
  setSharedMessage,
  label = "You are feeling: ",
  maxLength = 80,
}: Props) {
  const remaining = useMemo(() => maxLength - sharedMessage.length, [maxLength, sharedMessage]);

  const tooLong = sharedMessage.length > maxLength;

  return (
    <section style={{ marginBottom: 16, padding: 12, border: "1px solid #ccc" }}>
      <div style={{ marginBottom: 8 }}>
        <strong>{label}:</strong> {sharedMessage || "(empty)"}
      </div>

      <label>
        Edit:
        <input
          type="text"
          value={sharedMessage}
          onChange={(e) => setSharedMessage(e.target.value)}
          style={{ marginLeft: 8 }}
        />
      </label>

      <div style={{ marginTop: 8 }}>
        <small>
          Characters left: {remaining}
        </small>
        {tooLong ? <p>Message is too long (max {maxLength}).</p> : null}
      </div>

      <button
        type="button"
        onClick={() => setSharedMessage("")}
        style={{ marginTop: 8 }}
      >
        Clear
      </button>
    </section>
  );
}
