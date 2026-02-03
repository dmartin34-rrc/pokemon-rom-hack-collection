type Props = {
  trackedCount: number;
};

function PageTwo({ trackedCount }: Props): JSX.Element {
  return (
    <section className="p-4">
      <h2>Page Two</h2>
      <p>Tracked ROMs: {trackedCount}</p>
      <p>
        This page proves that shared state from App.tsx persists across routes.
      </p>
    </section>
  );
}

export default PageTwo;
