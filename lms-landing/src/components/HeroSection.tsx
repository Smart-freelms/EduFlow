import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="pt-32 pb-24 lg:pb-32 px-6 lg:px-8 bg-background-page">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Headline */}
        <h1 className="text-hero lg:text-5xl xl:text-hero font-bold text-neutral-900 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out">
          Powerful Learning.{' '}
          <span className="text-primary-500">Unlimited Access.</span>{' '}
          Completely Free.
        </h1>

        {/* Subheadline */}
        <p className="text-body-large text-neutral-700 max-w-3xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out delay-100">
          Enterprise-grade LMS with AI-powered personalization, mobile-first design, and modern analytics. 
          No credit card required. No limits. Just world-class learning for everyone.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out delay-200">
          {/* Primary CTA */}
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-button font-semibold text-base transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:scale-105 shadow-button group">
            Get Started Free
            <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          {/* Secondary CTA */}
          <button className="border-2 border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 px-8 py-4 rounded-button font-semibold text-base transition-all duration-200 ease-out flex items-center group">
            <Play className="mr-2 h-4 w-4" />
            See How It Works
          </button>
        </div>

        {/* Trust Badge */}
        <div className="text-sm text-neutral-500 animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out delay-300">
          No credit card required • Free forever • 2 minute setup • Join thousands worldwide
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
