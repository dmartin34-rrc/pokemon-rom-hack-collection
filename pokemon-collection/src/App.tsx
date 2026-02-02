import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout.tsx';
import CardList from './components/card/CardList.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CardList />} />
      </Route>
    </Routes>
  );
}

export default App;
