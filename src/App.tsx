import { useCatLogic } from "./hooks/useCatLogic";
import CatDisplay from "./components/CatDisplay";
import CatButtons from "./components/CatButtons";
import "./App.css";

function App() {
  const { catCount, changeCatCount, isLoading, error } = useCatLogic();

  return (
    <div className="container">
      <div>
        {error ? <p style={{ color: "red" }}>{error}</p> : isLoading ? <p>Loading...</p> : <CatDisplay catCount={catCount} />}
      </div>
      <h1>Cat + Cat</h1>
      <CatButtons changeCatCount={changeCatCount} isLoading={isLoading} catCount={catCount} />
    </div>
  );
}

export default App;