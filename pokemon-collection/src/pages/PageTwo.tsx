type Props = {
  sharedCount: number;
  setSharedCount: React.Dispatch<React.SetStateAction<number>>;
};

function PageTwo({ sharedCount, setSharedCount }: Props): JSX.Element {
  return (
    <>
      <h2>Page Two</h2>

      <p>Shared Count: {sharedCount}</p>

      <button
        type="button"
        onClick={() => setSharedCount((prev) => prev - 1)}
      >
        Decrement
      </button>
    </>
  );
}

export default PageTwo;
