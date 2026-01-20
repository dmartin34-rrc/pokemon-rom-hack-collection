import './App.css'
import { CardList } from './components/card.tsx'
import Header from './components/common/header/Header.tsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <CardList/>
      </main>
    </>
  )
}

export default App
