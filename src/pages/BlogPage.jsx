import React from 'react';
import BlogCard from '../components/blog/BlogCard';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white pt-32 px-6">
      <h1 className="text-4xl font-infosys-heading text-center text-[#111] mb-10">NSG Solutions Blog</h1>
      <p className="text-center text-gray-500 mb-10">Developer 5: Build the blog listing page and categories here!</p>
      <div className="max-w-4xl mx-auto flex justify-center">
         <BlogCard />
      </div>
    </div>
  );
};

export default BlogPage;
