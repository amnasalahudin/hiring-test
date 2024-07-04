import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Task1 from './components/Task1';
import Task2 from './components/Task2';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/task1" element={<Task1/>} />
          <Route path="/task2" element={<Task2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
