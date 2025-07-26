import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/aos/aos.css';
import './assets/vendor/swiper/swiper-bundle.min.css';
import './assets/css/main.css';
import Home from './pages/Home';
import Inicio from './pages/Inicio';

export default function App() {
  return (
    <Router basename="/legistrack">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Inicio />} /> 
      </Routes>
    </Router>
  );
}
