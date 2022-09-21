import './App.css';
import Liquidity from './pages/Liquidity';
import Swap from './pages/Swap';
import Home from './pages/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './pages/Navbar';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/liquidity' element={<Liquidity />}/>
      <Route path='/swap' element={<Swap />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
