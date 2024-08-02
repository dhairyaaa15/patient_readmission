import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center space-x-4">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center mt-8">Vite + React</h1>
      <div className="card p-6 bg-white shadow-md rounded-lg mt-8">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs mt-4 text-center">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;