import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotesPage from './pages/NotesPage';
import EditPage from './pages/EditPage';
import NewPage from './pages/NewPage';

const PrivateRoute = ({ children }) => {
  const token=localStorage.getItem('token');
  return token? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        
        <Route path="/" element={<PrivateRoute><NotesPage/></PrivateRoute>} />
        <Route path="/new" element={<PrivateRoute><NewPage/></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditPage/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
