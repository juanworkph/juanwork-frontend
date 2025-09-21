"use client";

import React, { useState } from 'react';
import { BlogCard } from '@/features/blog/components/blog-card';
import { CategoryFilter } from '@/features/blog/components/category-filter';
import { blogPosts } from '@/features/blog/schema/blog-data';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Blog</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Insights, tips, and trends for freelancers and businesses.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="px-4 md:px-6">
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
