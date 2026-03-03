interface HandleClickProps {
  setState1: React.Dispatch<React.SetStateAction<any>>;
  state2: any;
  setState2: React.Dispatch<React.SetStateAction<any>>;
}

const handleClick = ({
  setState1,
  state2,
  setState2,
}: HandleClickProps): void => {
  if (!state2) {
    return;
  }

  // setter
  setState1((prev: any) => {
    const newObject = {};

    return [...prev, newObject];
  });

  // reset
  setState2({});
};

export default handleClick;
