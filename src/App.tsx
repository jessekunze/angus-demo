import { useState } from 'react'
import cat from '/cat.svg'
import './App.css'

function App() {
  const [catCount, setCatCount] = useState(0);

  const addCat = () => {
    setCatCount((prevCount) => prevCount + 1);
  }

  const removeCat = () => {
    setCatCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <>
      <div>
        {Array.from({ length: catCount }, (_, index) => (
          <img key={index} src={cat} className="logo" alt={`Cat ${index + 1}`} />
        ))}
      </div>
      <h1>Cat + Cat</h1>
      <div className="card">
        <button onClick={addCat}>Add Cat</button>
        <button disabled={catCount < 1} onClick={removeCat}>Remove Cat</button>
      </div>
    </>
  )
}

export default App
