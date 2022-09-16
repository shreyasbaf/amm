import './App.css';
import Liquidity from './pages/Liquidity';
import Swap from './pages/Swap';
import Home from './pages/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/liquidity' element={<Liquidity />}/>
      <Route path='/swap' element={<Swap />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
