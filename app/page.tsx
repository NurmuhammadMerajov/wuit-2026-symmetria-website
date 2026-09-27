import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import ProblemApproach from '@/components/ProblemApproach';
import EDASection from '@/components/EDASection';
import ResultsTimeline from '@/components/ResultsTimeline';
import LiveDemo from '@/components/LiveDemo';
import TechnicalReport, { Footer } from '@/components/TechnicalReport';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemApproach />
        <EDASection />
        <ResultsTimeline />
        <LiveDemo />
        <TechnicalReport />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
