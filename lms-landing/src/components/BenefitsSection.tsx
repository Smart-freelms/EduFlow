import React from 'react';
import { GraduationCap, User, Shield } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: GraduationCap,
      title: 'For Teachers & Educators',
      subtitle: 'Create, track, and inspire',
      benefits: [
        'Free tools without feature limitations',
        'Mastery-based learning guidance and tracking',
        'Gradebook with SpeedGrader-style efficiency',
        'Real-time student progress monitoring',
        'Content library with collaborative sharing'
      ]
    },
    {
      icon: User,
      title: 'For Students & Learners',
      subtitle: 'Learn at your own pace',
      benefits: [
        'Free access to world-class education',
        'AI-powered personalized learning paths',
        'Mobile apps with offline capabilities',
        'Instant feedback and progress tracking',
        'Social learning communities and peer support'
      ]
    },
    {
      icon: Shield,
      title: 'For Administrators',
      subtitle: 'Scale and measure impact',
      benefits: [
        'Enterprise-grade analytics and reporting',
        'Compliance tracking and audit trails',
        'Single sign-on and user management',
        'Scalable infrastructure for growth',
        'Integration with existing systems and APIs'
      ]
    }
  ];

  return (
    <section id="benefits" className="py-16 lg:py-24 px-6 lg:px-8 bg-background-page">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-title font-bold text-neutral-900 mb-6">
            Built for Every Learning Journey
          </h2>
          <p className="text-body-large text-neutral-700 max-w-3xl mx-auto">
            Whether you're teaching, learning, or managing programs, our platform adapts to your unique needs and goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-card shadow-card border border-neutral-100 group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-250 ease-out"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors duration-200">
                  <benefit.icon className="h-6 w-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-subtitle font-semibold text-neutral-900">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    {benefit.subtitle}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {benefit.benefits.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-body text-neutral-700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
