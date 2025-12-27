import { cn } from "@/lib/utils";
import { LucideIcon, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface RiskFactorCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  status: "safe" | "warning" | "danger";
  details?: string;
  delay?: number;
}

const RiskFactorCard = ({ 
  icon: Icon, 
  title, 
  description, 
  status, 
  details,
  delay = 0 
}: RiskFactorCardProps) => {
  const statusConfig = {
    safe: {
      bg: "bg-success/10 hover:bg-success/15",
      border: "border-success/30",
      icon: CheckCircle2,
      iconColor: "text-success",
      glow: "hover:shadow-success/20",
    },
    warning: {
      bg: "bg-warning/10 hover:bg-warning/15",
      border: "border-warning/30",
      icon: AlertCircle,
      iconColor: "text-warning",
      glow: "hover:shadow-warning/20",
    },
    danger: {
      bg: "bg-danger/10 hover:bg-danger/15",
      border: "border-danger/30",
      icon: XCircle,
      iconColor: "text-danger",
      glow: "hover:shadow-danger/20",
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div 
      className={cn(
        "group relative p-5 rounded-xl border transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        config.bg,
        config.border,
        config.glow,
        "animate-fade-in-up opacity-0"
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "p-2.5 rounded-lg",
          status === "safe" ? "bg-success/20" :
          status === "warning" ? "bg-warning/20" :
          "bg-danger/20"
        )}>
          <Icon className={cn("w-5 h-5", config.iconColor)} />
        </div>
        <StatusIcon className={cn("w-5 h-5", config.iconColor)} />
      </div>

      {/* Content */}
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      
      {details && (
        <p className={cn(
          "text-xs font-medium",
          config.iconColor
        )}>
          {details}
        </p>
      )}

      {/* Decorative corner */}
      <div className={cn(
        "absolute top-0 right-0 w-16 h-16 opacity-10 rounded-tr-xl overflow-hidden",
        status === "safe" ? "bg-gradient-to-bl from-success" :
        status === "warning" ? "bg-gradient-to-bl from-warning" :
        "bg-gradient-to-bl from-danger"
      )} />
    </div>
  );
};

export default RiskFactorCard;
