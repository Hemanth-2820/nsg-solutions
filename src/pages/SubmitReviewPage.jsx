import React from 'react';
import StarRating from '../components/reviews/StarRating';

const SubmitReviewPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fa] pt-32 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-infosys-heading text-[#111] mb-10">Submit a Review</h1>
      <p className="text-gray-500 mb-6">Developer 4: Build the textarea form here!</p>
      <StarRating />
    </div>
  );
};

export default SubmitReviewPage;
