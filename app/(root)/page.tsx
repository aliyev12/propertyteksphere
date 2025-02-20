import Hero from "@/components/hero";
import InfoBoxes from "@/components/info-boxes";
import HomeProperties from "@/components/home-properties";
import connectDB from "@/config/database";

const HomePage = () => {
  return (
    <div className="space-y-10 lg:space-y-16">
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
};

export default HomePage;
