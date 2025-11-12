import React from 'react';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 px-6 lg:px-8 bg-background-page">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-title font-bold text-neutral-900 mb-6">
            Ready to Transform Learning?
          </h2>
          <p className="text-body-large text-neutral-700 max-w-3xl mx-auto leading-relaxed">
            Join thousands of educators and organizations who have already made the switch to modern, 
            accessible, and powerful learning tools. Start your free account in under 2 minutes.
          </p>
        </div>

        {/* Main CTA */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-button font-semibold text-lg transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:scale-105 shadow-button group">
              Get Started Free - No Credit Card Required
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="border-2 border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 px-8 py-4 rounded-button font-semibold text-lg transition-all duration-200 ease-out">
              Request Demo
            </button>
          </div>
        </div>

        {/* Quick Setup Promise */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center justify-center text-center">
            <Clock className="h-5 w-5 text-semantic-success mr-2" />
            <span className="text-neutral-700 font-medium">2 minutes to setup</span>
          </div>
          <div className="flex items-center justify-center text-center">
            <CheckCircle className="h-5 w-5 text-semantic-success mr-2" />
            <span className="text-neutral-700 font-medium">No credit card needed</span>
          </div>
          <div className="flex items-center justify-center text-center">
            <CheckCircle className="h-5 w-5 text-semantic-success mr-2" />
            <span className="text-neutral-700 font-medium">Full feature access</span>
          </div>
        </div>

        {/* Urgency/Trust Message */}
        <div className="bg-background-surface p-6 rounded-card border border-neutral-200">
          <p className="text-body text-neutral-600 mb-4">
            <strong className="text-neutral-700">Limited time:</strong> Get priority onboarding and dedicated support for early adopters.
          </p>
          <p className="text-sm text-neutral-500">
            Join the learning revolution. Start building better learning experiences today.
          </p>
        </div>

        {/* Alternative CTA */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 mb-4">
            Not ready to commit? Explore our resources:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors duration-200">
              View Documentation
            </button>
            <button className="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors duration-200">
              Join Community Forum
            </button>
            <button className="text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors duration-200">
              Watch Demo Videos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
