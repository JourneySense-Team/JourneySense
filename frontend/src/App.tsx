import "primeicons/primeicons.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Hubs from './pages/Hubs/Hubs.tsx';
import './App.css'

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/hubs" element={<Hubs />}></Route>
            </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
