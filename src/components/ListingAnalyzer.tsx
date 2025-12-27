import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Link, 
  FileText, 
  Image as ImageIcon, 
  Loader2,
  Camera,
  MapPin,
  DollarSign,
  User,
  FileWarning,
  CheckCircle2
} from "lucide-react";
import ScamScoreGauge from "./ScamScoreGauge";
import RiskFactorCard from "./RiskFactorCard";
import { cn } from "@/lib/utils";

type UploadType = "image" | "url" | "text";

interface AnalysisResult {
  score: number;
  factors: {
    icon: any;
    title: string;
    description: string;
    status: "safe" | "warning" | "danger";
    details?: string;
  }[];
}

const ListingAnalyzer = () => {
  const [activeTab, setActiveTab] = useState<UploadType>("image");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [textInput, setTextInput] = useState("");

  const tabs = [
    { type: "image" as const, icon: ImageIcon, label: "Upload Images" },
    { type: "url" as const, icon: Link, label: "Paste URL" },
    { type: "text" as const, icon: FileText, label: "Paste Text" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Demo result - in production this would come from AI
    const demoResult: AnalysisResult = {
      score: 72,
      factors: [
        {
          icon: Camera,
          title: "Image Authenticity",
          description: "Multiple images found on other listing sites",
          status: "danger",
          details: "3 matches found on different platforms",
        },
        {
          icon: DollarSign,
          title: "Price Analysis",
          description: "Listed 35% below area average",
          status: "warning",
          details: "Avg. rent in area: $1,800/mo",
        },
        {
          icon: MapPin,
          title: "Location Verification",
          description: "Address matches listing description",
          status: "safe",
          details: "Verified with Google Maps",
        },
        {
          icon: User,
          title: "Owner Verification",
          description: "No verified owner profile found",
          status: "warning",
          details: "Profile created 2 days ago",
        },
        {
          icon: FileWarning,
          title: "Language Analysis",
          description: "Urgency language detected",
          status: "danger",
          details: '"Act now", "Limited time" phrases found',
        },
        {
          icon: CheckCircle2,
          title: "Contact Information",
          description: "Phone number appears legitimate",
          status: "safe",
          details: "Registered to local carrier",
        },
      ],
    };

    setResult(demoResult);
    setIsAnalyzing(false);
  };

  const hasInput = uploadedFiles.length > 0 || urlInput.trim() || textInput.trim();

  return (
    <section id="analyzer" className="py-20 relative">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Analyze Any <span className="gradient-text">Rental Listing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload screenshots, paste a URL, or copy the listing text. Our AI will 
            analyze it for potential red flags and scam indicators.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Card */}
          <div className="glass rounded-2xl p-6 md:p-8 mb-8">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map(tab => (
                <button
                  key={tab.type}
                  onClick={() => setActiveTab(tab.type)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all",
                    activeTab === tab.type
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Upload Area */}
            {activeTab === "image" && (
              <div className="space-y-4">
                <label className="block">
                  <div className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                    "hover:border-primary/50 hover:bg-primary/5",
                    uploadedFiles.length > 0 ? "border-primary/50" : "border-border"
                  )}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-foreground font-medium mb-1">
                      Drop images here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG up to 10MB each
                    </p>
                  </div>
                </label>

                {uploadedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((file, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm">
                        <ImageIcon className="w-4 h-4 text-primary" />
                        <span className="truncate max-w-[150px]">{file.name}</span>
                        <button 
                          onClick={() => setUploadedFiles(prev => prev.filter((_, j) => j !== i))}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "url" && (
              <Input
                type="url"
                placeholder="https://example.com/rental-listing..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="h-12 bg-secondary/50"
              />
            )}

            {activeTab === "text" && (
              <Textarea
                placeholder="Paste the listing description here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-[150px] bg-secondary/50 resize-none"
              />
            )}

            {/* Analyze Button */}
            <Button
              variant="hero"
              size="lg"
              className="w-full mt-6"
              disabled={!hasInput || isAnalyzing}
              onClick={handleAnalyze}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Listing...
                </>
              ) : (
                <>
                  Analyze for Scams
                </>
              )}
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-8 animate-fade-in-up">
              {/* Score */}
              <div className="glass rounded-2xl p-8 text-center">
                <h3 className="text-xl font-semibold mb-6">Scam Probability Score</h3>
                <ScamScoreGauge score={result.score} size="lg" />
                <p className="mt-6 text-muted-foreground max-w-md mx-auto">
                  This listing shows multiple warning signs. We recommend proceeding 
                  with extreme caution or avoiding this listing entirely.
                </p>
              </div>

              {/* Risk Factors */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Risk Analysis Breakdown</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.factors.map((factor, i) => (
                    <RiskFactorCard
                      key={i}
                      icon={factor.icon}
                      title={factor.title}
                      description={factor.description}
                      status={factor.status}
                      details={factor.details}
                      delay={i * 100}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListingAnalyzer;
