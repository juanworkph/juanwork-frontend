export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

export interface CompanyValue {
  title: string;
  description: string;
  icon?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Jane Doe',
    role: 'CEO & Founder',
    bio: 'Jane has over 15 years of experience in the tech industry and founded JuanWork with a vision to connect talent globally.',
  },
  {
    name: 'John Smith',
    role: 'CTO',
    bio: 'John leads our technical team and has built multiple successful platforms in the freelance marketplace space.',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Head of Operations',
    bio: 'Maria ensures our platform runs smoothly and provides the best experience for both clients and freelancers.',
  },
  {
    name: 'David Chen',
    role: 'Lead Designer',
    bio: 'David brings his creative vision to JuanWork, designing intuitive and beautiful interfaces for our users.',
  },
];

export const companyValues: CompanyValue[] = [
  {
    title: 'Quality',
    description: 'We believe in delivering the highest quality service to our users, ensuring satisfaction for both clients and freelancers.',
    icon: 'star',
  },
  {
    title: 'Transparency',
    description: 'We maintain clear communication and honest practices throughout our platform and business operations.',
    icon: 'eye',
  },
  {
    title: 'Innovation',
    description: 'We continuously evolve our platform with cutting-edge technology to provide the best experience possible.',
    icon: 'lightbulb',
  },
  {
    title: 'Community',
    description: 'We foster a supportive community where professionals can grow, learn, and succeed together.',
    icon: 'users',
  },
];

export const companyHistory = {
  founded: '2020',
  mission: 'To connect talented professionals with opportunities worldwide, breaking down geographical barriers in the job market.',
  vision: 'A world where talent knows no borders and everyone has access to meaningful work opportunities.',
};
