import './App.css';
import Liquidity from './pages/Liquidity';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './pages/Navbar';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Liquidity />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
