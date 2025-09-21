"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/features/blog/schema/blog-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    notFound();
  }

  // This would normally be fetched from a database or API
  const fullContent = post.content || `
    <p>This is a placeholder for the full content of the blog post titled "${post.title}". In a real application, this content would be fetched from a database or API.</p>
    <p>The excerpt for this post is: ${post.excerpt}</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
    <p>Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
    <p>Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.</p>
  `;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <article className="max-w-3xl px-4 py-12 md:py-16">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </Button>
          
          <div className="mb-4">
            <Badge variant="secondary">{post.category}</Badge>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-8">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {post.date}
            </div>
          </div>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: fullContent }} />
          </div>
          
          <div className="mt-8 pt-6 border-t flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="outline">#{tag}</Badge>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
}
