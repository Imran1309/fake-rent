import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScamScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const ScamScoreGauge = ({ score, size = "md", animated = true }: ScamScoreGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, animated]);

  const getScoreColor = (s: number) => {
    if (s <= 30) return { text: "text-success", bg: "bg-success", glow: "glow-success" };
    if (s <= 60) return { text: "text-warning", bg: "bg-warning", glow: "glow-warning" };
    return { text: "text-danger", bg: "bg-danger", glow: "glow-danger" };
  };

  const getScoreLabel = (s: number) => {
    if (s <= 30) return "Low Risk";
    if (s <= 60) return "Suspicious";
    return "High Risk";
  };

  const colors = getScoreColor(displayScore);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (displayScore / 100) * circumference;

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-36 h-36",
    lg: "w-48 h-48",
  };

  const textSizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
  };

  const labelSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={cn("relative", sizeClasses[size])}>
        {/* Background ring */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          {/* Animated progress ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn(colors.text, "transition-all duration-500")}
            style={{
              filter: `drop-shadow(0 0 8px currentColor)`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-display font-bold", textSizes[size], colors.text)}>
            {displayScore}
          </span>
          <span className={cn("text-muted-foreground", labelSizes[size])}>/ 100</span>
        </div>
      </div>

      {/* Label */}
      <div className={cn(
        "px-4 py-1.5 rounded-full font-medium",
        labelSizes[size],
        colors.bg,
        colors.text === "text-success" ? "text-success-foreground" : 
        colors.text === "text-warning" ? "text-warning-foreground" : 
        "text-danger-foreground"
      )}>
        {getScoreLabel(displayScore)}
      </div>
    </div>
  );
};

export default ScamScoreGauge;
