
import { Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Coin from './Pages/Coin/Coin';
import Features from './Pages/Features/Features';
import Pricing from './Pages/Pricing/Pricing';
import Blog from './Pages/Blog/Blog';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      {/* Routes for multipage navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/coin/:coinid' element={<Coin/>}/>
        <Route path='/features' element={<Features/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/blogs' element={<Blog/>}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;