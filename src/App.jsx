import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster position="top-right" />
    </>
  )
}

export default App;
