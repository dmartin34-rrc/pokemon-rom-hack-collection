import { Routes, Route } from 'react-router-dom';
import './App.css';
// components
import Layout from './Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </>
  );
}

export default App;
