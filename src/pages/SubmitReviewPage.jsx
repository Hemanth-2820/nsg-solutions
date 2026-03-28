import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Briefcase, CheckCircle } from 'lucide-react';
import StarRating from '../components/reviews/StarRating';

const SubmitReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const clientData = JSON.parse(localStorage.getItem('nsg_client_user'));
    if (!clientData || !clientData.id) {
      setError('Session expired. Please login again.');
      return;
    }

    try {
      const response = await fetch('/api/submit_feedback.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          client_id: clientData.id, 
          content: content 
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        setIsSubmitted(true);
      } else {
        setError(data.message || 'Submission failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] pt-32 pb-24 px-6 flex items-center justify-center font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#334155] p-12 rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center max-w-lg text-center"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="font-infosys-heading text-3xl text-white mb-4">Review Submitted</h2>
          <p className="text-white/60 mb-8 leading-[1.6]">
            Thank you for your valuable feedback. Your insights help us continue to deliver premium IT solutions.
          </p>
          <button 
            onClick={() => { setIsSubmitted(false); setRating(0); }}
            className="bg-[#007cc3] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-white hover:text-[#111] transition-all"
          >
            Submit Another
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] pt-32 pb-24 px-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-infosys-heading text-[#1E293B] mb-4">Share Your Experience</h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-[1.6]">
            Your feedback is critical to our continuous improvement. Please rate the recent project delivery and share your thoughts.
          </p>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Project Select */}
            <div className="relative">
              <select defaultValue="" required className="w-full bg-[#334155] rounded-sm px-6 py-5 text-white focus:ring-1 focus:ring-white/20 outline-none appearance-none cursor-pointer">
                <option value="" disabled className="text-white/50">SELECT PROJECT (Choose a completed project...)</option>
                <option value="cloud" className="text-black bg-white">Cloud Migration Enterprise</option>
                <option value="ai" className="text-black bg-white">AI Recommendation Engine</option>
                <option value="sap" className="text-black bg-white">SAP ERP Implementation</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-white/60">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                </svg>
              </div>
            </div>

            {/* Overall Rating */}
            <div className="bg-[#334155] rounded-sm px-6 py-5 flex md:flex-row flex-col items-start md:items-center justify-between gap-4">
              <span className="text-white font-medium">OVERALL RATING</span>
              <div className="flex flex-col items-start md:items-end gap-2">
                 <StarRating rating={rating} setRating={setRating} />
                 <span className="text-sm font-medium text-white/40">
                   {rating === 0 ? "Click to rate" : `${rating} out of 5 stars`}
                 </span>
              </div>
            </div>

            {/* Detailed Feedback */}
            <div className="relative">
              <textarea 
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="DETAILED FEEDBACK: Tell us about the quality of delivery, communication, and overall impact..." 
                className="w-full bg-[#334155] rounded-sm px-6 py-5 text-white placeholder-white/50 focus:ring-1 focus:ring-white/20 outline-none resize-none"
                required
              ></textarea>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 font-bold uppercase tracking-widest text-[10px] mt-2">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-4 flex justify-start">
              <button 
                type="submit"
                disabled={rating === 0 || !content}
                className={`px-8 py-3 rounded-sm font-semibold transition-all ${
                  (rating === 0 || !content)
                    ? 'bg-[#334155]/50 text-white/50 cursor-not-allowed' 
                    : 'bg-[#334155] text-white hover:bg-[#1e293b]'
                }`}
              >
                Submit Review
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SubmitReviewPage;
