import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Forum from './components/Forum';
import {options} from './config.js'


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard options={options}/>}></Route>
            <Route path="/forum" element={<Forum />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
