import { Button } from "@/components/ui/button";
import { Shield, Search, AlertTriangle, ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollToAnalyzer = () => {
    document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-20" />
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-warning/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "4s" }} />

      {/* Shield animation */}
      <div className="absolute top-1/4 right-[15%] hidden lg:block">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-ring">
            <Shield className="w-24 h-24 text-primary/20" />
          </div>
          <Shield className="w-24 h-24 text-primary/40 animate-float" />
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered Protection for Renters
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Find homes,{" "}
            <span className="gradient-text">not scams</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            RentAlert uses advanced AI, reverse image search, and community intelligence 
            to protect you from rental fraud. Verify any listing in seconds.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-foreground">50K+</div>
              <div className="text-sm text-muted-foreground">Scams Detected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-success">$2.4M</div>
              <div className="text-sm text-muted-foreground">Saved for Renters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">Detection Accuracy</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button variant="hero" size="xl" onClick={scrollToAnalyzer}>
              <Search className="w-5 h-5" />
              Analyze a Listing
            </Button>
            <Button variant="hero-outline" size="xl">
              <AlertTriangle className="w-5 h-5" />
              Report a Scam
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <span className="text-sm">Trusted by:</span>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Shield className="w-4 h-4 text-primary" />
              Students
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Shield className="w-4 h-4 text-success" />
              Migrants
            </div>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Shield className="w-4 h-4 text-warning" />
              First-time Renters
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToAnalyzer}
            className="p-2 rounded-full glass hover:bg-card/90 transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
