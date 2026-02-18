import { Bell } from "lucide-react";

interface NotificationBadgeProps {
  count: number;
}

export const NotificationBadge = ({ count }: NotificationBadgeProps) => {
  if (count === 0) return null;
  
  return (
    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-medium">
      {count > 99 ? "99+" : count}
    </span>
  );
};
