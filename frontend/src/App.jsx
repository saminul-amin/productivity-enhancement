import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App


// "Ahnaf Tahmid Rhythm": [
//             {"month": "May", "date": "1", "day": "Thu", "score": 0},
//             {"month": "May", "date": "2", "day": "Fri", "score": 2},
//             {"month": "May", "date": "3", "day": "Sat", "score": 3},
//             {"month": "May", "date": "4", "day": "Sun", "score": 2},
//             {"month": "May", "date": "5", "day": "Mon", "score": 3.5},
//             {"month": "May", "date": "6", "day": "Tue", "score": 6},
//             {"month": "May", "date": "7", "day": "Wed", "score": 2},
//             {"month": "May", "date": "8", "day": "Thu", "score": 2},
//             {"month": "May", "date": "9", "day": "Fri", "score": 1},
//             {"month": "May", "date": "10", "day": "Sat", "score": 2},
//             {"month": "May", "date": "11", "day": "Sun", "score": 1},
//             {"month": "May", "date": "12", "day": "Mon", "score": 1},
//             {"month": "May", "date": "13", "day": "Tue", "score": 0.5},
//             {"month": "May", "date": "14", "day": "Wed", "score": 1},
//             {"month": "May", "date": "15", "day": "Thu", "score": 0}
//         ],