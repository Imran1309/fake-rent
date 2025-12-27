import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Search, 
  Shield, 
  AlertTriangle, 
  Info,
  Layers,
  ZoomIn,
  ZoomOut
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Zone {
  id: string;
  name: string;
  status: "safe" | "caution" | "danger";
  reports: number;
  lat: number;
  lng: number;
}

const SafetyMap = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  // Demo zones
  const zones: Zone[] = [
    { id: "1", name: "Downtown Core", status: "safe", reports: 12, lat: 40, lng: -74 },
    { id: "2", name: "University District", status: "safe", reports: 8, lat: 41, lng: -73 },
    { id: "3", name: "Westside", status: "caution", reports: 45, lat: 39, lng: -75 },
    { id: "4", name: "Industrial Zone", status: "danger", reports: 89, lat: 38, lng: -76 },
    { id: "5", name: "Suburb Heights", status: "safe", reports: 5, lat: 42, lng: -72 },
  ];

  const statusConfig = {
    safe: {
      color: "bg-success",
      border: "border-success",
      text: "text-success",
      label: "Verified Safe",
      icon: Shield,
    },
    caution: {
      color: "bg-warning",
      border: "border-warning",
      text: "text-warning",
      label: "Use Caution",
      icon: AlertTriangle,
    },
    danger: {
      color: "bg-danger",
      border: "border-danger",
      text: "text-danger",
      label: "High Risk",
      icon: AlertTriangle,
    },
  };

  return (
    <section className="py-20 relative">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Safety <span className="gradient-text">Heatmap</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore neighborhoods with our community-powered safety map. See verified zones, 
            reported scams, and make informed decisions about where to rent.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden">
            {/* Map Controls */}
            <div className="p-4 border-b border-border flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by address or neighborhood..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Layers className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Map Area */}
            <div className="relative h-[400px] md:h-[500px] bg-secondary/30">
              {/* Simulated map background */}
              <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-30" />
              
              {/* Demo zones on map */}
              <div className="absolute inset-0 p-8">
                {zones.map((zone, i) => {
                  const config = statusConfig[zone.status];
                  return (
                    <button
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className={cn(
                        "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                        "hover:scale-110 hover:z-10",
                        selectedZone?.id === zone.id && "scale-125 z-20"
                      )}
                      style={{
                        left: `${20 + (i * 15)}%`,
                        top: `${25 + (i * 12)}%`,
                      }}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center",
                        config.color,
                        "shadow-lg"
                      )}>
                        <MapPin className="w-6 h-6 text-background" />
                      </div>
                      {/* Pulse effect for danger zones */}
                      {zone.status === "danger" && (
                        <div className={cn(
                          "absolute inset-0 rounded-full animate-pulse-ring",
                          config.color,
                          "opacity-50"
                        )} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Zone Info Popup */}
              {selectedZone && (
                <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 glass rounded-xl p-4 animate-scale-in">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{selectedZone.name}</h4>
                      <div className={cn(
                        "inline-flex items-center gap-1 text-xs font-medium mt-1",
                        statusConfig[selectedZone.status].text
                      )}>
                        {(() => {
                          const StatusIcon = statusConfig[selectedZone.status].icon;
                          return <StatusIcon className="w-3 h-3" />;
                        })()}
                        {statusConfig[selectedZone.status].label}
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedZone(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </button>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium text-foreground">{selectedZone.reports}</span> scam reports in the last 30 days
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Info className="w-4 h-4" />
                    View Full Report
                  </Button>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-border flex flex-wrap gap-6 justify-center">
              {Object.entries(statusConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", config.color)} />
                  <span className="text-sm text-muted-foreground">{config.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyMap;
