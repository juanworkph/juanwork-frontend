export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  category: string;
  imageUrl?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Succeed as a Freelancer in 2025',
    excerpt: 'Learn the essential skills and strategies needed to thrive in the competitive freelance market.',
    author: 'Jane Doe',
    date: 'September 15, 2025',
    category: 'Freelancing',
    tags: ['freelancing', 'career', 'tips'],
  },
  {
    id: '2',
    title: 'Top 10 In-Demand Skills for Remote Workers',
    excerpt: 'Discover which skills are most sought after by employers hiring remote talent.',
    author: 'John Smith',
    date: 'September 10, 2025',
    category: 'Skills',
    tags: ['skills', 'remote work', 'career development'],
  },
  {
    id: '3',
    title: 'Building Your Personal Brand as a Freelancer',
    excerpt: 'Why personal branding matters and how to create a strong online presence to attract clients.',
    author: 'Maria Rodriguez',
    date: 'September 5, 2025',
    category: 'Marketing',
    tags: ['branding', 'marketing', 'freelancing'],
  },
  {
    id: '4',
    title: 'How to Price Your Freelance Services',
    excerpt: 'A comprehensive guide to setting rates that reflect your value and experience.',
    author: 'David Chen',
    date: 'August 28, 2025',
    category: 'Business',
    tags: ['pricing', 'business', 'freelancing'],
  },
  {
    id: '5',
    title: 'Managing Client Relationships Effectively',
    excerpt: 'Tips for building strong, long-lasting relationships with your clients.',
    author: 'Jane Doe',
    date: 'August 20, 2025',
    category: 'Client Relations',
    tags: ['clients', 'communication', 'business'],
  },
  {
    id: '6',
    title: 'The Future of Work: Trends to Watch',
    excerpt: 'Exploring how AI, automation, and remote work are reshaping the job market.',
    author: 'John Smith',
    date: 'August 15, 2025',
    category: 'Future of Work',
    tags: ['future', 'trends', 'technology'],
  },
];

export const categories = [
  'All',
  'Freelancing',
  'Skills',
  'Marketing',
  'Business',
  'Client Relations',
  'Future of Work',
];
