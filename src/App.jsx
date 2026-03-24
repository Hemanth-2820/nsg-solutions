import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import ContactPage from './pages/ContactPage';
import InsightsPage from './pages/InsightsPage';
import CareersPage from './pages/CareersPage';
import PortfolioPage from './pages/PortfolioPage';
import ClientLoginPage from './pages/ClientLoginPage';
import SubmitReviewPage from './pages/SubmitReviewPage';
import BlogPage from './pages/BlogPage';

import { ReactLenis } from '@studio-freight/react-lenis';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/case-studies" element={<InsightsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/client-login" element={<ClientLoginPage />} />
              <Route path="/submit-review" element={<SubmitReviewPage />} />
              <Route path="/blog" element={<BlogPage />} />
            </Routes>
          </main>
          <Footer />
      </div>
    </Router>
  );
}

export default App;
