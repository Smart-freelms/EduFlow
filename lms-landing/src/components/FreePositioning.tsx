import React from 'react';
import { Heart, Shield, Infinity } from 'lucide-react';

const FreePositioning: React.FC = () => {
  return (
    <section id="pricing" className="py-16 lg:py-24 px-6 lg:px-8 bg-background-page">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Infinity className="h-10 w-10 text-primary-500" />
          </div>
          
          <h2 className="text-title font-bold text-neutral-900 mb-6">
            Free to Use. Not Free to Make.
          </h2>
          
          <p className="text-body-large text-neutral-700 max-w-3xl mx-auto leading-relaxed mb-8">
            We believe education should be accessible to everyone, everywhere. Our mission is to democratize 
            world-class learning tools without hidden fees, usage limits, or compromises in quality.
          </p>
        </div>

        {/* Free Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-semantic-success bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-semantic-success" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              No Hidden Fees
            </h3>
            <p className="text-neutral-600">
              Complete transparency. What you see is what you get.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-semantic-success bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Infinity className="h-6 w-6 text-semantic-success" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Unlimited Access
            </h3>
            <p className="text-neutral-600">
              No usage limits, no feature restrictions, no time constraints.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-semantic-success bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-semantic-success" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Mission-Driven
            </h3>
            <p className="text-neutral-600">
              Built by educators, for educators, with a purpose beyond profit.
            </p>
          </div>
        </div>

        {/* Call to Support */}
        <div className="bg-background-surface p-8 rounded-card border border-neutral-200 mb-8">
          <h3 className="text-subtitle font-semibold text-neutral-900 mb-4">
            Help Us Keep It Free
          </h3>
          <p className="text-body text-neutral-700 mb-6">
            If our platform helps you achieve your learning goals, consider supporting our mission. 
            Your contribution helps us maintain and improve the platform for everyone.
          </p>
          <button className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-6 py-3 rounded-button font-semibold text-base transition-all duration-200 ease-out">
            Support Our Mission
          </button>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-500 mb-2">100%</div>
            <div className="text-neutral-600">Open Source</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500 mb-2">∞</div>
            <div className="text-neutral-600">Lifetime Value</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreePositioning;
