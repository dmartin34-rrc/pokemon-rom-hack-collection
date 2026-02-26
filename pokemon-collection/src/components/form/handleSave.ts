interface HandleSaveProps {
  setState1: React.Dispatch<React.SetStateAction<any>>;
  setState2: React.Dispatch<React.SetStateAction<any>>;
}

const handleSave =
  ({ setState1, setState2 }: HandleSaveProps) =>
  (data: unknown) => {
    const extractedData = data as {};

    // console.log(extractedData);

    setState1((prev: any) => [...prev, extractedData]);

    setState2({});
  };

export default handleSave;
