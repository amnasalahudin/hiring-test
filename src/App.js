import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Task2 from './components/Task2';
import Task1and3 from './components/Task1and3';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/task1" element={<Task1and3/>} />
          <Route path="/task2" element={<Task2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
