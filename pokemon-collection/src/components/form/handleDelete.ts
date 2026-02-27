interface HandleDeleteProps {
  id: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const handleDelete = ({ id, setState }: HandleDeleteProps): void => {
  setState((prev: any) => {
    return prev.filter((c: any) => {
      return c.id !== id;
    });
  });
};

export default handleDelete;
