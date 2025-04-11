import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Auth from './pages/Auth/Auth';
import './index.css';
import Users from './Profile/Users/Users';
import { useNavigate } from 'react-router-dom';

function App() {
  const isAuth = localStorage.getItem('token') ? true : false;

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      {isAuth && (
        <Route path="/auth">
          <Route path="users" element={<Users />} />
        </Route>
      )}
    </Routes>
  )
}

export default App
