const CatButtons = ({ changeCatCount, isLoading, catCount }: any) => {
  return (
    <div className="card">
      <button disabled={isLoading} onClick={() => changeCatCount(1)}>Add Cat</button>
      <button disabled={isLoading || catCount < 1} onClick={() => changeCatCount(-1)}>Remove Cat</button>
    </div>
  );
};

export default CatButtons;