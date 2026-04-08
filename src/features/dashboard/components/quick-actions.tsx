import React from "react";
import { MessageSquare, LayoutGrid, FileText, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const ACTIONS = [
  {
    title: "Post Project",
    icon: FileText,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    href: "/client/projects/new",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    href: "/messages",
  },
  {
    title: "My Portfolio",
    icon: LayoutGrid,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    href: "/freelancer/portfolio",
  },
  {
    title: "Transactions",
    icon: ArrowUpRight,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    href: "/transactions",
  },
];

export function QuickActions() {
  return (
    <div className="p-6 rounded-xl bg-card-accent border border-border">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-secondary/30 hover:bg-secondary transition-all group active:scale-95"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 group-hover:-translate-y-1 transition-transform ${action.iconBg} ${action.iconColor}`}
            >
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-center">{action.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
