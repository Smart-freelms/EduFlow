import React from 'react';
import { AlertTriangle, Clock, TrendingDown, Settings } from 'lucide-react';

const ProblemStatement: React.FC = () => {
  const problems = [
    {
      icon: Settings,
      title: 'Fragmented Tools',
      description: 'Multiple platforms slow course creation and create integration nightmares'
    },
    {
      icon: TrendingDown,
      title: 'Low Engagement',
      description: 'Traditional LMS tools struggle to motivate learners and maintain completion rates'
    },
    {
      icon: Clock,
      title: 'Unclear ROI',
      description: 'Learning investments lack measurable impact on business outcomes'
    },
    {
      icon: AlertTriangle,
      title: 'Complex Overhead',
      description: 'Expensive implementations require extensive technical resources and maintenance'
    }
  ];

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-8 bg-background-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-title font-bold text-neutral-900 mb-6">
            The LMS Problem Is Clear
          </h2>
          <p className="text-body-large text-neutral-700 max-w-3xl mx-auto">
            Current learning platforms are either too expensive, too complicated, or too limited. 
            It's time for a different approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-card shadow-card border border-neutral-100 text-center group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-250 ease-out"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-200">
                <problem.icon className="h-8 w-8 text-primary-500" />
              </div>
              <h3 className="text-subtitle font-semibold text-neutral-900 mb-4">
                {problem.title}
              </h3>
              <p className="text-body text-neutral-700 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
