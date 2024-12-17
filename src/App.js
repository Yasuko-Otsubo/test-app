import './App.css';
import BlogPage from './components/BlogPage';
import FormPage from './FormPage/index';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App = () => {
   return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* id を動的に受け取るために :id と記述 */}
          <Route path='/posts/:id' element={<BlogPage />} />
          <Route path="/form_page" element={<FormPage />} />

        </Routes>
      </Router>
    </div>
  );
}
