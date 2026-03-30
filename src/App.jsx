import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import ContactPage from './pages/ContactPage';
import InsightsPage from './pages/InsightsPage';
import CareersPage from './pages/CareersPage';
import ClientLoginPage from './pages/ClientLoginPage';
import SubmitReviewPage from './pages/SubmitReviewPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import BlogPage from './pages/BlogPage';
import CareersApplyPage from './pages/CareersApplyPage';

import ITServices from './components/solutions/ITServices';
import VideoProduction from './components/solutions/VideoProduction';
import DigitalMarketing from './components/solutions/DigitalMarketing';
import Publishing from './components/solutions/Publishing';
import BrandingDesign from './components/solutions/BrandingDesign';
import SolutionInquiryPage from './pages/SolutionInquiryPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const location = useLocation();
  // Robust Admin check (case-insensitive and handles various slashes)
  const isAdminRoute = location.pathname.toLowerCase().includes('admin');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-right" />
      <div className={`flex flex-col min-h-screen font-sans ${isAdminRoute ? 'bg-[#0f172a]' : ''}`}>
        {!isAdminRoute && <Navbar />}
        <main className="flex-grow">
          {/* Main application routing configuration */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services/*" element={<ServicesPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/case-studies" element={<InsightsPage />} />
            <Route path="/careers/*" element={<CareersPage />} />
            <Route path="/careers/apply/:role" element={<CareersApplyPage />} />
            <Route path="/client-login" element={<ClientLoginPage />} />
            <Route path="/submit-review" element={<SubmitReviewPage />} />
            
            <Route path="/admin-portal" element={<AdminDashboard />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            
            <Route path="/blog/*" element={<BlogPage />} />

            {/* Solution sub-pages */}
            <Route path="/solutions/itservices" element={<ITServices />} />
            <Route path="/solutions/videoproduction" element={<VideoProduction />} />
            <Route path="/solutions/digitalmarketing" element={<DigitalMarketing />} />
            <Route path="/solutions/publishing" element={<Publishing />} />
            <Route path="/solutions/branding" element={<BrandingDesign />} />
            
            <Route path="/solutions/:service/register/:project" element={<SolutionInquiryPage />} />
            
            {/* Catch-all route to handle 404s cleanly */}
            <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-10">
                    <h1 className="text-8xl font-black text-slate-100 mb-4 opacity-10 italic">404</h1>
                    <p className="text-xl font-bold uppercase tracking-widest text-slate-400">Node Not Found</p>
                    <a href="/" className="mt-8 px-8 py-3 bg-[#007cc3] text-white rounded-full font-bold uppercase tracking-widest text-xs">Return to Main Terminal</a>
                </div>
            } />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
}

export default App;
