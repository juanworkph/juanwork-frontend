import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogPost } from '../schema/blog-data';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video relative bg-muted">
        {post.imageUrl ? (
          <Image 
            src={post.imageUrl} 
            alt={post.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground/30 text-lg">JuanWork Blog</span>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{post.category}</Badge>
        </div>
        <CardTitle className="line-clamp-2">
          <Link href={`/blog/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">By {post.author}</div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          {post.date}
        </div>
      </CardFooter>
    </Card>
  );
}
