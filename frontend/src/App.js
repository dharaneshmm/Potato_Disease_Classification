import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import Prediction from "./components/Prediction";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </div>
  );
}

export default App;
