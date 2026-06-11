import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { WorkExperience } from "./components/WorkExperience";
import { TechStack } from "./components/TechStack";
import { BrandOrbit } from "./components/BrandOrbit";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

// Thay đổi max-w tại đây để đồng bộ toàn bộ trang
function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-7xl mx-auto px-6">{children}</div>;
}

export default function Home() {
  return (
    <main style={{ background: "#07091a", minHeight: "100vh" }}>
      <Navbar />

      <Container>
        <Hero />
        <About />
        <WorkExperience />
      </Container>

      {/* Full-width — không bọc Container */}
      <TechStack />
      <BrandOrbit />

      <Container>
        <FeaturedProjects />
        <Contact />
      </Container>

      <Footer />
    </main>
  );
}
