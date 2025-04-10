import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Auth from './pages/Auth/Auth';
import './index.css';


function App() {
 

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      <Route path="/auth" element={<Auth />} /> 
    </Routes>
  )
}

export default App
