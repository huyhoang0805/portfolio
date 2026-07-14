import { getGitlabSummary } from "@/lib/gitlab";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ProofOfWork } from "./components/ProofOfWork";
import { About } from "./components/About";
import { WorkExperience } from "./components/WorkExperience";
import { TechStack } from "./components/TechStack";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export const revalidate = 21600; // ISR 6h — không gọi GitLab API mỗi request

// Thay đổi max-w tại đây để đồng bộ toàn bộ trang
function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-7xl mx-auto px-6">{children}</div>;
}

export default async function Home() {
  const summary = await getGitlabSummary();

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero full-bleed — background tràn viền, content tự giới hạn max-w bên trong */}
      <Hero totals={summary.totals} />

      <Container>
        <ProofOfWork summary={summary} />
        <About />
        <WorkExperience />
      </Container>

      {/* Full-width — không bọc Container */}
      <TechStack />

      <Container>
        <FeaturedProjects />
        <Contact />
      </Container>

      <Footer />
    </main>
  );
}
