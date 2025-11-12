import React from 'react';
import { CheckCircle } from 'lucide-react';

const FeatureDetails: React.FC = () => {
  const featureDetails = [
    {
      title: 'Course Creation',
      eyebrow: 'COURSE CREATION',
      description: 'Build engaging courses with our intuitive drag-and-drop interface. Support for SCORM, xAPI, and LTI standards ensures compatibility across all platforms and future-proofs your content.',
      image: '/images/course_creator_6.webp',
      benefits: [
        'Drag-and-drop course builder with rich media support',
        'SCORM and xAPI compliance for maximum portability',
        'LTI integration for seamless third-party tool connectivity',
        'Learning paths with prerequisites and branching logic'
      ],
      isReversed: false
    },
    {
      title: 'Student Engagement',
      eyebrow: 'ENGAGEMENT',
      description: 'Foster active learning through social features, gamification, and intelligent notifications that motivate learners to complete their journey.',
      image: '/images/lms_dashboard_0.jpg',
      benefits: [
        'Social learning forums with threaded discussions',
        'Gamification system with points, badges, and leaderboards',
        'Smart push notifications based on learning behavior',
        'Collaborative assignments and peer review systems'
      ],
      isReversed: true
    },
    {
      title: 'Assessment & Analytics',
      eyebrow: 'ASSESSMENT',
      description: 'Modern assessment tools with instant feedback, comprehensive grading, and advanced analytics that prove learning impact on business objectives.',
      image: '/images/analytics_dashboard_4.png',
      benefits: [
        'Comprehensive question banks with multiple question types',
        'Instant feedback and automated grading capabilities',
        'Certification lifecycle management and tracking',
        'Advanced analytics with predictive insights and ROI reporting'
      ],
      isReversed: false
    }
  ];

  return (
    <section className="py-16 lg:py-24 px-6 lg:px-8 bg-background-surface">
      <div className="max-w-6xl mx-auto">
        {featureDetails.map((feature, index) => (
          <div 
            key={index}
            className={`flex flex-col lg:flex-row items-center gap-16 mb-24 last:mb-0 ${
              feature.isReversed ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Content Column */}
            <div className="flex-1">
              <div className="text-primary-500 text-xs font-bold uppercase tracking-wider mb-4">
                {feature.eyebrow}
              </div>
              <h3 className="text-title font-bold text-neutral-900 mb-6">
                {feature.title}
              </h3>
              <p className="text-body-large text-neutral-700 mb-8 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-4">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-body text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <button className="text-primary-500 font-medium hover:text-primary-600 transition-colors duration-200 group">
                  Learn more about {feature.title.toLowerCase()}
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
                </button>
              </div>
            </div>

            {/* Visual Column */}
            <div className="flex-1">
              <div className="bg-white p-4 rounded-card shadow-card border border-neutral-200">
                <img 
                  src={feature.image} 
                  alt={`${feature.title} interface`}
                  className="w-full h-auto rounded-image shadow-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureDetails;
