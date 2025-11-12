import React from 'react';
import { DollarSign, TrendingUp, Shield, BarChart3 } from 'lucide-react';

const ValuePropositions: React.FC = () => {
  const propositions = [
    {
      icon: DollarSign,
      title: 'Reduce Training Costs',
      subtitle: 'Up to 50% savings',
      description: 'Eliminate licensing fees and reduce implementation costs while maintaining enterprise-grade capabilities.',
      metrics: [
        'No per-user licensing fees',
        'Reduced IT infrastructure costs',
        'Faster deployment timeline'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Boost Engagement',
      subtitle: '80% completion rates',
      description: 'Modern UX and mobile-first design dramatically improve learner engagement and completion rates.',
      metrics: [
        'Microlearning modules increase retention',
        'Gamification drives participation',
        'Mobile access improves completion'
      ]
    },
    {
      icon: Shield,
      title: 'Ensure Compliance',
      subtitle: 'Audit-ready tracking',
      description: 'Automated compliance monitoring and comprehensive audit trails reduce regulatory risks.',
      metrics: [
        'Automated compliance reporting',
        'Complete audit trail',
        'Certification tracking'
      ]
    },
    {
      icon: BarChart3,
      title: 'Prove Impact',
      subtitle: 'Data-driven insights',
      description: 'Analytics tied to business KPIs demonstrate clear ROI and learning program effectiveness.',
      metrics: [
        'Executive dashboards',
        'ROI measurement tools',
        'Predictive analytics'
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-8 bg-background-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-title font-bold text-neutral-900 mb-6">
            Measurable Business Impact
          </h2>
          <p className="text-body-large text-neutral-700 max-w-3xl mx-auto">
            Transform your learning strategy with clear ROI, improved outcomes, and proven results that matter to your bottom line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {propositions.map((prop, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-card shadow-card border border-neutral-100 group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-250 ease-out"
            >
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors duration-200 flex-shrink-0">
                  <prop.icon className="h-6 w-6 text-primary-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-subtitle font-semibold text-neutral-900 mb-1">
                    {prop.title}
                  </h3>
                  <div className="text-sm text-primary-600 font-medium mb-3">
                    {prop.subtitle}
                  </div>
                </div>
              </div>
              
              <p className="text-body text-neutral-700 mb-6 leading-relaxed">
                {prop.description}
              </p>
              
              <ul className="space-y-3">
                {prop.metrics.map((metric, metricIndex) => (
                  <li key={metricIndex} className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-semantic-success rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-body text-neutral-700">
                      {metric}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ROI Statement */}
        <div className="mt-16 text-center bg-primary-50 p-8 rounded-card border border-primary-100">
          <h3 className="text-subtitle font-semibold text-neutral-900 mb-4">
            ROI Proven Across Industries
          </h3>
          <p className="text-body text-neutral-700 mb-6">
            Organizations using our platform report an average ROI of 490% over three years, with measurable improvements 
            in compliance, engagement, and operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200">
              Download ROI Study
            </button>
            <button className="text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;
