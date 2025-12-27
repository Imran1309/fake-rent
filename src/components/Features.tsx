import { 
  Shield, 
  Brain, 
  Image, 
  MapPin, 
  Users, 
  MessageSquare,
  Zap,
  Lock,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning models analyze listing patterns, language, and metadata to detect scams with 98% accuracy.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Image,
      title: "Reverse Image Search",
      description: "Instantly check if listing photos are stolen, reused, AI-generated, or unrealistically enhanced.",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: MapPin,
      title: "Location Intelligence",
      description: "Verify addresses, compare with area averages, and see community-powered safety heatmaps.",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      icon: Users,
      title: "Community Reports",
      description: "Tap into the collective knowledge of thousands of renters who report suspicious activities.",
      color: "text-danger",
      bg: "bg-danger/10",
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Get instant answers about rental safety, legal advice, document checklists, and negotiation tips.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your data is encrypted and never shared. We analyze listings, not your personal information.",
      color: "text-success",
      bg: "bg-success/10",
    },
  ];

  const stats = [
    { icon: Zap, value: "<3s", label: "Analysis Time" },
    { icon: Shield, value: "50K+", label: "Scams Blocked" },
    { icon: Globe, value: "150+", label: "Cities Covered" },
  ];

  return (
    <section className="py-20 relative">
      <div className="container px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Why Choose <span className="gradient-text">RentAlert</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine cutting-edge AI technology with community intelligence to 
            provide the most comprehensive rental scam protection available.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, i) => (
            <div
              key={i}
              className={cn(
                "group glass-hover rounded-2xl p-6 relative overflow-hidden",
                "animate-fade-in-up opacity-0"
              )}
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
            >
              {/* Icon */}
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", feature.bg)}>
                <feature.icon className={cn("w-6 h-6", feature.color)} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>

              {/* Hover gradient */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                "bg-gradient-to-br from-transparent via-transparent",
                feature.color === "text-primary" && "to-primary/5",
                feature.color === "text-success" && "to-success/5",
                feature.color === "text-warning" && "to-warning/5",
                feature.color === "text-danger" && "to-danger/5",
              )} />
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="glass rounded-2xl p-8">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
