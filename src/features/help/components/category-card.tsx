import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FAQCategory } from '../schema/help-center-data';
import { 
  Rocket, 
  User, 
  Briefcase, 
  Building, 
  CreditCard, 
  Shield 
} from 'lucide-react';

interface CategoryCardProps {
  category: FAQCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  // Map of icon names to their components
  const iconMap: Record<string, React.ReactNode> = {
    rocket: <Rocket className="h-8 w-8 text-primary" />,
    user: <User className="h-8 w-8 text-primary" />,
    briefcase: <Briefcase className="h-8 w-8 text-primary" />,
    building: <Building className="h-8 w-8 text-primary" />,
    'credit-card': <CreditCard className="h-8 w-8 text-primary" />,
    shield: <Shield className="h-8 w-8 text-primary" />,
  };

  return (
    <Link href={`/help/${category.id}`}>
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
        <CardHeader>
          <div className="mb-2">
            {category.icon && iconMap[category.icon]}
          </div>
          <CardTitle>{category.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
