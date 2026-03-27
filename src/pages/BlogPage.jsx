import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogsHero from "../components/blog/BlogsHero";
import BlogsFeatured from "../components/blog/BlogsFeatured";
import BlogsCategories from "../components/blog/BlogsCategories";
import BlogsGrid from "../components/blog/BlogsGrid";
import BlogsTrending from "../components/blog/BlogsTrending";
import BlogsTopics from "../components/blog/BlogsTopics";
import BlogsAuthors from "../components/blog/BlogsAuthors";
import BlogsSubscribe from "../components/blog/BlogsSubscribe";
import BlogsCTA from "../components/blog/BlogsCTA";
import BlogPostPage from "./BlogPostPage";

const BlogIndex = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen bg-[#0a0f16] text-white font-sans">
      <BlogsHero />
      <BlogsFeatured />
      <BlogsCategories active={activeCategory} setActive={setActiveCategory} />
      <BlogsGrid activeCategory={activeCategory} />
      <BlogsTrending />
      <BlogsTopics />
      <BlogsAuthors />
      <BlogsSubscribe />
      <BlogsCTA />
    </div>
  );
};

const BlogPage = () => {
  return (
    <Routes>
      <Route index element={<BlogIndex />} />
      <Route path="post/:id" element={<BlogPostPage />} />
    </Routes>
  );
};

export default BlogPage;