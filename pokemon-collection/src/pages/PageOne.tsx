type Props = {
  sharedCount: number;
  setSharedCount: React.Dispatch<React.SetStateAction<number>>;
};

function PageOne({ sharedCount, setSharedCount }: Props) {
  return (
    <>
      <h2>Page One</h2>
      <p>Shared Count: {sharedCount}</p>
      <button type="button" onClick={() => setSharedCount((prev) => prev + 1)}>
        Increment
      </button>
    </>
  );
}

export default PageOne;
