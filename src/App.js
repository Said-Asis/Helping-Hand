import Login from './pages/Login';
import Home from './pages/Home'
import Register from './pages/Register'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AuthProvider} from "./context/authContext"
import { ProtectedRoute } from './pages/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path='/'
              element={ 
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>} 
            />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
