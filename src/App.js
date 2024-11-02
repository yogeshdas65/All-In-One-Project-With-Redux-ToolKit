import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ProductDetails from './pages/ProductDetails';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/products/:pid" element={<ProductDetails />} />
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
