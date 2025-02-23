import cat from "/cat.svg";

const CatDisplay = ({ catCount }: { catCount: number }) => {
  return (
    <>
      {Array.from({ length: catCount }, (_, index) => (
        <img key={index} src={cat} className="logo" alt={`Cat ${index + 1}`} />
      ))}
    </>
  );
};

export default CatDisplay;