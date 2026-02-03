import { Routes, Route } from 'react-router-dom';
// components
import Layout from './components/common/Layout.tsx';
import CardList from './components/card/CardList.tsx';
import RomDirectory from './components/directory/RomDirectory.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CardList />} />
        <Route path="directory" element={<RomDirectory />} />
      </Route>
    </Routes>
  );
}

export default App;
