"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialLoginButtonProps {
  provider: string;
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SocialLoginButton({
  provider,
  icon,
  className,
  onClick,
}: SocialLoginButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      alert(`${provider} login coming soon!`);
    }
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "flex items-center justify-center gap-2 p-3 h-auto text-sm font-medium",
        className,
      )}
      onClick={handleClick}
    >
      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
        {icon}
      </span>
      <span>{provider}</span>
    </Button>
  );
}
