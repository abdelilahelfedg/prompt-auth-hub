import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

interface GatingBadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export const GatingBadge = ({ variant = "outline" }: GatingBadgeProps) => {
  return (
    <Badge variant={variant} className="inline-flex items-center gap-1">
      <Lock className="w-3 h-3" />
      Premium
    </Badge>
  );
};