import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ListingAnalyzer from "@/components/ListingAnalyzer";
import SafetyMap from "@/components/SafetyMap";
import CommunityReports from "@/components/CommunityReports";
import Features from "@/components/Features";
import ChatAssistant from "@/components/ChatAssistant";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <div id="analyzer">
          <ListingAnalyzer />
        </div>
        <div id="map">
          <SafetyMap />
        </div>
        <div id="reports">
          <CommunityReports />
        </div>
        <div id="features">
          <Features />
        </div>
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default Index;
