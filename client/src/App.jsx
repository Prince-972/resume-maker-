
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Builder />} />
            <Route path="/welcome" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-100 py-8">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} ResumeMaker. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
