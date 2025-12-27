import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertTriangle, 
  MapPin, 
  User, 
  DollarSign,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Send,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Report {
  id: string;
  type: "fake_listing" | "advance_payment" | "wrong_address" | "fake_owner";
  title: string;
  description: string;
  location: string;
  date: string;
  upvotes: number;
  comments: number;
}

const CommunityReports = () => {
  const [isReporting, setIsReporting] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const reportTypes = [
    { id: "fake_listing", label: "Fake Listing", icon: AlertTriangle },
    { id: "advance_payment", label: "Advance Payment Fraud", icon: DollarSign },
    { id: "wrong_address", label: "Wrong Address", icon: MapPin },
    { id: "fake_owner", label: "Fake Owner", icon: User },
  ];

  const recentReports: Report[] = [
    {
      id: "1",
      type: "fake_listing",
      title: "Suspicious studio in Downtown",
      description: "Listing uses photos from a hotel in another city. Owner asked for deposit before viewing.",
      location: "123 Main St, Downtown",
      date: "2 hours ago",
      upvotes: 24,
      comments: 8,
    },
    {
      id: "2",
      type: "advance_payment",
      title: "Broker demanded 3 months upfront",
      description: "Was asked to wire 3 months rent + deposit before signing any agreement. Very pushy behavior.",
      location: "456 Oak Ave, Westside",
      date: "5 hours ago",
      upvotes: 42,
      comments: 15,
    },
    {
      id: "3",
      type: "wrong_address",
      title: "Address doesn't match photos",
      description: "Visited the location and found a completely different building than what was shown in the listing.",
      location: "789 Pine Rd, Suburbs",
      date: "1 day ago",
      upvotes: 18,
      comments: 6,
    },
  ];

  const getTypeConfig = (type: string) => {
    const configs: Record<string, { color: string; bg: string }> = {
      fake_listing: { color: "text-danger", bg: "bg-danger/10" },
      advance_payment: { color: "text-warning", bg: "bg-warning/10" },
      wrong_address: { color: "text-primary", bg: "bg-primary/10" },
      fake_owner: { color: "text-danger", bg: "bg-danger/10" },
    };
    return configs[type] || { color: "text-muted-foreground", bg: "bg-secondary" };
  };

  return (
    <section className="py-20 relative bg-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Community <span className="gradient-text">Reports</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Help protect fellow renters by reporting suspicious listings. Your reports 
            improve our AI and keep the community safe.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Report Form */}
          {isReporting ? (
            <div className="glass rounded-2xl p-6 md:p-8 mb-8 animate-scale-in">
              <h3 className="text-xl font-semibold mb-6">Submit a Report</h3>
              
              {/* Report Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Type of Issue</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {reportTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "p-3 rounded-lg border text-center transition-all",
                        selectedType === type.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <type.icon className={cn(
                        "w-5 h-5 mx-auto mb-2",
                        selectedType === type.id ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input placeholder="Brief description of the issue..." className="bg-secondary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location / Listing URL</label>
                  <Input placeholder="Address or link to the listing..." className="bg-secondary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Details</label>
                  <Textarea 
                    placeholder="Describe what happened in detail..."
                    className="min-h-[120px] bg-secondary/50"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="hero" className="flex-1">
                  <Send className="w-4 h-4" />
                  Submit Report
                </Button>
                <Button variant="outline" onClick={() => setIsReporting(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full mb-8"
              onClick={() => setIsReporting(true)}
            >
              <AlertTriangle className="w-5 h-5" />
              Report a Scam
            </Button>
          )}

          {/* Recent Reports */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Recent Reports</h3>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {recentReports.map((report, i) => {
                const typeConfig = getTypeConfig(report.type);
                const TypeIcon = reportTypes.find(t => t.id === report.type)?.icon || AlertTriangle;

                return (
                  <div 
                    key={report.id}
                    className="glass-hover rounded-xl p-5 animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn("p-2.5 rounded-lg", typeConfig.bg)}>
                        <TypeIcon className={cn("w-5 h-5", typeConfig.color)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h4 className="font-semibold">{report.title}</h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {report.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {report.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {report.location}
                          </span>
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                            {report.upvotes}
                          </button>
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                            <MessageSquare className="w-3 h-3" />
                            {report.comments}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityReports;
