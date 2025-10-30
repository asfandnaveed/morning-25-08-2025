import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes, Route  } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';


function App() {


  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/about' element = {<About />} />
        <Route path='/product' element = {<Product />} />

      </Routes>

    </Router>
  );
}

export default App;
