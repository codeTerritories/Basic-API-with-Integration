import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './pages/registration'
import Login from './pages/login'
import FetchData from './pages/fetchData'
// import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Registration' element={<Registration/>}/>
        <Route path='/fetchData' element={<FetchData/>}/>
      

        </Routes>
    </BrowserRouter>
  );
}

export default App;
