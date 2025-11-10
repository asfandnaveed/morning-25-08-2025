import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes, Route  } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import FirebaseLogin from './pages/Firebase/Login';
import SaveData from './pages/Firebase/SaveData';


function App() {


  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path='/' element={<SaveData />} />
        <Route path='/about' element = {<About />} />
        <Route path='/product' element = {<Product />} />
        <Route path='/product/detail/:id' element = {<ProductDetail />} />

      </Routes>

    </Router>
  );
}

export default App;
