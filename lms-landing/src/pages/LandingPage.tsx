import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProblemStatement from '../components/ProblemStatement';
import FeatureGrid from '../components/FeatureGrid';
import FeatureDetails from '../components/FeatureDetails';
import BenefitsSection from '../components/BenefitsSection';
import CredibilityWall from '../components/CredibilityWall';
import FreePositioning from '../components/FreePositioning';
import ValuePropositions from '../components/ValuePropositions';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background-page text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <ProblemStatement />
        <FeatureGrid />
        <FeatureDetails />
        <BenefitsSection />
        <CredibilityWall />
        <FreePositioning />
        <ValuePropositions />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
