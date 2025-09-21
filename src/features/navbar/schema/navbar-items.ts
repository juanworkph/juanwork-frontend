export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export const publicNavItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/landing/about",
  },
  {
    title: "Our Blog",
    href: "/landing/blog",
  },
  {
    title: "Contact Us",
    href: "/landing/contact",
  },
  {
    title: "Help Center",
    href: "/landing/help",
  },
];
