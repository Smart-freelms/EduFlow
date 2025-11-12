import React from 'react';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';

const CredibilityWall: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: '50K+',
      label: 'Active Learners',
      description: 'Students and professionals learning daily'
    },
    {
      icon: Globe,
      number: '120+',
      label: 'Countries',
      description: 'Global reach and localization'
    },
    {
      icon: Award,
      number: '98%',
      label: 'Satisfaction Rate',
      description: 'User satisfaction across all features'
    },
    {
      icon: TrendingUp,
      number: '24/7',
      label: 'Uptime Guarantee',
      description: 'Reliable platform availability'
    }
  ];

  const logos = [
    'Harvard University', 'MIT', 'Stanford', 'Google', 'Microsoft', 'Apple', 
    'NASA', 'UNESCO', 'World Bank', 'UNESCO Institute'
  ];

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-8 bg-background-surface">
      <div className="max-w-6xl mx-auto">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-title font-bold text-neutral-900 mb-6">
            Trusted by Educators Worldwide
          </h2>
          <p className="text-body-large text-neutral-700 max-w-3xl mx-auto mb-12">
            Join thousands of educational institutions and organizations that have transformed their learning delivery.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-500" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-neutral-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-neutral-500">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Logos Section */}
        <div className="text-center">
          <p className="text-sm text-neutral-500 uppercase tracking-wider font-medium mb-8">
            Trusted by leading institutions worldwide
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            {logos.map((logo, index) => (
              <div 
                key={index}
                className="text-neutral-400 font-semibold text-sm hover:text-neutral-600 transition-colors duration-200 cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-primary-50 rounded-card border border-primary-100">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary-500 mr-2" />
              <span className="text-primary-700 font-semibold">
                WCAG 2.1 AA Accessibility Certified
              </span>
            </div>
            <p className="text-sm text-primary-600">
              Committed to inclusive education for all learners, regardless of ability or technology access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilityWall;
