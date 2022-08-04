import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Account from './pages/Account';
import Registrasi from './pages/Registrasi';
import ProtectedRoute from './config/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/account' element={
          <ProtectedRoute loginOnly={true}>
            <Account />
          </ProtectedRoute>}/>
        <Route path='/login' element={
          <ProtectedRoute loginOnly={false}>
            <Login />
          </ProtectedRoute>}/>
        <Route path='/registrasi' element={
          <ProtectedRoute loginOnly={false}>
            <Registrasi />
          </ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
