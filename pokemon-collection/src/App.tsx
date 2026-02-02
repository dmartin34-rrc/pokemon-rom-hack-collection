import { Routes, Route } from 'react-router-dom';
import './App.css';
// components
import Layout from './components/common/Layout';
import { CardList } from './components/card.tsx'
import Header from './components/common/header/Header.tsx'
import Footer from './components/common/footer/footer.tsx'

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
