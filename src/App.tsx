import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Recipe from './pages/Recipe'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from './components/Loading'
import useLoading from './hooks/useLoading'
import Footer from './components/Footer'

function App() {
  const { loading } = useLoading();

  return (
    <>
    {loading.show && <Loading />}
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        {loading.show ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe" element={<Recipe />} />
          </Routes>
        )}
      </main>
    </Router>

    <Footer />
    </>
  )
}

export default App
