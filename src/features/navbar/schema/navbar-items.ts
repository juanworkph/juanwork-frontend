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
    href: "/about",
  },
  {
    title: "Our Blog",
    href: "/blog",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
  {
    title: "Help Center",
    href: "/help",
  },
];
