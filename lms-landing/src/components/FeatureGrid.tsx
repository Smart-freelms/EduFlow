import React from 'react';
import { BookOpen, Users, FileCheck, BarChart3, Smartphone } from 'lucide-react';

const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Standards-Based Course Creation',
      description: 'Drag-and-drop builder with SCORM, xAPI, and LTI support for maximum compatibility',
      benefits: ['SCORM & xAPI support', 'Drag-and-drop interface', 'Learning paths & prerequisites']
    },
    {
      icon: Users,
      title: 'Student Engagement',
      description: 'Social learning, gamification, and notifications that keep learners motivated',
      benefits: ['Social forums', 'Gamification system', 'Smart notifications']
    },
    {
      icon: FileCheck,
      title: 'Modern Assessment',
      description: 'Flexible quizzes, instant feedback, certification tracking, and proctoring options',
      benefits: ['Question banks', 'Instant feedback', 'Certification lifecycle']
    },
    {
      icon: BarChart3,
      title: 'Actionable Analytics',
      description: 'Dashboards, exports, and BI connectors that prove real business impact',
      benefits: ['Executive dashboards', 'Scheduled reports', 'BI connectors']
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Learning',
      description: 'Native apps with offline sync, push notifications, and cross-platform consistency',
      benefits: ['Native mobile apps', 'Offline learning', 'Push notifications']
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 px-6 lg:px-8 bg-background-page">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-title font-bold text-neutral-900 mb-6">
            Everything You Need for Modern Learning
          </h2>
          <p className="text-body-large text-neutral-700 max-w-3xl mx-auto">
            Five essential capabilities that transform how organizations create, deliver, and measure learning outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-card shadow-card border border-neutral-100 group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-250 ease-out"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors duration-200">
                <feature.icon className="h-6 w-6 text-primary-500" />
              </div>
              
              <h3 className="text-subtitle font-semibold text-neutral-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-body text-neutral-700 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-neutral-600">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                    {benefit}
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

export default FeatureGrid;
