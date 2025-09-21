export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
}

export const faqCategories: FAQCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Basic information about using JuanWork',
    icon: 'rocket',
  },
  {
    id: 'account',
    title: 'Account & Profile',
    description: 'Managing your account and profile settings',
    icon: 'user',
  },
  {
    id: 'freelancers',
    title: 'For Freelancers',
    description: 'Information for freelancers using the platform',
    icon: 'briefcase',
  },
  {
    id: 'clients',
    title: 'For Clients',
    description: 'Information for clients looking to hire talent',
    icon: 'building',
  },
  {
    id: 'payments',
    title: 'Payments & Billing',
    description: 'Questions about payments, fees, and billing',
    icon: 'credit-card',
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    description: 'Information about security and privacy practices',
    icon: 'shield',
  },
];

export const faqItems: FAQItem[] = [
  {
    id: '1',
    question: 'How do I create an account on JuanWork?',
    answer: 'To create an account, click on the "Sign Up" button in the top right corner of the homepage. You\'ll be asked to provide your email address, create a password, and select whether you\'re joining as a freelancer or a client. Follow the prompts to complete your profile setup.',
    categoryId: 'getting-started',
  },
  {
    id: '2',
    question: 'Is it free to join JuanWork?',
    answer: 'Yes, creating an account on JuanWork is completely free for both freelancers and clients. We only charge fees when a project is successfully completed or for premium features.',
    categoryId: 'getting-started',
  },
  {
    id: '3',
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on the "Login" button, then select "Forgot Password". Enter the email address associated with your account, and we\'ll send you instructions to reset your password.',
    categoryId: 'account',
  },
  {
    id: '4',
    question: 'How do I update my profile information?',
    answer: 'Log in to your account, click on your profile picture in the top right corner, and select "Settings". From there, you can update your personal information, skills, portfolio, and other profile details.',
    categoryId: 'account',
  },
  {
    id: '5',
    question: 'How do I find jobs on JuanWork?',
    answer: 'After logging in as a freelancer, navigate to the "Find Jobs" section. You can browse available projects, filter by category, skill requirements, budget, and more. When you find a suitable project, you can submit a proposal.',
    categoryId: 'freelancers',
  },
  {
    id: '6',
    question: 'How do I submit a proposal for a project?',
    answer: 'When viewing a project that interests you, click the "Submit Proposal" button. You\'ll need to specify your rate, estimated completion time, and write a cover letter explaining why you\'re the right fit for the project.',
    categoryId: 'freelancers',
  },
  {
    id: '7',
    question: 'How do I post a job on JuanWork?',
    answer: 'After logging in as a client, click on "Post a Job" in the navigation menu. Fill out the project details, including title, description, required skills, budget, and timeline. Once submitted, freelancers can start sending proposals.',
    categoryId: 'clients',
  },
  {
    id: '8',
    question: 'How do I hire a freelancer?',
    answer: 'After posting a job, you\'ll receive proposals from interested freelancers. Review their profiles, portfolios, and proposals. When you find the right candidate, click "Hire" on their proposal and follow the instructions to initiate the contract.',
    categoryId: 'clients',
  },
  {
    id: '9',
    question: 'What payment methods are accepted?',
    answer: 'JuanWork accepts major credit cards, debit cards, PayPal, and bank transfers. The available payment methods may vary depending on your location.',
    categoryId: 'payments',
  },
  {
    id: '10',
    question: 'How does the payment protection work?',
    answer: 'JuanWork holds the client\'s payment in escrow until the project is completed to the client\'s satisfaction. This protects both parties - clients only pay for work they approve, and freelancers are guaranteed payment for completed work.',
    categoryId: 'payments',
  },
  {
    id: '11',
    question: 'Is my personal information secure on JuanWork?',
    answer: 'Yes, JuanWork takes security very seriously. We use industry-standard encryption to protect your personal and financial information. We never share your private data with third parties without your consent.',
    categoryId: 'security',
  },
  {
    id: '12',
    question: 'How does JuanWork verify freelancers and clients?',
    answer: 'JuanWork uses a multi-step verification process that may include email verification, phone verification, ID verification, and portfolio review for freelancers. This helps ensure a safe and trustworthy marketplace for all users.',
    categoryId: 'security',
  },
];
